import React from 'react'
import {connect} from 'react-redux'
import WeighSources from './weighSources'
import Filter from './filter'

const Options = () => (
  <React.Fragment>
    <h1>Advanced Options</h1>

    <WeighSources />
    <Filter />
  </React.Fragment>
)

/**
 * CONTAINER
 */

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Options)
