import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Grid, MenuItem} from 'semantic-ui-react'
import {reset as resetWeights} from '../store/weighSources'
import {reset as resetFilters} from '../store/filters'

class Navbar extends Component {
  constructor() {
    super()
    //this.resetClick = this.resetClick.bind(this)
  }

  //used if we want to have page reset when clicking home
  // async resetClick() {
  //   await this.props.resetWeights()
  //   await this.props.resetFilters()
  // }

  render() {
    const isLoggedIn = this.props.isLoggedIn
    const handleClick = this.props.handleClick
    const userEmail = this.props.userEmail
    return (
      <div className="top-menu">
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
            <React.Fragment>
              <Menu.Item>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#" onClick={handleClick}>
                  Logout
                </Link>
              </Menu.Item>
              <MenuItem>Logged in as: {userEmail}</MenuItem>
            </React.Fragment>
          ) : (
            // The navbar will show these links before you log in
            <React.Fragment>
              <Menu.Item>
                <Link to="/auth">Sign Up / Login</Link>
              </Menu.Item>
            </React.Fragment>
          )}
        </Menu>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email
  }
}

const mapDispatch = dispatch => {
  //reset functions arent working yet
  return {
    handleClick() {
      dispatch(logout())
    }
    // resetWeights: () => dispatch(resetWeights()),
    // resetFilters: () => dispatch(resetFilters()),
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
