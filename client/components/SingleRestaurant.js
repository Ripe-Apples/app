import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurant'
import {fetchSingleRestaurant} from '../store/restaurant'
import RestaurantCard from './restaurant-card'
import {Input, Grid, Container, Image, Divider, Header, Link, Label} from 'semantic-ui-react'
//import CircularProgress from '@material-ui/core/CircularProgress'

const dollarSignHelper = expenseRating => {
    if (expenseRating === 0) return 'No Expense Rating Yet'
    return '$'.repeat(expenseRating)
  }

class SingleRestaurant extends Component {
    constructor() {
      super()
      this.state = {
        isDisabled: false
      }
    }
  
    componentDidMount() {
        console.log('ID!!', this.props.match.params.restaurantId)
        this.props.fetchSingleRestaurant(this.props.match.params.restaurantId)
     
    }
    render() {
        const {singleRestaurant} = this.props
        console.log("rating", singleRestaurant.expenseRating)

        if (!singleRestaurant) {
            return null;
        } else {
            return (
                <Container>
                    <Divider hidden/>
                    <Divider hidden/>
                    <Divider hidden/>
                <Grid> 
                    <Grid.Column width={10}>
                     <Image src={singleRestaurant.imageUrl} size="big"  rounded />
                     </Grid.Column>
                     <Grid.Column width={6}>
                     <Header size="huge" color="orange"> {singleRestaurant.name} </Header>
                     <p className={singleRestaurant.expenseRating <= 2 ? "cheap" : "expensive" }>Expense Rating: {dollarSignHelper(singleRestaurant.expenseRating)}</p>
                     <Header size="medium">Address: {singleRestaurant.location}</Header>
                     <Divider hidden/>
                        <Label>
                            <img className="map-logo" src = {"https://image.flaticon.com/icons/svg/281/281767.svg"} />
                            <Label.Detail>
                            <br />
                                <a href={"https://www.google.com/maps/search/" + singleRestaurant.location}> View Restaurant Location</a>
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
    console.log('state!!', state.restaurantReducer)
    return {
        singleRestaurant: state.restaurantReducer.singleRestaurant
    }
  }
  
  const mapDispatch = dispatch => ({
    fetchSingleRestaurant: (restaurantId) => dispatch(fetchSingleRestaurant(restaurantId))
  })
  
export default connect(mapState, mapDispatch)(SingleRestaurant)
