const Sequelize = require('sequelize')

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        author: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        thumbnail: {
          type: Sequelize.STRING,
        },
        published_at: {
          type: Sequelize.DATEONLY,
        },
        external_id: {
          type: Sequelize.BIGINT,
        },
        isbn: {
          type: Sequelize.STRING,
          unique: true,
        },
        isbn13: {
          type: Sequelize.STRING,
          unique: true,
        },
        pages: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        tableName: 'books',
        name: {
          singular: 'book',
          plural: 'books',
        },
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'category_id' })
    this.hasMany(models.DownloadLink)
  }
}
