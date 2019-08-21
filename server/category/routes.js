const services = require('./services')
const express = require('express')

module.exports = (parentRouter, models, middlewares) => {
  const router = express.Router()
  parentRouter.use('/categories', router)

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
        .then(category => res.status(201).json({ category }))
        .catch(next)
    })

  router.route('/search').get((req, res, next) => {
    services
      .search(req, models)
      .then(r => res.json(r))
      .catch(next)
  })

  router.route('/:category').get((req, res, next) => {
    services
      .findOne(req, models)
      .then(r => res.json(r))
      .catch(next)
  })
}
