const Sequelize = require('sequelize')
const config = require('config')
const winston = require('winston')
const pkg = require('../package')

const sqliteConfig = config.sqlite

let sequelize = new Sequelize(pkg.name, null, null, {
  dialect: 'sqlite',
  storage: sqliteConfig.storage,
  logging: function () {}
})

sequelize
  .sync()
  .then(function () {
    winston.info('connect ok')
  })
  .catch(function (err) {
    winston.error('connect fail', err)
  })

module.exports = sequelize
