import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  yelpChange,
  zomatoChange,
  googleChange,
  foursquareChange
} from '../store/weighSources'
import {List, Button, Icon} from 'semantic-ui-react'

class WeighSourcesOption extends Component {
  decrementBlock(val, callback) {
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
    const yelpImgUrl = 'https://image.flaticon.com/icons/svg/174/174882.svg'
    const zomatoImgUrl =
      'https://images-na.ssl-images-amazon.com/images/I/21Wc%2BuzZURL._SY355_.png'
    const googleImgUrl = 'https://image.flaticon.com/icons/svg/281/281781.svg'
    const foursquareImgUrl =
      'https://image.flaticon.com/icons/svg/174/174850.svg'

    const {
      type,
      yelpChange,
      zomatoChange,
      googleChange,
      foursquareChange
    } = this.props

    let {yelpWeight, zomatoWeight, googleWeight, foursquareWeight} = this.props
    let elementObj = {}

    if (type === 'Yelp') {
      elementObj = {
        imgUrl: yelpImgUrl,
        change: yelpChange,
        weight: yelpWeight
      }
    } else if (type === 'Zomato') {
      elementObj = {
        imgUrl: zomatoImgUrl,
        change: zomatoChange,
        weight: zomatoWeight
      }
    } else if (type === 'Google') {
      elementObj = {
        imgUrl: googleImgUrl,
        change: googleChange,
        weight: googleWeight
      }
    } else if (type === 'Foursquare') {
      elementObj = {
        imgUrl: foursquareImgUrl,
        change: foursquareChange,
        weight: foursquareWeight
      }
    }
    return (
      <List.Item>
        <div className="weigh-sources-flex">
          <div className="item-flex">
            <img className="sourceLogo" src={elementObj.imgUrl} /> {type}
          </div>
          <div className="item-flex right">
            <Button.Group>
              <Button
                onClick={() => {
                  this.decrementBlock(
                    elementObj.weight,
                    elementObj.change,
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
              <Button.Or text={elementObj.weight.toString()} />
              <Button
                positive
                onClick={() => {
                  this.incrementBlock(elementObj.weight, elementObj.change)
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
    )
  }
}

const mapState = state => ({
  yelpWeight: state.weighSourcesReducer.yelpWeight,
  zomatoWeight: state.weighSourcesReducer.zomatoWeight,
  googleWeight: state.weighSourcesReducer.googleWeight,
  foursquareWeight: state.weighSourcesReducer.foursquareWeight
})

const mapDispatch = dispatch => ({
  yelpChange: value => dispatch(yelpChange(value)),
  zomatoChange: value => dispatch(zomatoChange(value)),
  googleChange: value => dispatch(googleChange(value)),
  foursquareChange: value => dispatch(foursquareChange(value))
})

export default connect(mapState, mapDispatch)(WeighSourcesOption)
