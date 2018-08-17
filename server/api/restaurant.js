const router = require('express').Router()
const {Restaurant, Review, Like} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({include: [Review]})
    res.json(restaurants)
  } catch (err) {
    next(err)
  }
})

router.get('/:restaurantId', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId, {
      include: [Review, Like]
    })
    res.json(restaurant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newRestaurant = await Restaurant.create(req.body)
    res.json(newRestaurant)
  } catch (err) {
    next(err)
  }
})
