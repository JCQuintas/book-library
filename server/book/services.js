const { Op } = require('sequelize')

const defaultOptions = models => {
  return {
    attributes: {
      exclude: ['category_id', 'created_at', 'updated_at'],
    },
    include: [
      { model: models.Category, attributes: ['id', 'name'] },
      { model: models.DownloadLink, attributes: ['url', 'type'] },
    ],
  }
}

module.exports = {
  findAll: (req, models, options) => {
    const {
      id,
      title,
      author,
      description,
      thumbnail,
      published_at,
      external_id,
      category_id,
      category,
      isbn,
      isbn13,
      pages,
    } = req.query
    const where = {}
    if (id) where.id = id
    if (title) where.title = title
    if (author) where.author = author
    if (description) where.description = description
    if (thumbnail) where.thumbnail = thumbnail
    if (published_at) where.published_at = published_at
    if (external_id) where.external_id = external_id
    if (category_id) where.category_id = category_id
    if (isbn) where.isbn = isbn
    if (isbn13) where.isbn13 = isbn13
    if (pages) where.pages = pages
    const findOptions = !category
      ? defaultOptions(models)
      : {
          ...defaultOptions(models),
          include: [
            {
              model: models.Category,
              attributes: ['id', 'name'],
              where: {
                name: {
                  [Op.iLike]: `%${category}%`,
                },
              },
            },
            { model: models.DownloadLink, attributes: ['url', 'type'] },
          ],
        }

    return models.Book.findAll({ where, ...findOptions, ...options })
  },

  create: (req, models, options) => {
    const { category, ...rest } = req.body
    if (category && !rest.category_id) {
      const parsedCategory = (typeof category === 'object' && category.name) || category
      return models.Category.findOrCreate({ where: { name: parsedCategory } }).then(([returnedCategory]) => {
        return models.Book.create(
          { ...rest, category_id: returnedCategory.id },
          { ...defaultOptions(models), ...options }
        )
      })
    } else {
      return models.Book.create(rest, { ...defaultOptions(models), ...options })
    }
  },

  findById: (req, models, options) => {
    const { book_id } = req.params
    return models.Book.findById(book_id, {
      ...defaultOptions(models),
      ...options,
    })
  },

  search: (req, models, options) => {
    const { q } = req.query
    return models.Book.findAll({
      ...defaultOptions(models),
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            author: {
              [Op.iLike]: `%${q}%`,
            },
          },
        ],
      },
    })
  },
}
