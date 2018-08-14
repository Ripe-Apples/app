'use strict'

const axios = require('axios')
const {zomatoApiKey} = require('../secrets')
const db = require('../server/db')
const {Restaurant, Review} = require('../server/db/models')

const iconUrl =
  'https://images-na.ssl-images-amazon.com/images/I/21Wc%2BuzZURL._SY355_.png'

async function getZomatoRestaurants(start) {
  try {
    const {data} = await axios.get(
      `https://developers.zomato.com/api/v2.1/search?entity_type=city&entity_id=280&start=${start}&sort=rating`,
      {
        headers: {
          'user-key': zomatoApiKey
        }
      }
    )
    return data.restaurants
  } catch (error) {
    console.error(error)
  }
}

async function getRestaurants() {
  try {
    let restaurants = []

    for (let i = 0; i < 5; i++) {
      let response = await getZomatoRestaurants(i * 20)
      restaurants = restaurants.concat(Array.from(response))
    }

    return restaurants
  } catch (error) {
    console.error(error)
  }
}

const createZomatoRestaurantObj = async () => {
  try {
    const restaurantsArr = await getRestaurants()
    return restaurantsArr.map(place => {
      let finalRestaurant = place.restaurant
      return {
        name: finalRestaurant.name,
        rating: finalRestaurant.user_rating.aggregate_rating
      }
    })
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

async function mergeData() {
  try {
    const zomatoRestaurants = await createZomatoRestaurantObj()
    const dbRestaurants = await createDbRestaurantObj()
    let reviewsForCreate = []
    zomatoRestaurants.forEach(restaurant => {
      if (dbRestaurants[restaurant.name]) {
        reviewsForCreate.push({
          source: 'Zomato',
          rating: restaurant.rating,
          restaurantId: dbRestaurants[restaurant.name].id,
          sourceLogo: iconUrl
        })
      }
    })
    console.log(reviewsForCreate)
    await Review.bulkCreate(reviewsForCreate)
  } catch (error) {
    console.error(error)
  }
}
async function createZomato() {
  console.log('Creating Zomato reviews, please wait...')
  try {
    await db.sync()
    await mergeData()
  } catch (error) {
    console.error(error)
  } finally {
    console.log('close the db connection')
    await db.close()
    console.log('done!')
  }
}

createZomato()
