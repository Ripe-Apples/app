import React, {Component} from 'react'
import Restaurant from './restaurant-list'
import Options from './options'
import {Grid, Message} from 'semantic-ui-react'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {visible: true}
    this.handleDismiss = this.handleDismiss.bind(this)
  }

  handleDismiss() {
    this.setState({visible: false})
  }

  render() {
    return (
      <div>
        {this.state.visible ? (
          <div className="bottom-margin">
            <Message
              onDismiss={this.handleDismiss}
              header="Welcome to Ripe Apples!"
              content="Our goal is to make your search for the perfect restaurant easier by aggregating ratings from the top sites out there.  Basically think of us as a Rotten Tomatoes for restaurants 😉"
              color="orange"
            />
          </div>
        ) : (
          <div />
        )}
        <Grid columns="equal" divided>
          <Grid.Column width={12}>
            <Restaurant />
          </Grid.Column>
          <Grid.Column width={4}>
            <Options />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

export default Homepage
