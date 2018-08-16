const YELP_CHANGE = 'YELP_CHANGE'
const ZOMATO_CHANGE = 'ZOMATO_CHANGE'
const GOOGLE_CHANGE = 'GOOGLE_CHANGE'
const FOURSQUARE_CHANGE = 'FOURSQUARE_CHANGE'
const RESET = 'RESET'

export const yelpChange = value => ({
  type: YELP_CHANGE,
  value
})

export const zomatoChange = value => ({
  type: ZOMATO_CHANGE,
  value
})

export const googleChange = value => ({
  type: GOOGLE_CHANGE,
  value
})

export const foursquareChange = value => ({
  type: FOURSQUARE_CHANGE,
  value
})

export const reset = () => ({
  type: RESET
})

const initialState = {
  yelpWeight: 5,
  zomatoWeight: 5,
  googleWeight: 5,
  foursquareWeight: 5
}

export default function(state = initialState, action) {
  switch (action.type) {
    case YELP_CHANGE:
      return {...state, yelpWeight: action.value}
    case ZOMATO_CHANGE:
      return {...state, zomatoWeight: action.value}
    case GOOGLE_CHANGE:
      return {...state, googleWeight: action.value}
    case FOURSQUARE_CHANGE:
      return {...state, foursquareWeight: action.value}
    case RESET:
      return initialState
    default:
      return state
  }
}
