const axios = require('axios')
const {kevKey, googleKey, gKey2, key4} = require('../secrets');


const apiRoute = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJOwg_06VPwokRYv534QaPC8g&fields=name,rating&types["restaurant"]&key='

async function getGoogleRestaurants (route, key) {
  const res = await axios.get(route + key)
  console.log(res.data)
}


getGoogleRestaurants(apiRoute, key4)

