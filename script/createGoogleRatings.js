const {googleApiKey} = require('../secrets')
const axios = require('axios')
const {Review} = require('../server/db/models')
const fs = require('fs')
const utf8 = require('utf8')

const iconUrl = 'https://image.flaticon.com/icons/svg/281/281781.svg'

async function googleCreate(restaurantObj) {
  try {
    console.log('Creating Google reviews...')
    const googleData = JSON.parse(
      fs.readFileSync('script/googleData.json', 'utf8')
    )
    const newGoogleData = googleData.filter(restaurant => {
      if (restaurant) return true
    })

    const bulkCreateArr = newGoogleData
      .filter(restaurant => {
        if (restaurantObj[restaurant.name]) {
          return true
        }
      })
      .map(restaurant => {
        return {
          source: 'Google',
          rating: restaurant.rating,
          restaurantId: restaurantObj[restaurant.name].id,
          sourceLogo: iconUrl
        }
      })
    await Review.bulkCreate(bulkCreateArr)
    console.log('Google is done!')
  } catch (error) {
    console.error(error)
  }
}

// async function placesArr() {
//   const restaurantObj = await createDbRestaurantObj()
//   const finalArr = []
//   for (let key in restaurantObj) {
//     if (restaurantObj.hasOwnProperty(key)) {
//       finalArr.push(restaurantObj[key].name.split(' ').join('%20'))
//     }
//   }
//   return finalArr
// }

// async function pullGoogle() {
//   try {
//     const loopArr = await placesArr()
//     let finalArr = []
//     for (let i = 0; i < loopArr.length; i++) {
//       const {data} = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${utf8.encode(
//           loopArr[i]
//         )}%New%York&inputtype=textquery&fields=name,rating&key=${googleApiKey}`
//       )
//       console.log(data)
//       finalArr.push(Array.from(data.candidates)[0])
//     }
//     console.log(finalArr)
//     fs.writeFile('script/googleData.json', JSON.stringify(finalArr))
//   } catch (error) {
//     console.error(error)
//   }
// }

module.exports = googleCreate
