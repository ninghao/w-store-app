/* eslint-disable import/no-commonjs */
const jsonServer = require('json-server')
const { dbFile } = require('./db')

const server = jsonServer.create()
const router = jsonServer.router(dbFile)
const middlewares = jsonServer.defaults()

const cart = require('./modules/cart')
const user = require('./modules/user')

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use([cart, user])

server.use(router)

server.listen(3333, () => {
  console.log('JSON server is running on port 3333.')
})