const router = require('express').Router()
const {Like, User} = require('../db/models')
module.exports = router

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
    const deletedLike = await Like.destroy({where: {restaurantId: req.body.restaurantId, userId: req.user.id}})
    res.json(deletedLike)
  } catch (err) {
    next(err)
  }
})