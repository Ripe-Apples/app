import React, {Component} from 'react'
import {Login, Signup} from './auth-form'
import {Grid} from 'semantic-ui-react'

class mergedAuth extends Component {
  render() {
    return (
      <div className="view-padding">
        <Grid columns={2} divided>
          <Grid.Column>
            <h1>Sign Up</h1>
            <Signup />
          </Grid.Column>
          <Grid.Column>
            <h1>Log In</h1>
            <Login />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default mergedAuth
