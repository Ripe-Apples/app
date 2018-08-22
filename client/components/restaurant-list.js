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
import {restaurantSort, restaurantScorer} from '../helperFuncs'

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
      restaurant.score = restaurantScorer(
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
    // recalculates each restaurant's score on each render
    const {
      yelpWeight,
      zomatoWeight,
      googleWeight,
      foursquareWeight
    } = this.props

    this.props.restaurants.forEach(restaurant => {
      restaurant.score = restaurantScorer(
        restaurant.reviews,
        yelpWeight,
        zomatoWeight,
        googleWeight,
        foursquareWeight
      )
    })

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
          {restaurantSort(restaurants).map(restaurant => {
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
