/* eslint-disable import/no-commonjs */
const jsonServer = require('json-server')
const path = require('path')

const dbFile = path.join(__dirname, 'src', 'assets', 'db.json')

const server = jsonServer.create()
const router = jsonServer.router(dbFile)
const middlewares = jsonServer.defaults()


server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use(router)

server.listen(3333, () => {
  console.log('JSON server is running on port 3333.')
})