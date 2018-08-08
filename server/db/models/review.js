const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('reviews', {
  source: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 10
    }
  }
})

module.exports = Review
