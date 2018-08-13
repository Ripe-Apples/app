const axios = require('axios')
const {yelpApiKey} = require('../secrets')

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
  console.log(restaurants.length)
}

getRestaurants()
