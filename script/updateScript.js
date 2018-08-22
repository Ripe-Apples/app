const {createYelpRatings} = require('./createYelpRestaurants')
const createGoogleRatings = require('./createGoogleRatings')
const createZomatoRatings = require('./createZomatoRatings')
const createFoursquareRatings = require('./createFoursquareRatings')
const createRestaurantDbObj = require('./helperFunctions')
const db = require('../server/db')
const {Review} = require('../server/db/models')

const updateRatings = async () => {
  try {
    console.log('Updating restaurant ratings...')
    await Review.destroy({truncate: true, force: true})
    console.log('Existing reviews are deleted :(')
    const restaurantObj = await createRestaurantDbObj()
    await Promise.all([
      createYelpRatings(restaurantObj),
      createGoogleRatings(restaurantObj),
      createZomatoRatings(restaurantObj),
      createFoursquareRatings(restaurantObj)
    ])
    db.close()
    console.log('Updating is done!')
  } catch (error) {
    console.error(error)
  }
}

updateRatings()
