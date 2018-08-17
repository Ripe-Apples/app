import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchRestaurants,
  changeFilteredRestaurants,
  changeRestaurantsOnCurrentPage
} from '../store/restaurant'
import {updateSearchBar} from '../store/filters'
import RestaurantCard from './restaurant-card'
import {
  Input,
  Grid,
  Pagination,
  Card,
  Divider,
  Loader,
  Dimmer
} from 'semantic-ui-react'

class RestaurantList extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.filterRestaurants = this.filterRestaurants.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchRestaurants()
    const {
      yelpWeight,
      zomatoWeight,
      googleWeight,
      foursquareWeight,
      restaurants
    } = this.props
    restaurants.forEach(restaurant => {
      restaurant.score = this.restaurantScore(
        restaurant.reviews,
        yelpWeight,
        zomatoWeight,
        googleWeight,
        foursquareWeight
      )
    })
    await this.props.changeFilteredRestaurants(this.props.restaurants)
    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(0, 12)
    )
  }

  restaurantScore = (
    reviews,
    yelpWeight,
    zomatoWeight,
    googleWeight,
    foursquareWeight
  ) => {
    let totalWeight = yelpWeight
    let reviewsString = ''
    reviews.forEach(review => {
      reviewsString += review.source
    })
    const reviewsLength = reviews.length

    if (reviewsString.indexOf('Zomato') !== -1) totalWeight += zomatoWeight
    if (reviewsString.indexOf('Google') !== -1) totalWeight += googleWeight
    if (reviewsString.indexOf('Foursquare') !== -1)
      totalWeight += foursquareWeight

    function weighter(sourceWeight, review) {
      const weight = sourceWeight / totalWeight * reviewsLength
      let denominator
      if (review.source === 'Foursquare') {
        denominator = 10
      } else {
        denominator = 5
      }
      const rating = review.rating / denominator
      return weight * rating
    }

    return Math.round(
      reviews
        .map(review => {
          if (review.source === 'Yelp') {
            return weighter(yelpWeight, review)
          } else if (review.source === 'Zomato') {
            return weighter(zomatoWeight, review)
          } else if (review.source === 'Google') {
            return weighter(googleWeight, review)
          } else if (review.source === 'Foursquare') {
            return weighter(foursquareWeight, review)
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
      this.props.filteredRestaurants.slice(0, 12)
    )
  }

  // This is a copy of the function in ./filter.js
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

  async handlePageChange(event) {
    const perPage = 12
    const startIndex =
      (parseInt(event.target.getAttribute('value'), 10) - 1) * perPage
    const endIndex = startIndex + perPage

    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(startIndex, endIndex)
    )
  }

  render() {
    let restaurants = this.props.restaurantsOnCurrentPage

    let restaurantsArray
    const lowercaseSearchValue = this.props.searchValue.toLowerCase()

    if (this.props.searchValue === '') {
      restaurantsArray = restaurants
    } else {
      restaurantsArray = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(lowercaseSearchValue)
      })
    }
    const {
      yelpWeight,
      zomatoWeight,
      googleWeight,
      foursquareWeight
    } = this.props

    restaurantsArray.forEach(restaurant => {
      restaurant.score = this.restaurantScore(
        restaurant.reviews,
        yelpWeight,
        zomatoWeight,
        googleWeight,
        foursquareWeight
      )
    })

    const totalRestaurants = this.props.filteredRestaurants.length
    const perPage = 12
    const pages = Math.ceil(totalRestaurants / perPage)

    return !totalRestaurants && this.props.searchValue === '' ? (
      <div>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </div>
    ) : (
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
              value={this.props.searchValue}
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
            .sort((restaurant1, restaurant2) => {
              if (restaurant2.reviews.length === restaurant1.reviews.length) {
                if (restaurant2.score === restaurant1.score) {
                  return restaurant2.id - restaurant1.id
                } else {
                  return restaurant2.score - restaurant1.score
                }
              } else {
                return restaurant2.reviews.length - restaurant1.reviews.length
              }
            })
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
  searchValue: state.filtersReducer.searchValue,
  yelpWeight: state.weighSourcesReducer.yelpWeight,
  zomatoWeight: state.weighSourcesReducer.zomatoWeight,
  googleWeight: state.weighSourcesReducer.googleWeight,
  foursquareWeight: state.weighSourcesReducer.foursquareWeight
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
