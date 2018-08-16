import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleRestaurant} from '../store/restaurant'
import {Grid, Container, Image, Divider, Header, Label, Dimmer, Loader} from 'semantic-ui-react'
import ApplePie from './pie-chart'

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
        let score = review.rating > 5 ? review.rating - 5 : review.rating
        return acc + score;
      }, 0)
      const averageScore = (((scoreSum / singleRestaurant.reviews.length) / 5) * 100).toFixed(2);

      return (
        <Container>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Grid>
            
            <Grid.Column width={16}>
              <h1 className="single-restaurant-header"> {singleRestaurant.name} </h1>
              <Divider />
            </Grid.Column>
            
            <Grid.Column width={10}>
              <Image src={singleRestaurant.imageUrl} size="big" rounded />
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 className="pie-title"><img className="pie-logo" src="https://image.flaticon.com/icons/svg/440/440230.svg" /> Apple Pie Score <img className="pie-logo" src="https://image.flaticon.com/icons/svg/440/440230.svg" /></h3> 
              <ApplePie singleRestaurant={singleRestaurant} averageScore={averageScore} />
              <Divider />
              <h3>
                Expense Rating:{' '}
                {dollarSignHelper(singleRestaurant.expenseRating)}
              </h3>
              <h3>Address: {singleRestaurant.location}</h3>
              <Divider hidden />
              <Label style={{margin: '0px'}}>
                <img
                  className="map-logo"
                  src="https://image.flaticon.com/icons/svg/281/281767.svg"
                />
                <Label.Detail className="location-link">
                  <a  href={"https://www.google.com/maps/search/" + singleRestaurant.location }target="_blank"> View Restaurant Location</a>
                </Label.Detail>
              </Label>
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
