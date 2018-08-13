const axios = require('axios')

async function getGoogleRestaurants (key) {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=New+York+food&sensor=false&location=40.67,-73.94&radius=100&key=${key}`
  )
  console.log(res.data)
}


getGoogleRestaurants('AIzaSyDOj3QxjVpY6V9DaKdcC4LtwPInSB14e2k')

