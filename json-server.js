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

const addCartItem = (item) => {
  const result = db.get('cart.items')
    .push(item)
    .write()

  return result
}

server.post('/cart-item', (req, res) => {
  const product_id = parseInt(req.body.product_id, 10)
  const quantity = parseInt(req.body.quantity, 10)

  const product = getProduct(product_id)

  if (!product) {
    res.sendStatus('404')
    return
  }

  const { name, price, images } = product
  const total = parseInt(price) * parseInt(quantity)

  let item = {
    product_id,
    name,
    image: images[0].src,
    price,
    quantity,
    total
  }

  addCartItem(item)
  res.sendStatus('201')
})

server.use(router)

server.listen(3333, () => {
  console.log('JSON server is running on port 3333.')
})