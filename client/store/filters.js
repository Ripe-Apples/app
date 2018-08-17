const CHANGE_PRICE = 'CHANGE_PRICE'
const CHANGE_CUISINE = 'CHANGE_CUISINE'
const UPDATE_SEARCH = 'UPDATE_SEARCH'
const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE'
const RESET = 'RESET'

export const changePrice = price => ({
  type: CHANGE_PRICE,
  payload: price
})

export const changeCuisine = cuisine => ({
  type: CHANGE_CUISINE,
  payload: cuisine
})

export const updateSearchBar = searchValue => ({
  type: UPDATE_SEARCH,
  payload: searchValue
})

export const changeCurrentPage = newPage => ({
  type: CHANGE_CURRENT_PAGE,
  payload: newPage
})

export const reset = () => ({
  type: RESET
})

const initalState = {
  price: '',
  cuisine: '',
  searchValue: '',
  currentPage: 1
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
    case UPDATE_SEARCH:
      return {
        ...state,
        searchValue: action.payload
      }
    case CHANGE_CURRENT_PAGE:
      return {...state, currentPage: action.payload}
    case RESET:
      return {...state, price: '', cuisine: '', searchValue: '', currentPage: 1}
    default:
      return state
  }
}

export default filtersReducer
