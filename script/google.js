const axios = require('axios')
const {kevKey, googleKey, gKey2, key4} = require('../secrets');


const apiRoute = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJOwg_06VPwokRYv534QaPC8g&fields=name,rating&types["restaurant"]&key='

const apiRoute2 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+New+York&key='

async function getGoogleRestaurants (key) {
  // const res = await axios.get(route + key)

  const res = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Junzi%20Kitchen&inputtype=textquery&fields=name,rating&key=${key}`)

  console.log(res.data)
}


const googleRestaurants = getGoogleRestaurants(key4)

console.log(googleRestaurants.length)

