// /* global describe beforeEach it */

// const {expect} = require('chai')
// const db = require('../index')
// const Review = db.model('reviews')

// describe('Review model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('Create review', () => {
//     let newestReview

//     beforeEach(async () => {
//       newestReview = await Review.create({
//         source: 'Yelp',
//         sourceLogo: 'image!',
//         rating: 2.5,
//         reviewUrl: 'a review url'
//       })
//     })

//     console.log('newest review', newestReview)

//     expect(newestReview.source).to.be.equal('Yelp')
//     expect(newestReview.sourceLogo).to.be.equal('image!')
//     expect(newestReview.rating).to.be.equal(2.5)
//     expect(newestReview.reviewUrl).to.be.equal('a review url')
//   })
// })
