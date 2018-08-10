const initialState = {
  yelpWeight: 5,
  tripAdvisorWeight: 5,
  googleWeight: 5
}

const YELP_CHANGE = 'YELP_CHANGE'
const TRIP_ADVISOR_CHANGE = 'TRIP_ADVISOR_CHANGE'
const GOOGLE_CHANGE = 'GOOGLE_CHANGE'

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
    default:
      return state
  }
}
