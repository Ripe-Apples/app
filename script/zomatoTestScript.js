const axios = require('axios')
const {zomatoApiKey} = require('../secrets')

async function zomatoRestaurants() {
  const {data} = await axios.get(
    'https://developers.zomato.com/api/v2.1/search?entity_type=zone&entity_id=94741',
    {
      headers: {
        'user-key': zomatoApiKey
      }
    }
  )
  console.log(Array.from(data.restaurants))
}

console.log(zomatoRestaurants())
