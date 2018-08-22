const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.put('/likedCuisines', async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.user.id)
    await userToUpdate.update({likedCuinses: req.body.cuisines})
    res.status(200).send('Updated!')
  } catch (error) {
    next(error)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
