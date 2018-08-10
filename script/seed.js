'use strict'

const db = require('../server/db')
const {User, Restaurant, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const restaurants = await Promise.all([
    Restaurant.create({
      name: 'Marea',
      cuisineType: 'Seafood',
      expenseRating: '4',
      location: 'New York',
      imageUrl:
        'http://www.marea-nyc.com/files/8ceee1900ddab8356228ca0d361ed9a0_full_size.jpg'
    }),
    Restaurant.create({
      name: 'Ai Fiori',
      cuisineType: 'Italian',
      expenseRating: '4',
      location: 'New York',
      imageUrl:
        'https://zagat-photos.imgix.net/ChIJMYIE-KlZwokRZuFHn8jkNuo/5b473da6c355ce91cab7e88836b3b6a0.jpg?fit=crop&crop=center&max-w=384&max-h=384&auto=format'
    }),
    Restaurant.create({
      name: 'Crif Dogs',
      cuisineType: 'Hot Dogs',
      expenseRating: '1',
      location: 'New York',
      imageUrl:
        'https://d37219swed47g7.cloudfront.net/media/reviews/crif-dogs/banners/Crif-Dogs_0.jpg'
    }),
    Restaurant.create({
      name: 'Ivan Ramen',
      cuisineType: 'Ramen',
      expenseRating: '2',
      location: 'New York',
      imageUrl:
        'https://farm1.staticflickr.com/608/21198964443_d75bbf8885_c.jpg'
    }),
    Restaurant.create({
      name: 'Momofuku Noodle Bar',
      cuisineType: 'Ramen',
      expenseRating: '2',
      location: 'New York',
      imageUrl:
        'https://assets3.thrillist.com/v1/image/1676149/size/tmg-article_default_mobile.jpg'
    }),
    Restaurant.create({
      name: 'Carbone',
      cuisineType: 'Italian',
      expenseRating: '4',
      location: 'New York',
      imageUrl:
        'http://theopinionator.com/wp-content/uploads/2015/12/Carbone-3.jpg'
    }),
    Restaurant.create({
      name: 'Peter Luger',
      cuisineType: 'Steakhouse',
      expenseRating: '4',
      location: 'New York',
      imageUrl: 'https://i.redd.it/z3u65bv8o6101.jpg'
    }),
    Restaurant.create({
      name: "Katz's",
      cuisineType: 'Deli',
      expenseRating: '2',
      location: 'New York',
      imageUrl: "http://katzsdeli.net/images/Katz's-Deli-about.jpg"
    }),
    Restaurant.create({
      name: 'Szechuan Gourment',
      cuisineType: 'Chinese',
      expenseRating: '2',
      location: 'New York',
      imageUrl:
        'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1443479615%2Fnyc0915-Szechuan-gourmet.jpg%3Fitok%3DhHT7MVmo&q=85'
    })
  ])

  console.log(`seeded ${restaurants.length} users`)

  const reviews = await Promise.all([
    Review.create({
      source: 'Yelp',
      rating: 3.5,
      restaurantId: 9,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4,
      restaurantId: 9,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.2,
      restaurantId: 9,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.5,
      restaurantId: 8,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 4,
      restaurantId: 8,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4,
      restaurantId: 8,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.4,
      restaurantId: 7,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 4,
      restaurantId: 7,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4,
      restaurantId: 7,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 4,
      restaurantId: 6,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.3,
      restaurantId: 6,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4,
      restaurantId: 6,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4.5,
      restaurantId: 5,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 3.5,
      restaurantId: 5,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 3.5,
      restaurantId: 5,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.3,
      restaurantId: 4,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4.5,
      restaurantId: 4,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 3.5,
      restaurantId: 4,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 4,
      restaurantId: 3,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4.5,
      restaurantId: 3,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.3,
      restaurantId: 3,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.5,
      restaurantId: 2,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 4,
      restaurantId: 2,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4.5,
      restaurantId: 2,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Trip Advisor',
      rating: 4.5,
      restaurantId: 1,
      sourceLogo: 'https://image.flaticon.com/icons/svg/732/732253.svg'
    }),
    Review.create({
      source: 'Google',
      rating: 4.5,
      restaurantId: 1,
      sourceLogo: 'https://image.flaticon.com/icons/svg/281/281781.svg'
    }),
    Review.create({
      source: 'Yelp',
      rating: 4,
      restaurantId: 1,
      sourceLogo: 'https://image.flaticon.com/icons/svg/174/174882.svg'
    })
  ])

  console.log(`seeded ${reviews.length} users`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
