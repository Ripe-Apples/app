import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import RestaurantList from './restaurant-list'

const Restaurant = () => (
  <div>
    <RestaurantList />
  </div>
)

/**
 * CONTAINER
 */

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Restaurant)
