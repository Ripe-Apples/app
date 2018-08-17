import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleRestaurant} from '../store/restaurant'
import {
  Grid,
  Container,
  Image,
  Divider,
  Label,
  Dimmer,
  Loader,
  Button,
  Icon
} from 'semantic-ui-react'
import ApplePie from './pie-chart'
import LikeButton from './like-button'
import { GoogleMap, Marker } from "react-google-maps"
import Map from './GoogleMap'

const dollarSignHelper = expenseRating => {
  if (expenseRating === 0) return 'No Expense Rating Yet'
  return '$'.repeat(expenseRating)
}
// function myMap() {
//   var mapOptions = {
//       center: new google.maps.LatLng(51.5, -0.12),
//       zoom: 10,
//       mapTypeId: google.maps.MapTypeId.HYBRID
//   }
// var map = new google.maps.Map(document.getElementById("map"), mapOptions);
// }




class SingleRestaurant extends Component {
  componentDidMount() {
    this.props.fetchSingleRestaurant(this.props.match.params.restaurantId)
  }

  render() {
    const {singleRestaurant} = this.props

    if (!singleRestaurant.reviews) {
      return (
        <div>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </div>
      )
    } else {
      const scoreSum = singleRestaurant.reviews.reduce((acc, review) => {
        let score =
          review.source === 'Foursquare' ? review.rating / 2 : review.rating
        return acc + score
      }, 0)
      const averageScore = (
        scoreSum /
        singleRestaurant.reviews.length /
        5 *
        100
      ).toFixed(2)

      return (
        <Container>
          <Grid>
            <Grid.Column width={16}>
              <h1 className="single-restaurant-header">
                {' '}
                {singleRestaurant.name}{' '}
              </h1>
              <Divider />
            </Grid.Column>

            <Grid.Column width={10}>
              <Image src={singleRestaurant.imageUrl} size="big" rounded />
              <Divider />
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 className="pie-title">
                <img
                  className="pie-logo"
                  src="https://image.flaticon.com/icons/svg/440/440230.svg"
                />{' '}
                Apple Pie Score{' '}
                <img
                  className="pie-logo"
                  src="https://image.flaticon.com/icons/svg/440/440230.svg"
                />
              </h3>
              <ApplePie
                averageScore={averageScore}
              />
              <Divider />

              <LikeButton singleRestaurant={singleRestaurant} />

              <h3>{dollarSignHelper(singleRestaurant.expenseRating)}</h3>
              <h3>{singleRestaurant.location}</h3>
              
              <Divider hidden />
              {singleRestaurant.opentableUrl ? (
                <div>
                  <Label
                    style={{margin: '0px'}}
                    className="single-page-button-width"
                  >
                    <img
                      className="map-logo"
                      src="https://images-na.ssl-images-amazon.com/images/I/51SdVVc%2BrBL.png"
                    />
                    <Label.Detail className="location-link">
                      <a href={singleRestaurant.opentableUrl} target="_blank">
                        Book on OpenTable
                      </a>
                    </Label.Detail>
                  </Label>
                </div>
              ) : (
                <div />
              )}
            </Grid.Column>
            <Grid.Column width={10}>
              <Map longitude={singleRestaurant.longitude} latitude={singleRestaurant.latitude} />
            </Grid.Column>
          </Grid>
        </Container>
      )
    }
  }
}
const mapState = state => {
  return {
    singleRestaurant: state.restaurantReducer.singleRestaurant
  }
}

const mapDispatch = dispatch => ({
  fetchSingleRestaurant: restaurantId =>
    dispatch(fetchSingleRestaurant(restaurantId))
})

export default connect(mapState, mapDispatch)(SingleRestaurant)
