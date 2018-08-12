const CHANGE_PRICE = 'CHANGE_PRICE'
const CHANGE_CUISINE = 'CHANGE_CUISINE'
const CHANGE_LOCATION = 'CHANGE_LOCATION'
const RESET = 'RESET'

export const changePrice = price => ({
  type: CHANGE_PRICE,
  payload: price
})

export const changeCuisine = cuisine => ({
  type: CHANGE_CUISINE,
  payload: cuisine
})

export const changeLocation = location => ({
  type: CHANGE_LOCATION,
  payload: location
})

export const reset = () => ({
  type: RESET
})

const initalState = {
  price: '',
  cuisine: '',
  location: ''
}

const filtersReducer = (state = initalState, action) => {
  switch (action.type) {
    case CHANGE_PRICE:
      return {
        ...state,
        price: action.payload
      }
    case CHANGE_CUISINE:
      return {
        ...state,
        cuisine: action.payload
      }
    case CHANGE_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    case RESET:
      return initalState
    default:
      return state
  }
}

export default filtersReducer
