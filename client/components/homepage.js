import React from 'react'
import {connect} from 'react-redux'
import Restaurant from './restaurant'
import Options from './options'

const Homepage = () => (
  <div className="container-fluid">
    <h1>Top Restaurants</h1>
    <div className="row no-gutters">
      <div className="col-2">
        <Restaurant />
      </div>
      <div className="col-3">
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
