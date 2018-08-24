// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Restaurant = db.model('restaurants')

// describe('Restaurant routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   const newRestaurant = {
//     name: 'test rest',
//     cuisineType: ['chinese'],
//     expenseRating: 2,
//     location: 'New York, NY',
//     latitude: 34.4,
//     longitude: 34.4
//   }

//   describe('Gets all restaurants', () => {
//     beforeEach(() => {
//       return Restaurant.create(newRestaurant)
//     })

//     it('GET /api/restaurant', async () => {
//       const res = await request(app)
//         .get('/api/restaurant')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].name).to.be.equal('test rest')
//       expect(res.body[0].cuisineType[0]).to.be.equal('chinese')
//       expect(res.body[0].expenseRating).to.be.equal(2)
//       expect(res.body[0].location).to.be.equal('New York, NY')
//       expect(res.body[0].latitude).to.be.equal(34.4)
//       expect(res.body[0].longitude).to.be.equal(34.4)
//     })
//   })

//   describe('Gets a single restaurant', () => {
//     beforeEach(() => {
//       return Restaurant.create(newRestaurant)
//     })

//     it('GET api/restaurant/restaurantId', async () => {
//       const res = await request(app)
//         .get('/api/restaurant/1')
//         .expect(200)

//       expect(res.body).to.be.an('object')
//       expect(res.body.name).to.be.equal('test rest')
//       expect(res.body.cuisineType[0]).to.be.equal('chinese')
//       expect(res.body.expenseRating).to.be.equal(2)
//       expect(res.body.location).to.be.equal('New York, NY')
//       expect(res.body.latitude).to.be.equal(34.4)
//       expect(res.body.longitude).to.be.equal(34.4)
//     })
//   })
// })
