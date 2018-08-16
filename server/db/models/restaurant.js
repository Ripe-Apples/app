const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurants', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cuisineType: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  },
  expenseRating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  opentableUrl: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiztPenr97cAhXPg-AKHRGEBbwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.opentable.com%2Fc%2Falabama-restaurants&psig=AOvVaw1iuiAfE0bQ034-x4GMvP9U&ust=1533849100648137'
  }
})

module.exports = Restaurant
