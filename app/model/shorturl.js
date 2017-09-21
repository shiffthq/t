const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const Shorturl = sequelize.define('shorturl', {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: false
})

module.exports = Shorturl
