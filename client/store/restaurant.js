import axios from 'axios'

const GET_RESTAURANTS = 'GET_RESTAURANTS';
const GET_SINGLE_RESTAURANT = 'GET_SINGLE_RESTAURANT';

const getRestaurants = restaurants => ({ type: GET_RESTAURANTS, payload: restaurants });
const getSingleRestaurant = singleRestaurant => ({ type: GET_SINGLE_RESTAURANT, payload: singleRestaurant });

export const fetchRestaurants = () => {
  return async dispatch => {
    const res = await axios.get('/api/restaurant')
    dispatch(getRestaurants(res.data))
  }
}
export const fetchSingleRestaurant = restaurantId => async dispatch => {
  const res = await axios.get(`/api/restaurant/${restaurantId}`)
  const restaurant = res.data
  dispatch(getSingleRestaurant(restaurant))
}

const initalState = {
  restaurants: [],
  singleRestaurant: {}
};

const restaurantReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload
      }
      case GET_SINGLE_RESTAURANT:
        return {
          ...state,
          singleRestaurant: action.payload
        }
    default:
      return state
  }
}

export default restaurantReducer
