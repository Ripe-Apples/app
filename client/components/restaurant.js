import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Restaurant = () => (
  <React.Fragment>
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
    <Link to="/">View Sources</Link>
  </React.Fragment>
)

/**
 * CONTAINER
 */

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Restaurant)
