const router = require('express').Router()
const {Restaurant, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({include: [Review]})
    res.json(restaurants.filter(restaurant => restaurant.reviews.length))
  } catch (err) {
    next(err)
  }
})

router.get('/:restaurantId', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId, {
      include: [Review]
    })
    res.json(restaurant)
  } catch (err) {
    next(err)
  }
})
