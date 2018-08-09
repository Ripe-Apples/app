import React from 'react'
import {connect} from 'react-redux'
import Restaurant from './restaurant'
import Options from './options'

const Homepage = () => (
  <div class="ui grid">
    <div class="twelve wide column">
      <h1>Top Restaurants</h1>
      <Restaurant />
    </div>
    <div class="four wide column">
      <Options />
    </div>
  </div>
)

/**
 * CONTAINER
 */

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Homepage)
