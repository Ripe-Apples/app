import React, {Component} from 'react'
import {List, Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {
  yelpChange,
  tripAdvisorChange,
  googleChange
} from '../store/weighSources'

class weighSources extends Component {
  decrementBlock(val, callback, yelpWeight, tripAdvisorWeight, googleWeight) {
    if (yelpWeight + tripAdvisorWeight + googleWeight > 1) {
      if (val) {
        val--
        callback(val)
      }
    }
  }
  incrementBlock(val, callback) {
    if (val < 10) {
      val++
      callback(val)
    }
  }

  render() {
    let {yelpWeight, tripAdvisorWeight, googleWeight} = this.props

    const {yelpChange, tripAdvisorChange, googleChange} = this.props

    return (
      <div>
        <h3>Weigh Sources</h3>
        <div className="ui form">
          <div className="inline fields">
            <div className="eight wide field" style={{textAlign: 'right'}}>
              <label>Yelp</label>
            </div>
            <div className="eight wide field">
              <div className="ui buttons">
                <button
                  id="Yelp"
                  type="button"
                  className="ui button"
                  onClick={() => {
                    this.decrementBlock(
                      yelpWeight,
                      yelpChange,
                      yelpWeight,
                      tripAdvisorWeight,
                      googleWeight
                    )
                  }}
                >
                  <i id="Yelp" className="minus icon" />
                </button>
                <div className="or" data-text={yelpWeight.toString()} />
                <button
                  id="Yelp"
                  type="button"
                  className="ui positive button"
                  onClick={() => {
                    this.incrementBlock(yelpWeight, yelpChange)
                  }}
                >
                  <i id="Yelp" className="plus icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ui form">
          <div className="inline fields">
            <div className="eight wide field">
              <label>Trip Advisor</label>
            </div>
            <div className="eight wide field">
              <div className="ui buttons">
                <button
                  id="Trip Advisor"
                  type="button"
                  className="ui button"
                  onClick={() => {
                    this.decrementBlock(
                      tripAdvisorWeight,
                      tripAdvisorChange,
                      yelpWeight,
                      tripAdvisorWeight,
                      googleWeight
                    )
                  }}
                >
                  <i id="Trip Advisor" className="minus icon" />
                </button>
                <div className="or" data-text={tripAdvisorWeight.toString()} />
                <button
                  id="Trip Advisor"
                  type="button"
                  className="ui positive button"
                  onClick={() => {
                    this.incrementBlock(tripAdvisorWeight, tripAdvisorChange)
                  }}
                >
                  <i id="Trip Advisor" className="plus icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ui form">
          <div className="inline fields">
            <div className="eight wide field">
              <label>Google</label>
            </div>
            <div className="eight wide field">
              <div className="ui buttons">
                <button
                  id="Google"
                  type="button"
                  className="ui button"
                  onClick={() => {
                    this.decrementBlock(
                      googleWeight,
                      googleChange,
                      yelpWeight,
                      tripAdvisorWeight,
                      googleWeight
                    )
                  }}
                >
                  <i id="Google" className="minus icon" />
                </button>
                <div className="or" data-text={googleWeight.toString()} />
                <button
                  id="Google"
                  type="button"
                  className="ui positive button"
                  onClick={() => {
                    this.incrementBlock(googleWeight, googleChange)
                  }}
                >
                  <i id="Google" className="plus icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  yelpWeight: state.weighSourcesReducer.yelpWeight,
  tripAdvisorWeight: state.weighSourcesReducer.tripAdvisorWeight,
  googleWeight: state.weighSourcesReducer.googleWeight
})

const mapDispatch = dispatch => ({
  yelpChange: value => dispatch(yelpChange(value)),
  tripAdvisorChange: value => dispatch(tripAdvisorChange(value)),
  googleChange: value => dispatch(googleChange(value))
})

export default connect(mapState, mapDispatch)(weighSources)
