const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('reviews')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  const newReview = {
    source: 'Yelp',
    sourceLogo: 'image!',
    rating: 2.5,
    reviewUrl: 'a review url'
  }

  describe('Gets all reviews', () => {
    beforeEach(() => {
      return Review.create(newReview)
    })

    it('GET /api/review', async () => {
      const res = await request(app)
        .get('/api/review')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].source).to.be.equal('Yelp')
      expect(res.body[0].sourceLogo).to.be.equal('image!')
      expect(res.body[0].rating).to.be.equal(2.5)
      expect(res.body[0].reviewUrl).to.be.equal('a review url')
    })
  })
})
