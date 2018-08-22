import axios from 'axios'

const GET_LIKES = 'GET_LIKES'
const ADD_LIKE = 'ADD_LIKE'
const DELETE_LIKE = 'DELETE_LIKE'

const getLikes  = likes => ({
  type: GET_LIKES,
  payload: likes
})

const addLikeAction = likeObj => ({
  type: ADD_LIKE,
  payload: likeObj
})

const removeLike = likeId => ({
  type: DELETE_LIKE,
  payload: likeId
})

export const fetchLikes = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/like')
      dispatch(getLikes(res.data))
    } catch(err) {
      console.log(err)
    }
  }
}

export const addLike = (restaurantId, userId) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/like', {restaurantId, userId})
      dispatch(addLikeAction(res.data))
    } catch(err) {
      console.log(err)
    }
  }
}

export const deleteLike = likeId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/like/${likeId}`)
      dispatch(removeLike(likeId))
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
      const likesToKeep =  state.filter(likeObj => Number(likeObj.id) !== Number(action.payload));
      return likesToKeep
    case GET_LIKES:
      return action.payload;
    default:
      return state
  }
}

export default likeReducer;
