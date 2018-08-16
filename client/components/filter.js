import React, {Component} from 'react'
import {List, Dropdown, ListItem} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changePrice, changeCuisine} from '../store/filters.js'
import {
  changeFilteredRestaurants,
  changeRestaurantsOnCurrentPage
} from '../store/restaurant'

class filter extends Component {
  constructor() {
    super()
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCuisineChange = this.handleCuisineChange.bind(this)
    this.filterRestaurants = this.filterRestaurants.bind(this)
  }

  async handlePriceChange(event, {value}) {
    const price = value
    await this.props.changePrice(price)
    await this.filterRestaurants()
    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(0, 12)
    )
  }
  async handleCuisineChange(event, {value}) {
    const cuisine = value
    await this.props.changeCuisine(cuisine)
    await this.filterRestaurants()
    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(0, 12)
    )
  }

  async filterRestaurants() {
    let {restaurants} = this.props
    const {price, cuisine} = this.props

    restaurants =
      price === '' && cuisine === ''
        ? restaurants
        : restaurants.filter(restaurant => {
            return (
              (restaurant.expenseRating === price || price === '') &&
              (restaurant.cuisineType[0].title === cuisine || cuisine === '')
            )
          })

    // filter by what is in the search bar
    const lowercaseSearchValue = this.props.searchValue.toLowerCase()

    if (this.props.searchValue !== '') {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(lowercaseSearchValue)
      })
    }

    await this.props.changeFilteredRestaurants(restaurants)
  }

  render() {
    const {restaurants} = this.props

    const cuisines = {}
    restaurants.forEach(restaurant => {
      let cuisineType = restaurant.cuisineType[0].title
      if (!cuisines[cuisineType]) {
        cuisines[cuisineType] = true
      }
    })

    const cuisine = [{text: 'All', value: ''}]

    for (let key in cuisines) {
      if (cuisines.hasOwnProperty(key)) {
        cuisine.push({text: key, value: key})
      }
    }

    const prices = [
      {text: 'All', value: ''},
      {text: '$', value: 1},
      {text: '$$', value: 2},
      {text: '$$$', value: 3},
      {text: '$$$$', value: 4}
    ]

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
              options={cuisine.sort((cuisine1, cuisine2) => {
                if (cuisine1.text > cuisine2.text) {
                  return 1
                } else {
                  return -1
                }
              })}
              onChange={this.handleCuisineChange}
              value={this.props.cuisine}
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
  searchValue: state.filtersReducer.searchValue,
  restaurants: state.restaurantReducer.restaurants,
  filteredRestaurants: state.restaurantReducer.filteredRestaurants
})

const mapDispatch = dispatch => ({
  changePrice: price => dispatch(changePrice(price)),
  changeCuisine: cuisine => dispatch(changeCuisine(cuisine)),
  changeFilteredRestaurants: filteredRestaurants =>
    dispatch(changeFilteredRestaurants(filteredRestaurants)),
  changeRestaurantsOnCurrentPage: restaurants =>
    dispatch(changeRestaurantsOnCurrentPage(restaurants))
})

export default connect(mapState, mapDispatch)(filter)
