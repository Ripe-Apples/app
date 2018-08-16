const {Restaurant} = require('../server/db/models')

async function fetchRestaurants() {
  try {
    const restaurants = await Restaurant.findAll()
    return restaurants
  } catch (error) {
    console.error(error)
  }
}

async function createDbRestaurantObj() {
  try {
    const restaurants = await fetchRestaurants()
    let restaurantObj = {}

    restaurants.forEach(restaurant => {
      let tempRestaurant = restaurant.dataValues
      if (!restaurantObj[tempRestaurant.name]) {
        restaurantObj[tempRestaurant.name] = tempRestaurant
      }
    })
    return restaurantObj
  } catch (error) {
    console.error(error)
  }
}

module.exports = createDbRestaurantObj
