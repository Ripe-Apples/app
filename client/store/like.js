import axios from 'axios'

const ADD_LIKE = 'ADD_LIKE'
const DELETE_LIKE = 'DELETE_LIKE'

const incrementLikes = likeId => ({
  type: ADD_LIKE,
  payload: likeId
})

const decrementLikes = likeId => ({
  type: DELETE_LIKE,
  payload: likeId
})

export const addLike = restaurantId => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/like', {restaurantId})
      dispatch(incrementLikes(res.data))
    } catch(err) {
      console.log(err)
    }
  }
}

export const deleteLike = restaurantId => {
  return async dispatch => {
    try {
      const res = await axios.delete('/api/like', {restaurantId})
      dispatch(decrementLikes(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

const likeReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_LIKE:
      return [...state, action.payload];
    case DELETE_LIKE:
      return state.filter(like => like.id !== action.payload);
    default:
      return state
  }
}

export default likeReducer;
