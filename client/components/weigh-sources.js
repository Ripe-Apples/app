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
    if (val && yelpWeight + tripAdvisorWeight + googleWeight > 1) {
      val--
      callback(val)
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
      <List>
        <List.Header>Weigh Sources</List.Header>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex">Yelp</div>
            <div className="item-flex right">
              <Button.Group>
                <Button
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
                  <Icon name="minus" />
                </Button>
                <Button.Or text={yelpWeight.toString()} />
                <Button
                  positive
                  onClick={() => {
                    this.incrementBlock(yelpWeight, yelpChange)
                  }}
                >
                  <Icon name="plus" />
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex">Trip Advisor</div>
            <div className="item-flex right">
              <Button.Group>
                <Button
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
                  <Icon name="minus" />
                </Button>
                <Button.Or text={tripAdvisorWeight.toString()} />
                <Button
                  positive
                  onClick={() => {
                    this.incrementBlock(tripAdvisorWeight, tripAdvisorChange)
                  }}
                >
                  <Icon name="plus" />
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex">Google</div>
            <div className="item-flex right">
              <Button.Group>
                <Button
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
                  <Icon name="minus" />
                </Button>
                <Button.Or text={googleWeight.toString()} />
                <Button
                  positive
                  onClick={() => {
                    this.incrementBlock(googleWeight, googleChange)
                  }}
                >
                  <Icon name="plus" />
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
      </List>
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
