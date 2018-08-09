import React from 'react'
import {connect} from 'react-redux'
import Restaurant from './restaurant'
import Options from './options'

const Homepage = () => (
  <div className="view-padding">
    <div className="ui grid">
      <div className="twelve wide column">
        <Restaurant />
      </div>
      <div className="four wide column">
        <Options />
      </div>
    </div>
  </div>
)

/**
 * CONTAINER
 */

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Homepage)
