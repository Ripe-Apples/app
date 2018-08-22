const router = require('express').Router()
const {Like} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const likes = await Like.findAll()
    res.json(likes)
  } catch (err) {
    next(err)
  }
})

router.get('/:likeId', async (req, res, next) => {
  try {
    const likes = await Like.findAll({where: {id: req.params.likeId} })
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

router.delete('/:likeId', async (req, res, next) => {
  try {
    await Like.destroy({where: {id: req.params.likeId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})