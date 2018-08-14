import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurant'
import {fetchSingleRestaurant} from '../store/restaurant'
import RestaurantCard from './restaurant-card'
import {Input, Grid, Container, Image, Divider, Header} from 'semantic-ui-react'
//import CircularProgress from '@material-ui/core/CircularProgress'

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
        console.log('restaurant!!!!', singleRestaurant)
        if (!singleRestaurant) {
            return null;
        } else {
            return (
                
                <Container>
                    <div>
                    <Divider hidden/>
                     <Image src={singleRestaurant.imageUrl} size ="big" rounded centered/>
                     <Divider hidden/>
                     <center><Header> {singleRestaurant.name} </Header></center> 
                     
                     <p>
                    {singleRestaurant.price}
                     </p>    
                     </div>
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
