import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
import {restaurantSort, restaurantScorer} from '../helperFuncs'
import RestaurantCard from './restaurant-card'

class Recommendations extends Component {
  render() {
    const {user, restaurants} = this.props
    const userStr = user.email.slice(0, user.email.indexOf('@'))
    return (
      <div>
        <h1>Recommendations for {userStr}</h1>
        {user.likedCuisines ? (
          <React.Fragment>
            <h3>Based on cuisines you've liked, we recommend:</h3>
            {user.likedCuisines.map(cuisine => {
              return (
                <React.Fragment key={cuisine}>
                  <h4>{cuisine}</h4>
                  <Card.Group>
                    {restaurantSort(
                      restaurants.filter(restaurant => {
                        if (restaurant.cuisineType[0].title === cuisine) {
                          restaurant.score = restaurantScorer(
                            restaurant.reviews,
                            5,
                            5,
                            5,
                            5
                          )
                          return true
                        }
                      })
                    )
                      .slice(0, 12)
                      .map(restaurant => {
                        return (
                          <RestaurantCard
                            restaurant={restaurant}
                            key={restaurant.id}
                          />
                        )
                      })}
                  </Card.Group>
                </React.Fragment>
              )
            })}
          </React.Fragment>
        ) : (
          <p>Unfortunately you haven't liked any cuisines.</p>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  restaurants: state.restaurantReducer.restaurants
})

export default connect(mapState)(Recommendations)
