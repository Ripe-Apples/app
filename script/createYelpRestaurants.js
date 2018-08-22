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

async function getYelpRestaurants() {
  let restaurants = []

  for (let i = 0; i < 20; i++) {
    let response = await getYelp(i * 50)
    restaurants = restaurants.concat(Array.from(response))
  }
  return restaurants
}

async function createYelpRestaurants() {
  const restaurants = await getYelpRestaurants()
  const restaurantsArr = restaurants.map(restaurant => {
    const location = restaurant.location.display_address.join(', ')

    let expenseRating = restaurant.price ? restaurant.price.length : 0
    return {
      name: restaurant.name,
      cuisineType: restaurant.categories,
      expenseRating,
      location,
      imageUrl: restaurant.image_url,
      latitude: restaurant.coordinates.latitude,
      longitude: restaurant.coordinates.longitude
    }
  })

  await Restaurant.bulkCreate(restaurantsArr)
}

async function createYelpRatings(restaurantObj) {
  try {
    console.log('Creating Yelp reviews...')
    const restaurants = await getYelpRestaurants()
    let newObj = {}
    const ratingsArr = restaurants
      .filter(restaurant => {
        if (restaurantObj[restaurant.name] && !newObj[restaurant.name]) {
          newObj[restaurant.name] = true
          return true
        }
      })
      .map(restaurant => {
        return {
          source: 'Yelp',
          rating: restaurant.rating,
          restaurantId: restaurantObj[restaurant.name].id,
          sourceLogo: iconUrl,
          reviewUrl: restaurant.url
        }
      })
    await Review.bulkCreate(ratingsArr)
    console.log('Yelp reviews are done!')
  } catch (error) {
    console.error(error)
  }
}

async function yelpCreate() {
  try {
    console.log('Fetching from Yelp, please wait...')
    await createYelpRestaurants()
    console.log('Yelp is done!')
  } catch (err) {
    console.error(err)
  }
}

module.exports = {yelpCreate, createYelpRatings}
