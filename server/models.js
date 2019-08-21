const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const psql = {
  db: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  options: {
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
    define: {
      underscored: true,
    },
  },
}
const sequelize = new Sequelize(psql.db, psql.username, psql.password, psql.options)
sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to db!')
    global.BOOK_DB_CONNECTED = true
  })
  .catch(err => {
    console.error(`Unable to connect to db: ${err}`)
    global.BOOK_DB_CONNECTED = false
  })

sequelize.sync({ force: false })

// Load each model file
const models = Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter(dir => fs.lstatSync(path.join(__dirname, dir)).isDirectory())
    .map(dir => {
      const entry = require(path.join(__dirname, dir))
      if (typeof entry.model === 'function') return { [entry.model.name]: entry.model.init(sequelize) }
      return null
    })
)

// Load model associations
for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models)
}

module.exports = models
