'use strict'

const axios = require('axios')
let {yelpApiKey} = require('../secrets')
const db = require('../server/db')
const {Restaurant, Review} = require('../server/db/models')

if (!yelpApiKey) {
  yelpApiKey = process.env.yelpApiKey
}

const iconUrl = 'https://image.flaticon.com/icons/svg/174/174882.svg'

async function getYelp(offset) {
  const {data} = await axios.get(
    `https://api.yelp.com/v3/businesses/search?term=restaurants&location=new-york&limit=50&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      }
    }
  )
  return data.businesses
}

async function getRestaurants() {
  let restaurants = []

  for (let i = 0; i < 20; i++) {
    let response = await getYelp(i * 50)
    restaurants = restaurants.concat(Array.from(response))
  }

  return restaurants
}

async function createYelpRestaurants() {
  const restaurants = await getRestaurants()
  await db.sync({force: true})
  console.log('db synced!')

  const restaurantsArr = restaurants.map(restaurant => {
    const location = restaurant.location.display_address.join(', ')

    let expenseRating = restaurant.price ? restaurant.price.length : 0
    return {
      name: restaurant.name,
      cuisineType: restaurant.categories,
      expenseRating,
      location,
      imageUrl: restaurant.image_url
    }
  })

  await Restaurant.bulkCreate(restaurantsArr)

  const ratingsArr = restaurants.map((restaurant, idx) => {
    let id = idx + 1
    return {
      source: 'Yelp',
      rating: restaurant.rating,
      restaurantId: id,
      sourceLogo: iconUrl
    }
  })

  await Review.bulkCreate(ratingsArr)
}

async function fetchFromYelp() {
  console.log('Fetching from Yelp, please wait...')
  try {
    await createYelpRestaurants()
  } catch (err) {
    console.error(err)
  }
}

module.exports = fetchFromYelp
