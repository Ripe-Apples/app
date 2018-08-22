const router = require('express').Router()
const {Like, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const likes = await Like.findAll({where: {restaurantId: req.body.restaurantId} })
    res.json(likes)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newLike = await Like.create(req.body)
    res.json(newLike)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const likeToDelete = await Like.findOne({where: {restaurantId: req.body.restaurantId, userId: req.user.id}})
    await Like.destroy({where: {restaurantId: req.body.restaurantId, userId: req.user.id}})
    res.json(likeToDelete)
  } catch (err) {
    next(err)
  }
})