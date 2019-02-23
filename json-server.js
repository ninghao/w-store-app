/* eslint-disable import/no-commonjs */
const jsonServer = require('json-server')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

const dbFile = path.join(__dirname, 'src', 'assets', 'db.json')
const adapter = new FileSync(dbFile)
const db = low(adapter)

const server = jsonServer.create()
const router = jsonServer.router(dbFile)
const middlewares = jsonServer.defaults()


server.use(middlewares)
server.use(jsonServer.bodyParser)

const getProduct = (id) => {
  const result = db.get('products')
    .find({ id: parseInt(id, 10) })
    .value()

  return result
}

const product = getProduct(1)
console.log(product)

server.use(router)

server.listen(3333, () => {
  console.log('JSON server is running on port 3333.')
})