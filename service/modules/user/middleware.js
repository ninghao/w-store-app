/* eslint-disable import/no-commonjs */
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const publicKey = fs.readFileSync(
  path.join(__dirname, '..', '..', 'config', 'cert', 'public_key.pem')
)

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization')

  if (!authHeader || authHeader === '') {
    res.sendStatus(401)
    return
  }

  const token = authHeader.replace('Bearer ', '')

  if (!token) {
    res.sendStatus(401)
    return
  }

  try {
    jwt.verify(token, publicKey)
    next()
  } catch (error) {
    res.status(400).jsonp(error.message)
    return
  }
}

module.exports = {
  authMiddleware
}