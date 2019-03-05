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

module.exports = router