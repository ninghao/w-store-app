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

const getCartItem = (id) => {
  const result = db.get('cart.items')
    .find({ product_id: parseInt(id) })
    .value()

  return result
}

const updateCartItem = (id, item) => {
  const result = db.get('cart.items')
    .find({ product_id: parseInt(id) })
    .assign(item)
    .write()

  return result
}

const removeCartItem = (id) => {
  const result = db.get('cart.items')
    .remove({ product_id: parseInt(id) })
    .write()

  return result
}

const updateCartTotal = () => {
  const total = db.get('cart.items')
    .map('total')
    .value()

  const value = total.reduce((v1, v2) => {
    return v1 + v2
  }, 0)

  db.get('cart')
    .assign({ total: value })
    .write()
}

const clearCart = () => {
  const result = db.set('cart', {
    total: 0,
    items: []
  }).write()

  return result
}

server.get('/shopping-cart', (req, res) => {
  const cart = db.get('cart')
    .value()

  res.jsonp(cart)
})

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

  const result = getCartItem(product_id)

  if (result) {
    item.quantity = parseInt(quantity) + parseInt(result.quantity)
    item.total = total + parseInt(result.total)

    updateCartItem(product_id, item)
    updateCartTotal()
    res.jsonp('success')
  } else {
    addCartItem(item)
    res.sendStatus('201')
    updateCartTotal()
  }
})

server.patch('/cart-item/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const quantity = parseInt(req.body.quantity)
  const product = getProduct(id)

  if (!product) {
    res.sendStatus('404')
    return
  }

  const result = getCartItem(id)

  if (!result) {
    res.sendStatus('404')
    return
  }

  const { name, price, images } = product
  const total = parseInt(price) * parseInt(quantity)

  let item = {
    product_id: id,
    name,
    image: images[0].src,
    price,
    quantity,
    total
  }

  updateCartItem(id, item)
  updateCartTotal()

  res.sendStatus(200)
})

server.delete('/cart-item/:id', (req, res) => {
  const id = parseInt(req.params.id)
  removeCartItem(id)
  updateCartTotal()
  res.sendStatus(200)
})

server.post('/cart/clear', (req, res) => {
  clearCart()
  res.sendStatus(200)
})

server.use(router)

server.listen(3333, () => {
  console.log('JSON server is running on port 3333.')
})