import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleRestaurant} from '../store/restaurant'
import {Grid, Container, Image, Divider, Header, Label} from 'semantic-ui-react'

const dollarSignHelper = expenseRating => {
    if (expenseRating === 0) return 'No Expense Rating Yet'
    return '$'.repeat(expenseRating)
}
function myMap() {
  var mapOptions = {
      center: new google.maps.LatLng(51.5, -0.12),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.HYBRID
  }
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

class SingleRestaurant extends Component {
  componentDidMount() {
    this.props.fetchSingleRestaurant(this.props.match.params.restaurantId)
  }

  render() {
    const { singleRestaurant } = this.props

    return !singleRestaurant ? (
      <div>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Image src='/images/wireframe/short-paragraph.png' />
  </div>
    ):(
        
        <Container>
         
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Grid>
            <Grid.Column width={10}>
              <Image src={singleRestaurant.imageUrl} size="big" rounded />
            </Grid.Column>
            <Grid.Column width={6}>
              <h1 className="single-Restaurant-header"> {singleRestaurant.name} </h1>
              <Divider />
              <h3>Expense Rating: <span className={singleRestaurant.expenseRating <= 2 ? "cheap" : "expensive"}>{dollarSignHelper(singleRestaurant.expenseRating)}</span>
              </h3>
              <Header size="medium">Address: {singleRestaurant.location}</Header>
              <Divider hidden />
              <Label>
                <img className="map-logo" src="https://image.flaticon.com/icons/svg/281/281767.svg" />
                <Label.Detail className="location-link">
                  <a  href={"https://www.google.com/maps/search/" + singleRestaurant.location}> View Restaurant Location</a>
                </Label.Detail>

              </Label>
            </Grid.Column>

          </Grid>
        </Container>
      )
    }

  }


const mapState = state => {
    return {
        singleRestaurant: state.restaurantReducer.singleRestaurant
    }
  }
  
  const mapDispatch = dispatch => ({
    fetchSingleRestaurant: (restaurantId) => dispatch(fetchSingleRestaurant(restaurantId))
  })
  
export default connect(mapState, mapDispatch)(SingleRestaurant)
