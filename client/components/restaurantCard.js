import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Popup } from 'semantic-ui-react';

const RestaurantCard = props => {
  const restaurant = props.restaurant;
  const reviews = restaurant.reviews;
  const dollarSignHelper = expenseRating => {
    return '$'.repeat(expenseRating)
  }

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
            <Popup trigger={<a>View Sources</a>} wide='very'>
            {reviews.map(review => (
              <div key={review.id}>
                <p> <img src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjjytfK4-DcAhWyY98KHQgCBfUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.yelp.com%2Fbrand&psig=AOvVaw1pQVxBz1WNhYdStdcnL6Sa&ust=1533931841022248" />  {review.source}:   {review.rating} </p>
              </div>
            ))}
            </Popup>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
