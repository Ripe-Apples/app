import React from 'react'
import {Popup, Card, Image, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const RestaurantCard = props => {
  const restaurant = props.restaurant
  const reviews = restaurant.reviews
  const dollarSignHelper = expenseRating => {
    if (expenseRating === 0) return 'N/A'
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
      <div>
        <Link to={`/restaurant/${restaurant.id}`} className="card-image">
          <Image src={restaurant.imageUrl} />
        </Link>
      </div>
      <Card.Content>
        <Card.Header>
          <Link
            to={`/restaurant/${restaurant.id}`}
            className="card-image"
            style={{color: 'black'}}
          >
            {restaurant.name}
          </Link>
          <span className="right floated">
            <Label color={color} key={color}>
              {restaurant.score}%
            </Label>
          </span>
        </Card.Header>
        <Card.Meta>
          {restaurant.location.slice(0, restaurant.location.indexOf(','))}...
        </Card.Meta>
        <Card.Description>
          {dollarSignHelper(restaurant.expenseRating)},{' '}
          {restaurant.cuisineType[0].title.slice(0, 17)}
          {restaurant.cuisineType[0].title.length > 17 ? '...' : ''}
          <span className="right floated">
            <Popup trigger={<a>View Sources ({reviews.length})</a>} wide="very">
              {reviews.map(review => (
                <div key={review.id}>
                  <p>
                    {' '}
                    <img className="sourceLogo" src={review.sourceLogo} />{' '}
                    {review.source}: {review.rating}
                    {review.source === 'Yelp' ||
                    review.source === 'Zomato' ||
                    review.source === 'Google'
                      ? ' / 5'
                      : ' / 10'}
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
