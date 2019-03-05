/* eslint-disable import/no-commonjs */
const express = require('express')
const bcrypt = require("bcrypt")
const { db } = require('../../db')

const router = express.Router()

const getUserByName = (username) => {
  const result = db.get('users')
    .find({ username })
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
        res.jsonp('登录成功。')
      } else {
        res.status(401).jsonp('密码不匹配！')
      }
    })
})

module.exports = router