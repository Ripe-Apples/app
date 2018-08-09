import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurant'
import RestaurantCard from './restaurantCard'

class RestaurantList extends Component {
  componentDidMount() {
    this.props.fetchRestaurants()
  }

  render() {
    return (
      <div>
        <h1>Restaurants</h1>
        <div className="ui cards">
          {this.props.restaurants.map(restaurant => {
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
