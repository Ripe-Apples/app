const {Restaurant} = require('../server/db/models')
const axios = require('axios')
const {foursquareClientId, foursquareApiKey} = require('../secrets')

async function fetchRestaurants() {
  try {
    const restaurants = await Restaurant.findAll()
    return restaurants
  } catch (error) {
    console.error(error)
  }
}

async function readRestaurants() {
  const restaurants = await fetchRestaurants()
  let finalArray = []
  restaurants.forEach(restaurant => {
    finalArray.push(restaurant.dataValues)
  })
  console.log(finalArray)
}

async function get4sq() {
  try {
    const {data} = await axios.get(
      `https://api.foursquare.com/v2/venues/search?near=New York, NY&query=Locanda Verde&client_id=${foursquareClientId}&client_secret=${foursquareApiKey}&v=20180814`
    )
    console.log(data.response.venues[0])
  } catch (error) {
    console.error(error)
  }
}

get4sq()
