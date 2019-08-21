global.Promise = require('bluebird')
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const changeCase = require('change-case')
const corsProxy = require('cors-anywhere')

const app = express()
const port = process.env.EXPRESS_PORT
const middlewares = require('./middlewares')
const models = require('./models')
const routes = require('./routes')

// app.use(bodyParser.json({type:(req)=>/.*\/json/gi.test(req.headers['content-type'])}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const newBody = {}
  Object.keys(req.body).forEach(key => {
    if (req.body.hasOwnProperty(key)) {
      newBody[changeCase.snakeCase(key)] = req.body[key]
    }
  })
  req.body = newBody
  next()
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const router = express.Router()

router.get('/', (req, res) =>
  res.json({
    message: 'Welcome to Personal Books api!',
    connected: global.BOOK_DB_CONNECTED,
  })
)

router.get('/proxy/:proxyUrl*', (req, res) => {
  req.url = req.url.replace('/proxy/', '/')
  corsProxy
    .createServer({
      originWhitelist: [], // Allow all origins
      requireHeader: [],
      removeHeaders: [],
      redirectSameOrigin: true,
    })
    .emit('request', req, res)
})

// Routes
for (const route of Object.keys(routes)) {
  routes[route](router, models, middlewares)
}
// End Routes

// Force using of /api to access all routes
app.use('/api', router)

app.use((err, req, res, next) => {
  if (!err.status) err.status = 500
  res.status(err.status).send({ error: err.message })
})

app.listen(port)
console.log('Api runnin on port ' + port)
