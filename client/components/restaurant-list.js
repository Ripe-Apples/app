import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurant'
import RestaurantCard from './restaurant-card'

class RestaurantList extends Component {
  componentDidMount() {
    this.props.fetchRestaurants()
  }
  restaurantScore = reviews => {
    return Math.round(
      reviews
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
        reviews.length *
        100,
      0
    )
  }

  render() {
    const restaurants = this.props.restaurants
    restaurants.forEach(restaurant => {
      restaurant.score = this.restaurantScore(restaurant.reviews)
      console.log(restaurant.score)
    })

    return (
      <div>
        <h1>Restaurants</h1>
        <div className="ui cards">
          {this.props.restaurants
            .sort(
              (restaurant1, restaurant2) =>
                restaurant2.score - restaurant1.score
            )
            .map(restaurant => {
              return (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              )
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  restaurants: state.restaurantReducer.restaurants
})

const mapDispatch = dispatch => ({
  fetchRestaurants: () => dispatch(fetchRestaurants())
})

export default connect(mapState, mapDispatch)(RestaurantList)
