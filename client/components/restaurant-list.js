import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchRestaurants,
  changeFilteredRestaurants,
  changeRestaurantsOnCurrentPage
} from '../store/restaurant'
import {updateSearchBar} from '../store/filters'
import RestaurantCard from './restaurant-card'
import {Input, Grid, Pagination, Card, Divider} from 'semantic-ui-react'

class RestaurantList extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.filterRestaurants = this.filterRestaurants.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchRestaurants()
    await this.props.changeFilteredRestaurants(this.props.restaurants)
    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(0, 9)
    )
  }

  restaurantScore = (reviews, yelpWeight, tripAdvisorWeight, googleWeight) => {
    const totalWeight = yelpWeight + tripAdvisorWeight + googleWeight

    function weighter(sourceWeight, review) {
      const weight = sourceWeight / totalWeight * 3
      const rating = review.rating / 5
      return weight * rating
    }

    return Math.round(
      reviews
        .map(review => {
          if (review.source === 'Yelp') {
            return weighter(yelpWeight, review)
          } else if (review.source === 'Trip Advisor') {
            return weighter(tripAdvisorWeight, review)
          } else if (review.source === 'Google') {
            return weighter(googleWeight, review)
          }
        })
        .reduce((accum, currentVal) => accum + currentVal, 0) /
        reviews.length *
        100,
      0
    )
  }

  async handleChange(event) {
    await this.props.updateSearchBar(event.target.value)

    await this.filterRestaurants()

    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(0, 9)
    )
  }

  // This is a copy of the function in ./filter.js
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

    // filter by what is in the search bar
    const lowercaseSearchValue = this.props.searchValue.toLowerCase()

    if (this.props.searchValue !== '') {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(lowercaseSearchValue)
      })
    }

    await this.props.changeFilteredRestaurants(restaurants)
  }

  async handlePageChange(event) {
    const perPage = 9
    const startIndex =
      (parseInt(event.target.getAttribute('value'), 10) - 1) * perPage
    const endIndex = startIndex + perPage

    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(startIndex, endIndex)
    )
  }

  render() {
    let restaurants = this.props.restaurantsOnCurrentPage
    const {yelpWeight, tripAdvisorWeight, googleWeight} = this.props

    restaurants.forEach(restaurant => {
      restaurant.score = this.restaurantScore(
        restaurant.reviews,
        yelpWeight,
        tripAdvisorWeight,
        googleWeight
      )
    })

    const totalRestaurants = this.props.filteredRestaurants.length
    const perPage = 9
    const pages = Math.ceil(totalRestaurants / perPage)

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={8} floated="left">
            <h1>Restaurants</h1>
          </Grid.Column>
          <Grid.Column width={8} floated="right" textAlign="right">
            <Input
              onChange={this.handleChange}
              icon="search"
              placeholder="Search..."
            />
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Pagination
          defaultActivePage={1}
          totalPages={pages}
          onClick={this.handlePageChange}
        />
        <Divider hidden />
        <Card.Group>
          {restaurants
            .sort(
              (restaurant1, restaurant2) =>
                restaurant2.score - restaurant1.score
            )
            .map(restaurant => {
              return (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              )
            })}
        </Card.Group>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  restaurants: state.restaurantReducer.restaurants,
  filteredRestaurants: state.restaurantReducer.filteredRestaurants,
  restaurantsOnCurrentPage: state.restaurantReducer.restaurantsOnCurrentPage,
  price: state.filtersReducer.price,
  cuisine: state.filtersReducer.cuisine,
  location: state.filtersReducer.location,
  searchValue: state.filtersReducer.searchValue,
  yelpWeight: state.weighSourcesReducer.yelpWeight,
  tripAdvisorWeight: state.weighSourcesReducer.tripAdvisorWeight,
  googleWeight: state.weighSourcesReducer.googleWeight
})

const mapDispatch = dispatch => ({
  fetchRestaurants: () => dispatch(fetchRestaurants()),
  changeFilteredRestaurants: filteredRestaurants =>
    dispatch(changeFilteredRestaurants(filteredRestaurants)),
  changeRestaurantsOnCurrentPage: restaurants =>
    dispatch(changeRestaurantsOnCurrentPage(restaurants)),
  updateSearchBar: searchValue => dispatch(updateSearchBar(searchValue))
})

export default connect(mapState, mapDispatch)(RestaurantList)
