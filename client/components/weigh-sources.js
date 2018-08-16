import React, {Component} from 'react'
import {List, Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {yelpChange, zomatoChange, googleChange} from '../store/weighSources'

class weighSources extends Component {
  decrementBlock(val, callback, yelpWeight, zomatoWeight, googleWeight) {
    if (val > 1) {
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
    let {yelpWeight, zomatoWeight, googleWeight} = this.props

    const {yelpChange, zomatoChange, googleChange} = this.props

    return (
      <List>
        <List.Header>Weigh Sources</List.Header>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex"><img className="sourceLogo" src="https://image.flaticon.com/icons/svg/174/174882.svg" /> Yelp</div>
            <div className="item-flex right">
              <Button.Group>
                <Button
                  onClick={() => {
                    this.decrementBlock(
                      yelpWeight,
                      yelpChange,
                      yelpWeight,
                      zomatoWeight,
                      googleWeight
                    )
                  }}
                >
                  <div className="no-margin">
                    <Icon name="minus" />
                  </div>
                </Button>
                <Button.Or text={yelpWeight.toString()} />
                <Button
                  positive
                  onClick={() => {
                    this.incrementBlock(yelpWeight, yelpChange)
                  }}
                >
                  <div className="no-margin">
                    <Icon name="plus" />
                  </div>
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex"><img className="sourceLogo" src="https://images-na.ssl-images-amazon.com/images/I/21Wc%2BuzZURL._SY355_.png" /> Zomato</div>
            <div className="item-flex right">
              <Button.Group>
                <Button
                  onClick={() => {
                    this.decrementBlock(
                      zomatoWeight,
                      zomatoChange,
                      yelpWeight,
                      zomatoWeight,
                      googleWeight
                    )
                  }}
                >
                  <div className="no-margin">
                    <Icon name="minus" />
                  </div>
                </Button>
                <Button.Or text={zomatoWeight.toString()} />
                <Button
                  positive
                  onClick={() => {
                    this.incrementBlock(zomatoWeight, zomatoChange)
                  }}
                >
                  <div className="no-margin">
                    <Icon name="plus" />
                  </div>
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex"><img className="sourceLogo" src="https://image.flaticon.com/icons/svg/281/281781.svg" /> Google</div>
            <div className="item-flex right">
              <Button.Group>
                <Button
                  onClick={() => {
                    this.decrementBlock(
                      googleWeight,
                      googleChange,
                      yelpWeight,
                      zomatoWeight,
                      googleWeight
                    )
                  }}
                >
                  <div className="no-margin">
                    <Icon name="minus" />
                  </div>
                </Button>
                <Button.Or text={googleWeight.toString()} />
                <Button
                  positive
                  onClick={() => {
                    this.incrementBlock(googleWeight, googleChange)
                  }}
                >
                  <div className="no-margin">
                    <Icon name="plus" />
                  </div>
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
  zomatoWeight: state.weighSourcesReducer.zomatoWeight,
  googleWeight: state.weighSourcesReducer.googleWeight
})

const mapDispatch = dispatch => ({
  yelpChange: value => dispatch(yelpChange(value)),
  zomatoChange: value => dispatch(zomatoChange(value)),
  googleChange: value => dispatch(googleChange(value))
})

export default connect(mapState, mapDispatch)(weighSources)
