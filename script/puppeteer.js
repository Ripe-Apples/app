const puppeteer = require('puppeteer');
const {Restaurant} = require('../server/db/models')

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

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://github.com');
  await page.screenshot({ path: 'screenshots/github.png' });
  
  browser.close();
}

run();