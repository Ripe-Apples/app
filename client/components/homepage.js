import React from 'react'
import {connect} from 'react-redux'
import Restaurant from './restaurant-list'
import Options from './options'
import {Grid} from 'semantic-ui-react'

const Homepage = () => (
  <div className="view-padding">
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

/**
 * CONTAINER
 */

export default connect()(Homepage)
