import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Popup, Card, Image, Label} from 'semantic-ui-react'

const RestaurantCard = props => {
  const restaurant = props.restaurant
  const reviews = restaurant.reviews
  const dollarSignHelper = expenseRating => {
    return '$'.repeat(expenseRating)
  }
  const labelColor = score => {
    if (score >= 80) {
      return 'green'
    } else if (score >= 50) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  let color = labelColor(restaurant.score)

  return (
    <Card>
      <div className="card-image">
        <Image src={restaurant.imageUrl} />
      </div>
      <Card.Content>
        <Card.Header>
          {restaurant.name}
          <span className="right floated">
            <Label color={color} key={color}>
              {restaurant.score}%
            </Label>
          </span>
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
