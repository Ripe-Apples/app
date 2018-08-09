import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const dollarSignHelper = number => {
  return '$'.repeat(number)
}

const RestaurantCard = props => {
  const restaurant = props.restaurant

  return (
    <div className="card">
      <div className="image card-image">
        <img src={restaurant.imageUrl} />
      </div>
      <div className="content">
        <div className="header">{restaurant.name}</div>
        <div className="meta">{restaurant.location}</div>
        <div className="description">
          {dollarSignHelper(restaurant.expenseRating)}, {restaurant.cuisineType}
          <span className="right floated">
            <Link to="/sourceComp">View Sources</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
