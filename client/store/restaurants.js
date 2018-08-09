import axios from 'axios';

const GET_RESTAURANTS = 'GET_RESTAURANTS';

const getRestaurants = restaurants => ({ type: GET_RESTAURANTS, payload: restaurants });

export const fetchRestaurants= () => {
  return async dispatch => {
    const res = await axios.get('/api/restaurant');
    dispatch(getRestaurants(res.data));
  }
}

const initalState = [];

const restaurantReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS: 
      return action.payload;
    default: 
      return state;
  }
}

export default restaurantReducer;