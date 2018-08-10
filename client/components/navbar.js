import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Grid} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Menu stackable inverted color="orange">
    <Menu.Item>
      <Link to="/">
        <Grid centered verticalAlign="middle" columns={2}>
          <Grid.Column width={4}>
            <img
              height="25px"
              width="25px"
              src="https://freeiconshop.com/wp-content/uploads/edd/apple-outline-filled.png"
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <h3>Ripe Apples</h3>
          </Grid.Column>
        </Grid>
      </Link>
    </Menu.Item>
    {isLoggedIn ? (
      // The navbar will show these links after you log in
      <Menu.Item>
        <Link href="#" onClick={handleClick}>
          Logout
        </Link>
      </Menu.Item>
    ) : (
      // The navbar will show these links before you log in
      <React.Fragment>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
      </React.Fragment>
    )}
  </Menu>
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
