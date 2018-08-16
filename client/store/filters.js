const CHANGE_PRICE = 'CHANGE_PRICE'
const CHANGE_CUISINE = 'CHANGE_CUISINE'
const CHANGE_LOCATION = 'CHANGE_LOCATION'
const UPDATE_SEARCH = 'UPDATE_SEARCH'
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

export const updateSearchBar = searchValue => ({
  type: UPDATE_SEARCH,
  payload: searchValue
})

export const reset = () => ({
  type: RESET
})

const initalState = {
  price: '',
  cuisine: '',
  location: '',
  searchValue: ''
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
    case UPDATE_SEARCH:
      return {
        ...state,
        searchValue: action.payload
      }
    case RESET:
      return {...state, price: '', cuisine: '', location: '', searchValue: ''}
    default:
      return state
  }
}

export default filtersReducer
