'use strict'

const axios = require('axios')
const {yelpApiKey, googleKey5} = require('../secrets')
const db = require('../server/db')
const {Restaurant, Review} = require('../server/db/models')

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

async function getGooglerestaurants() {

  //get yelp restaurants
  const restaurants = await getRestaurants();

  //loop through array and convert names of restaurants to be used in google query
  for (let i = 0; i < restaurants.length; i++) {
    let restaurant = restaurants[i];
    let convertedName = restaurant.name.split(' ').join('%20');

    //this gets a single restaurant from google but will be repeated for each restaurant in yelp
    const res = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${convertedName}&inputtype=textquery&fields=name,rating&key=AIzaSyAepzOU1K--7C2KRvrxdPTFN6p7JXTKCOU`)

    return res.data;
  }

}

const googleRestaurants = getGooglerestaurants();


//put these in the same seed file as yelp and everything else to store the db???