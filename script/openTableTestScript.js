const axios = require('axios')
const {Restaurant} = require('../server/db/models')

const getOpenTableRestaurants = async pageNumber => {
  try {
    const response = await axios.get(
      `http://opentable.herokuapp.com/api/restaurants?city=New York&per_page=100&page=${pageNumber}`
    )
    return response.data.restaurants
  } catch (error) {
    console.error(error)
  }
}

const getOpenTableArray = async () => {
  try {
    let finalArray = []
    for (let i = 1; i < 18; i++) {
      let tempArr = await getOpenTableRestaurants(i)
      finalArray = finalArray.concat(tempArr)
    }
    return finalArray
  } catch (error) {
    console.error(error)
  }
}

const opentableCreate = async createDbRestaurantObj => {
  try {
    console.log('Creating OpenTable links...')
    const restaurantDbObj = await createDbRestaurantObj()
    const opentableArray = await getOpenTableArray()
    const arrayForUpdate = opentableArray
      .filter(restaurant => (restaurantDbObj[restaurant.name] ? true : false))
      .map(restaurant => {
        return [
          {opentableUrl: restaurant.reserve_url},
          {where: {id: restaurantDbObj[restaurant.name].id}}
        ]
      })
    for (let i = 0; i < arrayForUpdate.length; i++) {
      await Restaurant.update(arrayForUpdate[i][0], arrayForUpdate[i][1])
    }
    console.log('OpenTable is done!')
  } catch (error) {
    console.error(error)
  }
}

module.exports = opentableCreate
