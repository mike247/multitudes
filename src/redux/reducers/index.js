import { SET_OPEN_PRS, SET_REACT_CORE_PRS, SET_ALL_PRS } from '../actionTypes'

const initialState = {
  openPrs: null,
  reactTeamPrs: null,
  allPrs: null
}

const reducer = function (state = initialState, action = {}) {
  switch (action.type) {
    case SET_OPEN_PRS: {
      const { value } = action.payload

      return {
        ...state,
        openPrs: value
      }
    }
    case SET_REACT_CORE_PRS: {
      const { value } = action.payload

      return {
        ...state,
        reactTeamPrs: value
      }
    }
    case SET_ALL_PRS: {
      const { value } = action.payload

      return {
        ...state,
        allPrs: value
      }
    }
    default: return state
  }
}

export default reducer
