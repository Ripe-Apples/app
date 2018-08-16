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
    //Cuisines

    const chinese = 'Chinese',
      deli = 'Deli',
      italian = 'Italian',
      ramen = 'Ramen',
      seafood = 'Seafood',
      steakhouse = 'Steakhouse'

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
