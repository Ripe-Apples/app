const axios = require('axios')
let {zomatoApiKey} = require('../secrets')
const {Review} = require('../server/db/models')

const iconUrl =
  'https://images-na.ssl-images-amazon.com/images/I/21Wc%2BuzZURL._SY355_.png'

if (!zomatoApiKey) {
  zomatoApiKey = process.env.zomatoApiKey
}

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
    let shackCount = 0
    const restaurantsArr = await getRestaurants()
    return restaurantsArr.map(place => {
      let finalRestaurant = place.restaurant
      if (finalRestaurant.name === 'Shake Shack') {
        if (!shackCount) {
          shackCount++
          return {
            name: finalRestaurant.name,
            rating: finalRestaurant.user_rating.aggregate_rating,
            reviewUrl: finalRestaurant.url
          }
        }
      } else {
        return {
          name: finalRestaurant.name,
          rating: finalRestaurant.user_rating.aggregate_rating,
          reviewUrl: finalRestaurant.url
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
}

async function zomatoCreate(createDbRestaurantObj) {
  try {
    console.log('Creating Zomato reviews...')
    let zomatoRestaurants = await createZomatoRestaurantObj()
    zomatoRestaurants = zomatoRestaurants.filter(restaurant => {
      if (restaurant) return true
    })
    const dbRestaurants = await createDbRestaurantObj()
    let reviewsForCreate = []
    zomatoRestaurants.forEach(restaurant => {
      if (dbRestaurants[restaurant.name]) {
        reviewsForCreate.push({
          source: 'Zomato',
          rating: restaurant.rating,
          restaurantId: dbRestaurants[restaurant.name].id,
          sourceLogo: iconUrl,
          reviewUrl: restaurant.reviewUrl
        })
      }
    })
    await Review.bulkCreate(reviewsForCreate)
    console.log('Zomato is done!')
  } catch (error) {
    console.error(error)
  }
}

module.exports = zomatoCreate
