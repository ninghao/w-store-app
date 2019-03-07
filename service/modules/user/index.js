/* eslint-disable import/no-commonjs */
require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const http = require('axios')
const { db } = require('../../db')
const { authMiddleware } = require('./middleware')

const privateKey = fs.readFileSync(
  path.join(__dirname, '..', '..', 'config', 'cert', 'private_key.pem')
)

const { WX_APP_ID, WX_SECRET } = process.env

const router = express.Router()

const signToken = (data) => {
  const payload = {
    id: data.id,
    usrname: data.username
  }

  const token = jwt.sign(
    payload,
    privateKey,
    {
      algorithm: 'RS256'
    }
  )

  return token
}

const getUserByName = (username) => {
  db.read()

  const result = db.get('users')
    .find({ username })
    .value()

  return result
}

const getWxSession = async (code) => {
  const WX_API = 'https://api.weixin.qq.com/sns/jscode2session'
  const url = `${WX_API}?appid=${WX_APP_ID}&secret=${WX_SECRET}&js_code=${code}&grant_type=authorization_code`

  try {
    const response = await http.get(url)

    if (response.data.errcode) {
      throw new Error()
    }

    return response.data
  } catch (error) {
    throw new Error('获取微信登录会话失败！')
  }
}

const getUserByOpenId = (openid) => {
  const result = db.get('users')
    .filter({ weixin: { openid } })
    .first()
    .value()

  return result
}

// 用户注册
router.post('/users', (req, res, next) => {
  const { username, password } = req.body
  const user = getUserByName(username)

  if (user) {
    res.status(409).jsonp('用户名被占用了！')
    return
  }

  bcrypt.hash(password, 10)
    .then(passwordHash => {
      req.body.password = passwordHash
      next()
    })
})

// 用户登录
router.post('/user-login', (req, res) => {
  const { username, password } = req.body
  const user = getUserByName(username)

  if (!user) {
    res.status(404).jsonp('用户名不存在。')
    return
  }

  bcrypt.compare(password, user.password)
    .then(result => {
      if (result) {
        const token = signToken(user)

        res.jsonp({
          id: user.id,
          username: user.username,
          token
        })
      } else {
        res.status(401).jsonp('密码不匹配！')
      }
    })
})

// 验证 JWT
router.post('/token/validate', authMiddleware, (req, res) => {
  res.jsonp('valid')
})

// 微信登录
router.post('/wx-login', async (req, res) => {
  const { code } = req.body

  if (!code) {
    res.status(400).jsonp('微信登录失败，请重试！')
  }

  try {
    const sessionData = await getWxSession(code)

    const user = getUserByOpenId(sessionData.openid)

    if (!user) {
      res.status(404).jsonp('还没有绑定微信帐户。')
    }

    res.jsonp('ok')
  } catch (error) {
    res.status(500).jsonp(error.message)
  }
})

module.exports = router