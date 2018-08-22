export const restaurantSort = restaurantArr => {
  return restaurantArr.sort((restaurant1, restaurant2) => {
    if (restaurant2.reviews.length === restaurant1.reviews.length) {
      if (restaurant2.score === restaurant1.score) {
        return restaurant2.id - restaurant1.id
      } else {
        return restaurant2.score - restaurant1.score
      }
    } else {
      return restaurant2.reviews.length - restaurant1.reviews.length
    }
  })
}

export const restaurantScorer = (
  reviews,
  yelpWeight,
  zomatoWeight,
  googleWeight,
  foursquareWeight
) => {
  let totalWeight = yelpWeight
  let reviewsString = ''
  reviews.forEach(review => {
    reviewsString += review.source
  })
  const reviewsLength = reviews.length

  if (reviewsString.indexOf('Zomato') !== -1) totalWeight += zomatoWeight
  if (reviewsString.indexOf('Google') !== -1) totalWeight += googleWeight
  if (reviewsString.indexOf('Foursquare') !== -1)
    totalWeight += foursquareWeight

  function weighter(sourceWeight, review) {
    const weight = sourceWeight / totalWeight * reviewsLength
    let denominator
    if (review.source === 'Foursquare') {
      denominator = 10
    } else {
      denominator = 5
    }
    const rating = review.rating / denominator
    return weight * rating
  }

  return Math.round(
    reviews
      .map(review => {
        if (review.source === 'Yelp') {
          return weighter(yelpWeight, review)
        } else if (review.source === 'Zomato') {
          return weighter(zomatoWeight, review)
        } else if (review.source === 'Google') {
          return weighter(googleWeight, review)
        } else if (review.source === 'Foursquare') {
          return weighter(foursquareWeight, review)
        }
      })
      .reduce((accum, currentVal) => accum + currentVal, 0) /
      reviews.length *
      100,
    0
  )
}
