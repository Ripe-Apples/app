const {Restaurant} = require('../server/db/models')
const axios = require('axios')
const {googleKey5} = require('../secrets')

async function fetchRestaurants() {
  try {
    const restaurants = await Restaurant.findAll()
    return restaurants
  } catch (error) {
    console.error(error)
  }
}
//returns all restaurants in an array from db (posted there by yelp)
//i want to use this to access restaurants arr but the funciton isnt returning anything
async function getRestaurantNames() {
  const restaurants = await fetchRestaurants();

  let restaurantNamesArr = restaurants.map(restaurant => {
    return restaurant.dataValues.name;
  });

  return restaurantNamesArr;
}

async function getGooglerestaurants() {
  try {

    //get yelp restaurants using above function
    const restaurantNames = await getRestaurantNames();
  
    //loop through array and convert names of restaurants to be used in google query
    for (let i = 0; i < restaurantNames.length; i++) {
      let name = restaurantNames[i];
      let convertedName = name.split(' ').join('%20');
  
      //this gets a single restaurant from google but will be repeated for each restaurant in yelp
      const res = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${convertedName}&inputtype=textquery&fields=name,rating&key=${googleKey5}`)
  
      return res.data;
    }
  } catch (error) {
    console.error(error)
  }
}

const googleRestaurants = getGooglerestaurants();

console.log(googleRestaurants);