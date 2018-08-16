const axios = require('axios')
const db = require('../server/db')
const {Restaurant} = require('../server/db/models')

const getOpenTableRestaurants = async pageNumber => {
  try {
    const response = await axios.get(
      `http://opentable.herokuapp.com/api/restaurants?city=New York&per_page=100&page=${pageNumber}`
    )
    return response.data.restaurants
  } catch (error) {
    console.error(error)
  }
}

const getOpenTableArray = async () => {
  try {
    let finalArray = []
    for (let i = 1; i < 18; i++) {
      let tempArr = await getOpenTableRestaurants(i)
      finalArray = finalArray.concat(tempArr)
    }
    return finalArray
  } catch (error) {
    console.error(error)
  }
}

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

const opentableCreate = async () => {
  try {
    const restaurantDbObj = await createDbRestaurantObj()
    const opentableArray = await getOpenTableArray()
    const arrayForUpdate = opentableArray
      .filter(restaurant => (restaurantDbObj[restaurant.name] ? true : false))
      .map(restaurant => {
        return [
          {opentableUrl: restaurant.reserve_url},
          {where: {id: restaurantDbObj[restaurant.name].id}}
        ]
      })
    for (let i = 0; i < arrayForUpdate.length; i++) {
      await Restaurant.update(arrayForUpdate[i][0], arrayForUpdate[i][1])
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = opentableCreate
