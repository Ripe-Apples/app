import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Popup, Card, Image} from 'semantic-ui-react'

const RestaurantCard = props => {
  const restaurant = props.restaurant
  const reviews = restaurant.reviews
  const dollarSignHelper = expenseRating => {
    return '$'.repeat(expenseRating)
  }

  return (
    <Card>
      <div className="card-image">
        <Image src={restaurant.imageUrl} />
      </div>
      <Card.Content>
        <Card.Header>
          {restaurant.name}
          <span className="right floated">{restaurant.score}%</span>
        </Card.Header>
        <Card.Meta>{restaurant.location}</Card.Meta>
        <Card.Description>
          {dollarSignHelper(restaurant.expenseRating)}, {restaurant.cuisineType}
          <span className="right floated">
            <Popup trigger={<a>View Sources</a>} wide="very">
              {reviews.map(review => (
                <div key={review.id}>
                  <p>
                    {' '}
                    <img className="sourceLogo" src={review.sourceLogo} />{' '}
                    {review.source}: {review.rating}{' '}
                  </p>
                </div>
              ))}
            </Popup>
          </span>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default RestaurantCard
