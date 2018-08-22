import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchLikes, addLike, deleteLike} from '../store/like'
import { Button, Icon, Label } from 'semantic-ui-react'
import {fetchSingleRestaurant} from '../store/restaurant'

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      localLikeCount: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    console.log('props', this.props);
    // await this.props.fetchSingleRestaurant(this.props.match.params.restaurantId)
    const { singleRestaurant, user } = this.props
    let checkArr = []
    //holds a like object if the user has already the liked the page
    checkArr = singleRestaurant.likes.filter(likeObj => {
      return likeObj.userId === user.id
    })
    
    if (checkArr.length > 0) {
      console.log('yesss');
      this.setState({isLiked: true, localLikeCount: singleRestaurant.likes.length})
    }
  }

  async handleClick() {
    const { singleRestaurant, user } = this.props
    if (this.state.isLiked) {
      await this.props.deleteLike(singleRestaurant.id, user.id)
      // likeCount--
      this.setState({isLiked: false, localLikeCount: this.state.localLikeCount-1})
    } else {
      await this.props.addLike(singleRestaurant.id, user.id)
      // likeCount++
      this.setState({isLiked: true, localLikeCount: this.state.localLikeCount+1})
    }
  }

  render() {
    const { singleRestaurant, numLikes } = this.props
    let likeCount = numLikes + singleRestaurant.likes.length //total likes = 
    return (
      <div>
        <Button onClick={this.handleClick} as='div' labelPosition='right'>
          <Button color="red">
            <Icon name='heart' />
            Like
        </Button>
          <Label as='a' pointing='left'>
            {this.state.localLikeCount}
          </Label>
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    numLikes: state.likeReducer.length,
    singleRestaurant: state.restaurantReducer.singleRestaurant
  }
}

const mapDispatch = dispatch => ({
  addLike: (restaurantId, userId) => dispatch(addLike(restaurantId, userId)),
  deleteLike: (restaurantId, userId) => dispatch(deleteLike(restaurantId, userId)),
  fetchLikes: (restaurantId) => dispatch(fetchLikes(restaurantId)),
  fetchSingleRestaurant: restaurantId =>
  dispatch(fetchSingleRestaurant(restaurantId))
})

export default connect(mapState, mapDispatch)(LikeButton)