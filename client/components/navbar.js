import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="ui top menu">
    <div className="item">
      <a to="/">Ripe Apples</a>
    </div>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <a href="#" onClick={handleClick} className="item">
          Logout
        </a>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
        <a to="/login" className="item">
          Login
        </a>
        <a to="/signup" className="item">
          Sign Up
        </a>
      </div>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
