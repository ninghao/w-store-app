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

router.render = (req, res) => {
  if (req.method === 'GET') {
    if (req.path === '/users') {
      const users = res.locals.data.map(item => {
        delete item.password

        return item
      })

      res.jsonp(users)

      return
    }

    const singleUser = req.path.match(/\/users\/(\d+)/)

    if (singleUser) {
      delete res.locals.data.password

      res.jsonp(res.locals.data)

      return
    }
  }

  res.jsonp(res.locals.data)
}

server.use(router)

server.listen(3333, () => {
  console.log('JSON server is running on port 3333.')
})