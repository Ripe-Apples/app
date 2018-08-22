import React, {Component} from 'react'
import {connect} from 'react-redux'
import TastePreferences from './tastePreferences'

class Profile extends Component {
  render() {
    const {user} = this.props
    const userStr = user.email.slice(0, user.email.indexOf('@'))

    return (
      <div>
        <h1>{userStr}'s Profile</h1>
        <h3>Recommended</h3>
        <TastePreferences />
        <h3>Liked Restaurants</h3>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Profile)
