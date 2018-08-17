import axios from 'axios'
import AvQueuePlayNext from 'material-ui/SvgIcon';

const GET_LIKES = 'GET_LIKES'
const ADD_LIKE = 'ADD_LIKE'
const DELETE_LIKE = 'DELETE_LIKE'

const incrementLikes = like => ({
  type: GET_LIKES,
  payload: like
})

const decrementLikes = like => ({
  type: GET_LIKES,
  payload: like
})

export const addLike = restaurantId => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/like', {restaurantId})
      dispatch(incrementLikes(res.data))
    } catch(err) {
      next(err)
    }
  }
}

export const deleteLike = restaurantId => {
  return async dispatch => {
    try {
      const res = await axios.delete('/api/like', {restaurantId})
      dispatch(decrementLikes(res.data))
    } catch (err) {
      next(err)
    }
  }
}

// const initialState = {
//   likeCount: 
// }

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKES: 
      return state;
    case ADD_LIKE:
      return state++;
    case DELETE_LIKE:
      return state--
    default:
      return state
  }
}

export default likeReducer;
