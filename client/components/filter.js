import React, {Component} from 'react'
import {List, Dropdown, ListItem} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changePrice, changeCuisine, changeLocation} from '../store/filters.js'
import {changeFilteredRestaurants} from '../store/restaurant'

class filter extends Component {
  constructor() {
    super()
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCuisineChange = this.handleCuisineChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.filterRestaurants = this.filterRestaurants.bind(this)
  }

  async handlePriceChange(event, {value}) {
    const price = value
    await this.props.changePrice(price)
    await this.filterRestaurants()
  }
  async handleCuisineChange(event, {value}) {
    const cuisine = value
    await this.props.changeCuisine(cuisine)
    await this.filterRestaurants()
  }
  async handleLocationChange(event, {value}) {
    const location = value
    await this.props.changeLocation(location)
    await this.filterRestaurants()
  }

  async filterRestaurants() {
    let {restaurants} = this.props
    const {price, cuisine, location} = this.props

    restaurants =
      price === '' && cuisine === '' && location === ''
        ? restaurants
        : restaurants.filter(restaurant => {
            return (
              (restaurant.expenseRating === price || price === '') &&
              (restaurant.cuisineType[0].title === cuisine || cuisine === '') &&
              (restaurant.location === location || location === '')
            )
          })

    await this.props.changeFilteredRestaurants(restaurants)
  }

  render() {
    //Cuisines

    const chinese = 'Chinese',
      deli = 'Deli',
      italian = 'Italian',
      ramen = 'Ramen',
      seafood = 'Seafood',
      steakhouse = 'Steakhouse'

    //Locations

    const newYork = 'New York'

    const prices = [
      {text: 'All', value: ''},
      {text: '$', value: 1},
      {text: '$$', value: 2},
      {text: '$$$', value: 3},
      {text: '$$$$', value: 4}
    ]
    const cuisine = [
      {text: 'All', value: ''},
      {text: chinese, value: chinese},
      {text: deli, value: deli},
      {text: italian, value: italian},
      {text: ramen, value: ramen},
      {text: seafood, value: seafood},
      {text: steakhouse, value: steakhouse}
    ]
    const location = [{text: 'All', value: ''}, {text: newYork, value: newYork}]

    return (
      <React.Fragment>
        <List>
          <List.Header>Filter</List.Header>
          <List.Item>
            <Dropdown
              placeholder="Price"
              fluid
              selection
              options={prices}
              onChange={this.handlePriceChange}
              value={this.props.price}
            />
          </List.Item>

          <ListItem>
            <Dropdown
              placeholder="Cuisine"
              fluid
              selection
              options={cuisine}
              onChange={this.handleCuisineChange}
              value={this.props.cuisine}
            />
          </ListItem>
          <ListItem>
            <Dropdown
              placeholder="Location"
              fluid
              selection
              options={location}
              onChange={this.handleLocationChange}
              value={this.props.location}
            />
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  price: state.filtersReducer.price,
  cuisine: state.filtersReducer.cuisine,
  location: state.filtersReducer.location,
  restaurants: state.restaurantReducer.restaurants
})

const mapDispatch = dispatch => ({
  changePrice: price => dispatch(changePrice(price)),
  changeCuisine: cuisine => dispatch(changeCuisine(cuisine)),
  changeLocation: location => dispatch(changeLocation(location)),
  changeFilteredRestaurants: filteredRestaurants =>
    dispatch(changeFilteredRestaurants(filteredRestaurants))
})

export default connect(mapState, mapDispatch)(filter)
