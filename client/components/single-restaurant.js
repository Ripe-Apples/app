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
  List,
  ListItem
} from 'semantic-ui-react'
import ApplePie from './pie-chart'
import Map from './google-map'

const dollarSignHelper = expenseRating => {
  if (expenseRating === 0) return 'No Expense Rating Yet'
  return '$'.repeat(expenseRating)
}

class SingleRestaurant extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    await this.props.fetchSingleRestaurant(this.props.match.params.restaurantId)
    this.setState({loading: false})
  }

  render() {
    const {singleRestaurant} = this.props
    if (this.state.loading) {
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

      const googleLink = `http://www.google.com/search?q=${
        singleRestaurant.name
      }`

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
              <Divider hidden />
              <Map
                longitude={singleRestaurant.longitude}
                latitude={singleRestaurant.latitude}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 className="pie-title">🥧 Pie Score 🥧</h3>
              <ApplePie averageScore={averageScore} />
              {averageScore >= 90 ? (
                <div>
                  <span className="knew-wave">This 🥧 is hot!!!</span>{' '}
                  <Divider hidden />
                </div>
              ) : (
                <div />
              )}
              <List>
                {singleRestaurant.reviews.map(review => {
                  return (
                    <List.Item key={review.id}>
                      <div className="weigh-sources-flex">
                        <div className="item-flex">
                          <img src={review.sourceLogo} className="sourceLogo" />{' '}
                          {review.reviewUrl ? (
                            <a href={review.reviewUrl} target="_blank">
                              {review.source}
                            </a>
                          ) : (
                            <a href={googleLink} target="_blank">
                              {review.source}
                            </a>
                          )}{' '}
                          {review.rating} /{' '}
                          {review.source === 'Foursquare' ? '10' : '5'}
                        </div>
                      </div>
                    </List.Item>
                  )
                })}
              </List>
              <Divider />
              <List>
                <List.Item>
                  {dollarSignHelper(singleRestaurant.expenseRating)}
                </List.Item>
                <ListItem>{singleRestaurant.location}</ListItem>
                <List.Item>
                  {singleRestaurant.opentableUrl ? (
                    <div>
                      {console.log(singleRestaurant.opentableUrl)}
                      <Label
                        style={{margin: '0px'}}
                        className="single-page-button-width"
                      >
                        <img
                          className="map-logo"
                          src="https://images-na.ssl-images-amazon.com/images/I/51SdVVc%2BrBL.png"
                        />
                        <Label.Detail className="location-link">
                          <a
                            href={singleRestaurant.opentableUrl}
                            target="_blank"
                          >
                            Book on OpenTable
                          </a>
                        </Label.Detail>
                      </Label>
                    </div>
                  ) : (
                    <div />
                  )}
                </List.Item>
              </List>
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
