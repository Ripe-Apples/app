import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addLike, deleteLike} from '../store/like'
import { Button, Icon, Label } from 'semantic-ui-react'

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const restaurantId = this.props.singleRestaurant.id
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked
    }))
    if (this.state.isLiked) {
      this.props.addLike(restaurantId)
    } else {
      this.props.deleteLike(restaurantId)
    }
  }

  render() {
    const {singleRestaurant} = this.props
    return (
      <div>
        <Button onClick={this.handleClick} as='div' labelPosition='right'>
          <Button color="red">
            <Icon name='heart' />
            Like
        </Button>
          <Label as='a' pointing='left'>
            {singleRestaurant.likes.length}
          </Label>
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state', state)
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  addLike: restaurantId => dispatch(addLike(restaurantId)),
  deleteLike: restaurantId => dispatch(deleteLike(restaurantId)),
})

export default connect(mapState, mapDispatch)(LikeButton)