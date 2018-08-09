import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const dollarSignHelper = number => {
  return '$'.repeat(number)
}

const RestaurantCard = props => {
  const restaurant = props.restaurant
  const restaurantScore = Math.round(
    restaurant.reviews
      .map(review => {
        if (review.source === 'Yelp') {
          return review.rating / 5
        } else if (review.source === 'Trip Advisor') {
          return review.rating / 5
        } else {
          return review.rating / 5
        }
      })
      .reduce((accum, currentVal) => accum + currentVal, 0) /
      restaurant.reviews.length *
      100,
    0
  )

  return (
    <div className="card">
      <div className="image card-image">
        <img src={restaurant.imageUrl} />
      </div>
      <div className="content">
        <div className="header">{restaurant.name}</div>
        <div className="meta">{restaurant.location}</div>
        <div className="description">
          {dollarSignHelper(restaurant.expenseRating)}, {restaurant.cuisineType},{' '}
          {restaurantScore}
          <span className="right floated">
            <Link to="/sourceComp">View Sources</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
