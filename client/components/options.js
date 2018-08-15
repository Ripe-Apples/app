import React, {Component} from 'react'
import {connect} from 'react-redux'
import WeighSources from './weigh-sources'
import Filter from './filter'
import {reset as resetWeights} from '../store/weighSources'
import {reset as resetFilters} from '../store/filters'
import {
  changeFilteredRestaurants,
  changeRestaurantsOnCurrentPage
} from '../store/restaurant'
import {Header, List, Button} from 'semantic-ui-react'

class Options extends Component {
  constructor() {
    super()
    this.handleReset = this.handleReset.bind(this)
  }

  async handleReset() {
    await this.props.resetWeights()
    await this.props.resetFilters()
    await this.props.resetFilteredRestaurants(this.props.restaurants)
    await this.props.resetRestaurantsOnCurrentPage(
      this.props.filteredRestaurants.slice(0, 9)
    )
  }

  render() {
    return (
      <div>
        <List>
          <List.Item>
            <div className="weigh-sources-flex">
              <Header as="h1">Advanced Options</Header>
              <div className="item-flex right">
                <div className="reset">
                  <Button
                    size="tiny"
                    negative
                    type="submit"
                    onClick={this.handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </List.Item>
          <List.Item>
            <WeighSources />
          </List.Item>
          <List.Item>
            <Filter />
          </List.Item>
        </List>
      </div>
    )
  }
}

const mapState = state => ({
  restaurants: state.restaurantReducer.restaurants,
  filteredRestaurants: state.restaurantReducer.filteredRestaurants
})

const mapDispatch = dispatch => ({
  resetWeights: () => dispatch(resetWeights()),
  resetFilters: () => dispatch(resetFilters()),
  resetFilteredRestaurants: allRestaurants =>
    dispatch(changeFilteredRestaurants(allRestaurants)),
  resetRestaurantsOnCurrentPage: restaurantsOnFirstPage =>
    dispatch(changeRestaurantsOnCurrentPage(restaurantsOnFirstPage))
})

export default connect(mapState, mapDispatch)(Options)
