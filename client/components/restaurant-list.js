import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchRestaurants,
  changeFilteredRestaurants,
  changeRestaurantsOnCurrentPage
} from '../store/restaurant'
import {updateSearchBar, changeCurrentPage} from '../store/filters'
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
    this.state = {
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.filterRestaurants = this.filterRestaurants.bind(this)
  }

  async componentDidMount() {
    // if there are no restaurants in the store then fetch them from the database (first time the page is loaded)
    if (this.props.restaurants.length === 0) {
      await this.props.fetchRestaurants()
    }

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

    // populates filteredRestaurants in the store on first navigation to the page
    if (
      this.props.filteredRestaurants.length === 0 &&
      this.props.price === '' &&
      this.props.cuisine === '' &&
      this.props.searchValue === ''
    ) {
      await this.filterRestaurants()
    }

    // loads the page that the user was on
    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(
        (this.props.currentPage - 1) * 12,
        (this.props.currentPage - 1) * 12 + 12
      )
    )

    this.setState({loading: false})
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

    // resets the current page to 1 upon typing into the searchbar
    await this.props.changeCurrentPage(1)

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
    await this.props.changeCurrentPage(
      parseInt(event.target.getAttribute('value'), 10)
    )

    const perPage = 12
    const startIndex = (this.props.currentPage - 1) * perPage
    const endIndex = startIndex + perPage

    await this.props.changeRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(startIndex, endIndex)
    )
  }

  render() {
    const restaurants = this.props.restaurantsOnCurrentPage
    const totalRestaurants = this.props.filteredRestaurants.length
    const perPage = 12
    const pages = Math.ceil(totalRestaurants / perPage)

    return this.state.loading ? (
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
          activePage={this.props.currentPage}
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
  currentPage: state.filtersReducer.currentPage,
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
  updateSearchBar: searchValue => dispatch(updateSearchBar(searchValue)),
  changeCurrentPage: newPage => dispatch(changeCurrentPage(newPage))
})

export default connect(mapState, mapDispatch)(RestaurantList)
