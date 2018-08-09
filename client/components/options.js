import React from 'react'
import {connect} from 'react-redux'

const Options = () => (
  <React.Fragment>
    <h1>Advanced Options</h1>
    <div>
      <input type="text" />
    </div>
    <h3>Weigh Sources</h3>
    <div>
      <input type="range" id="start" name="weight" min="0" max="100" />
    </div>
    <div>
      <input type="range" id="start" name="weight" min="0" max="100" />
    </div>
    <div>
      <input type="range" id="start" name="weight" min="0" max="100" />
    </div>
    <h3>Filter Restaurants</h3>
    <div>
      <select>
        <option value="default">Price</option>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
        <option value="$$$$">$$$$</option>
      </select>
    </div>
    <div>
      <select>
        <option value="default">Cuisine Type</option>
      </select>
    </div>
    <div>
      <select>
        <option value="default">Location</option>
        <option value="new york">New York</option>
      </select>
    </div>
  </React.Fragment>
)

/**
 * CONTAINER
 */

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Options)
