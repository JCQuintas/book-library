const { Op } = require('sequelize')

const defaultOptions = {
  attributes: ['id', 'name'],
  order: [['name', 'ASC']],
}

module.exports = {
  findAll: (req, models, options) => {
    const { id, name } = req.query
    const where = {}
    if (id) where.id = id
    if (name) where.name = name
    return models.Category.findAll({ where, ...defaultOptions, ...options })
  },

  create: (req, models, options) => {
    const { name } = req.body
    return models.Category.create(
      {
        name,
      },
      { ...options }
    )
  },

  findOne: (req, models, options) => {
    const { category } = req.params
    if (!isNaN(category)) return models.Category.findById(category, { ...defaultOptions, ...options })
    return models.Category.find({
      where: {
        name: {
          [Op.iLike]: category,
        },
      },
      ...defaultOptions,
      ...options,
    })
  },

  search: (req, models, options) => {
    const { q } = req.query
    return models.Category.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      ...defaultOptions,
      ...options,
    })
  },
}
