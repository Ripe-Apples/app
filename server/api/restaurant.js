const router = require('express').Router()
const {Restaurant} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll()
      res.json(restaurants)
    } catch (err) {
      next(err)
    }
  })
  router.get('/:restaurantId', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId, {include: [{model: Review}]})
      res.json(restaurant)
    } catch (err) {
      next(err)
    }
  })

router.post('/', async (req, res, next) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);
        res.json(newRestaurant)
    } catch (err) {
        next(err)
    }
})