import axios from 'axios'

const GET_RESTAURANTS = 'GET_RESTAURANTS'
const CHANGE_FILTERED_RESTAURANTS = 'GET_FILTERED_RESTAURANTS'
const CHANGE_RESTAURANTS_ON_CURRENT_PAGE = 'CHANGE_RESTAURANTS_ON_CURRENT_PAGE'
const GET_SINGLE_RESTAURANT = 'GET_SINGLE_RESTAURANT'

const getRestaurants = restaurants => ({
  type: GET_RESTAURANTS,
  payload: restaurants
})

export const changeFilteredRestaurants = filteredRestaurants => ({
  type: CHANGE_FILTERED_RESTAURANTS,
  payload: filteredRestaurants
})

export const changeRestaurantsOnCurrentPage = restaurants => ({
  type: CHANGE_RESTAURANTS_ON_CURRENT_PAGE,
  payload: restaurants
})

const getSingleRestaurant = singleRestaurant => ({
  type: GET_SINGLE_RESTAURANT,
  payload: singleRestaurant
})

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
  filteredRestaurants: [],
  restaurantsOnCurrentPage: [],
  singleRestaurant: {}
}

const restaurantReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload
      }
    case CHANGE_FILTERED_RESTAURANTS:
      return {
        ...state,
        filteredRestaurants: action.payload.sort((restaurant1, restaurant2) => {
          if (restaurant2.reviews.length === restaurant1.reviews.length) {
            if (restaurant2.score === restaurant1.score) {
              return restaurant2.id - restaurant1.id
            } else {
              return restaurant2.score - restaurant1.score
            }
          } else {
            return restaurant2.reviews.length - restaurant1.reviews.length
          }
        })
      }
    case CHANGE_RESTAURANTS_ON_CURRENT_PAGE:
      return {
        ...state,
        restaurantsOnCurrentPage: action.payload
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
