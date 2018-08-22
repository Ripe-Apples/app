import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchLikes, addLike, deleteLike} from '../store/like'
import { Button, Icon, Label } from 'semantic-ui-react'

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      localLikeCount: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { singleRestaurant, user, numLikes } = this.props
    console.log('numLikes', numLikes)
    console.log('togg', this.state.isLiked)
    const checkArr = singleRestaurant.likes.filter(likeObj => {
      return likeObj.userId === user.id
    })
    console.log(checkArr);
    if (checkArr.length > 0) {
      console.log('yesss');
      this.setState({isLiked: !this.state.isLiked, localLikeCount: singleRestaurant.likes.length})
    }
  }

  handleClick() {
    const { singleRestaurant, user } = this.props
    let likeCount = this.props.numLikes
    //checks if a user has already like the restaurant on the current page
    let isLikedArr = []
    isLikedArr = singleRestaurant.likes.filter(likeObj => {
      return likeObj.userId === user.id
    })
    if (this.state.isLiked) {
      this.props.deleteLike(singleRestaurant.id, user.id)
      // likeCount--
      this.setState({isLiked: !this.state.isLiked, localLikeCount: this.state.localLikeCount-1})
    } else {
      this.props.addLike(singleRestaurant.id, user.id)
      // likeCount++
      this.setState({isLiked: !this.state.isLiked, localLikeCount: this.state.localLikeCount+1})
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
  }
}

const mapDispatch = dispatch => ({
  addLike: (restaurantId, userId) => dispatch(addLike(restaurantId, userId)),
  deleteLike: (restaurantId, userId) => dispatch(deleteLike(restaurantId, userId)),
  fetchLikes: (restaurantId) => dispatch(fetchLikes(restaurantId)),
})

export default connect(mapState, mapDispatch)(LikeButton)