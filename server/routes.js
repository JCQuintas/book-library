const fs = require('fs')
const path = require('path')
const changeCase = require('change-case')

module.exports = Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter(dir => fs.lstatSync(path.join(__dirname, dir)).isDirectory())
    .map(dir => {
      const entry = require(path.join(__dirname, dir))
      if (entry.routes) {
        if (entry.model && entry.model.name) return { [entry.model.name]: entry.routes }
        else return { [changeCase.pascalCase(dir)]: entry.routes }
      }
      return null
    })
)
