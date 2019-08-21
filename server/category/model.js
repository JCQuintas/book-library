const Sequelize = require('sequelize')

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: 'categories',
        name: {
          singular: 'category',
          plural: 'categories',
        },
      }
    )
  }
}
