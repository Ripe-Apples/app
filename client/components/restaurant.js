import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import RestaurantList from './restaurant-list'

const Restaurant = () => (
  // <React.Fragment>
  <div>
    <RestaurantList />
    {/* <h1>Top Restaurants</h1>
    <div>
      <input type="text" />
    </div>
    <img
      height="200px"
      width="200px"
      src="https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
    />
    <p>Name</p>
    <p>Location</p>
    <p>Price</p>
    <p>Cuisine</p>
    <p>Rating</p>
    <Link to="/">View Sources</Link> */}
  {/* </React.Fragment> */}
  </div>
)

/**
 * CONTAINER
 */

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Restaurant)
