import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants, changeFilteredRestaurants} from '../store/restaurant'
import RestaurantCard from './restaurant-card'
import {Input, Grid, Pagination, Card} from 'semantic-ui-react'

class RestaurantList extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
      restaurants: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.filterRestaurants = this.filterRestaurants.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchRestaurants()

    // when the page first loads, load the first page
    this.setState({
      restaurants: this.props.restaurants.slice(0, 9)
    })
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

  handleChange(event) {
    this.setState({searchValue: event.target.value})
  }

  handlePageChange(event) {
    const perPage = 9
    const startIndex =
      (parseInt(event.target.getAttribute('value'), 10) - 1) * perPage
    const endIndex = startIndex + perPage

    this.setState({
      restaurants: this.props.restaurants.slice(startIndex, endIndex)
    })
  }

  async filterRestaurants() {
    let {restaurants} = this.props
    const {
      price,
      cuisine,
      location,
    } = this.props

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
    await this.props.changeFilteredRestaurants(restaurants);
  }

  render() {
    let {restaurants} = this.state
    const {
      yelpWeight,
      tripAdvisorWeight,
      googleWeight
    } = this.props

    this.filterRestaurants()

    restaurants.forEach(restaurant => {
      restaurant.score = this.restaurantScore(
        restaurant.reviews,
        yelpWeight,
        tripAdvisorWeight,
        googleWeight
      )
    })
    let restaurantsArray
    const lowercaseSearchValue = this.state.searchValue.toLowerCase()

    if (this.state.searchValue === '') {
      restaurantsArray = restaurants
    } else {
      restaurantsArray = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(lowercaseSearchValue)
      })
    }

    const totalRestaurants = 1000
    const perPage = 9
    const pages = Math.ceil(totalRestaurants / perPage)

    return (
      <div>
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

        <Pagination
          defaultActivePage={1}
          totalPages={pages}
          onClick={this.handlePageChange}
        />

        <div className="ui cards">
          {restaurantsArray
            .sort(
              (restaurant1, restaurant2) =>
                restaurant2.score - restaurant1.score
            )
            .map(restaurant => {
              return (
                <RestaurantCard 
                restaurant={restaurant} key={restaurant.id}
              />
              )
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  restaurants: state.restaurantReducer.restaurants,
  filteredRestaurants: state.restaurant,
  price: state.filtersReducer.price,
  cuisine: state.filtersReducer.cuisine,
  location: state.filtersReducer.location,
  yelpWeight: state.weighSourcesReducer.yelpWeight,
  tripAdvisorWeight: state.weighSourcesReducer.tripAdvisorWeight,
  googleWeight: state.weighSourcesReducer.googleWeight
})

const mapDispatch = dispatch => ({
  fetchRestaurants: () => dispatch(fetchRestaurants()),
  changeFilteredRestaurants: filteredRestaurants => dispatch(changeFilteredRestaurants(filteredRestaurants))
})

export default connect(mapState, mapDispatch)(RestaurantList)
