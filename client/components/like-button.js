import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchLikes, addLike, deleteLike} from '../store/like'
import { Button, Icon, Label } from 'semantic-ui-react'

class LikeButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchLikes()
  }

  async handleClick() {
    const { singleRestaurant, user, likes } = this.props
    //doing this to see if the user has liked this page(need the likeId)
    const [usersCurrentPageLikeObj] = likes.filter(like => {
      return like.userId === user.id && like.restaurantId === singleRestaurant.id
    })
    if (usersCurrentPageLikeObj) {
      await this.props.deleteLike(usersCurrentPageLikeObj.id)
    } else {
      await this.props.addLike(singleRestaurant.id, user.id)
    }
  }

  render() {
    const { likes } = this.props
    return (
      <div>
        <Button onClick={this.handleClick} as='div' labelPosition='right'>
          <Button color="red">
            <Icon name='heart' />
            Like
        </Button>
          <Label as='a' pointing='left'>
            {likes.length}
          </Label>
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  //to get all likes for this page
  const singleRestaurantLikes = state.likeReducer.filter(like => {
    return like.restaurantId === state.restaurantReducer.singleRestaurant.id
  })
  return {
    user: state.user,
    likes: singleRestaurantLikes,
    singleRestaurant: state.restaurantReducer.singleRestaurant, 
  }
}

const mapDispatch = dispatch => ({
  addLike: (restaurantId, userId) => dispatch(addLike(restaurantId, userId)),
  deleteLike: (likeId) => dispatch(deleteLike(likeId)),
  fetchLikes: () => dispatch(fetchLikes()),
})

export default connect(mapState, mapDispatch)(LikeButton)