const YELP_CHANGE = 'YELP_CHANGE'
const TRIP_ADVISOR_CHANGE = 'TRIP_ADVISOR_CHANGE'
const GOOGLE_CHANGE = 'GOOGLE_CHANGE'
const RESET = 'RESET'

export const yelpChange = value => ({
  type: YELP_CHANGE,
  value
})

export const tripAdvisorChange = value => ({
  type: TRIP_ADVISOR_CHANGE,
  value
})

export const googleChange = value => ({
  type: GOOGLE_CHANGE,
  value
})

export const reset = () => ({
  type: RESET
})

const initialState = {
  yelpWeight: 5,
  tripAdvisorWeight: 5,
  googleWeight: 5
}

export default function(state = initialState, action) {
  switch (action.type) {
    case YELP_CHANGE:
      return {
        ...state,
        yelpWeight: action.value
      }
    case TRIP_ADVISOR_CHANGE:
      return {
        ...state,
        tripAdvisorWeight: action.value
      }
    case GOOGLE_CHANGE:
      return {
        ...state,
        googleWeight: action.value
      }
    case RESET:
      return initialState
    default:
      return state
  }
}
