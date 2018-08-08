const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('reviews', {
  source: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
});

module.exports = Review;