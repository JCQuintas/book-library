const services = require('./services')
const express = require('express')

module.exports = (parentRouter, models, middlewares) => {
  const router = express.Router()
  parentRouter.use('/books', router)

  router
    .route('/')
    .get((req, res, next) => {
      services
        .findAll(req, models)
        .then(r => res.json(r))
        .catch(next)
    })
    .post((req, res, next) => {
      services
        .create(req, models)
        .then(book => res.status(201).json({ book }))
        .catch(next)
    })

  router.route('/search').get((req, res, next) => {
    services
      .search(req, models)
      .then(r => res.json(r))
      .catch(next)
  })

  router.route('/:book_id').get((req, res, next) => {
    services
      .findById(req, models)
      .then(r => res.json(r))
      .catch(next)
  })
}
