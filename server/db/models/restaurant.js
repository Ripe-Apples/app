const Sequelize = require('sequelize');
const db = require('../db');

const Restaurant = db.define('restaurants', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cuisineType: {
    type: Sequelize.STRING,
    defaultValue: 'Other'
  },
  expenseRating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
  },
  menu: {
    type: Sequelize.TEXT
  },
michStars: {
  type: Sequelize.INTEGER
}
});

module.exports = Restaurant;