import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurant'
import RestaurantCard from './restaurantCard'
import {Input} from 'semantic-ui-react'

class RestaurantList extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchRestaurants()
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value})
  }

  render() {
    let restaurantsArray
    const lowercaseSearchValue = this.state.searchValue.toLowerCase()

    if (this.state.searchValue === '') {
      restaurantsArray = this.props.restaurants
    } else {
      restaurantsArray = this.props.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(lowercaseSearchValue)
      })
    }

    return (
      <div>
        <div>
          <Input
            onChange={this.handleChange}
            icon="search"
            placeholder="Search..."
          />
          <h1>Restaurants</h1>
        </div>
        <div className="ui cards">
          {restaurantsArray.map(restaurant => {
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
