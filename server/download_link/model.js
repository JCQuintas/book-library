const Sequelize = require('sequelize')

module.exports = class DownloadLink extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'download_links',
        name: {
          singular: 'download_link',
          plural: 'download_links',
        },
      }
    )
  }
}
