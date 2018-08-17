import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchLikes, addLike, deleteLike} from '../store/like'
import { Button, Icon, Label } from 'semantic-ui-react'
import SingleRestaurant from './SingleRestaurant';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      isLiked: false
    }
  }

  render(props) {
    console.log('propssingleRest' , props);
    // const {singleRestaurant} = this.props

    // {singleRestaurant.likes.length}
    return (
      <div>
        <Button as='div' labelPosition='right'>
          <Button color="red">
            <Icon name='heart' />
            Like
        </Button>
          <Label as='a' basic color='white' pointing='left'>
            100
          </Label>
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state', state)
  return {
    likes: state.likeReducer.likes
  }
}

const mapDispatch = dispatch => ({
  fetchLikes: restaurantId => dispatch(fetchLikes(restaurantId)),
  addLike: restaurantId => dispatch(addLike(restaurantId)),
  deleteLike: restaurantId => dispatch(deleteLike(restaurantId)),
})

export default connect(mapState, mapDispatch)(LikeButton)