import { SET_OPEN_PRS, SET_REACT_CORE_PRS } from '../actionTypes'

const initialState = {
  openPrs: null,
  reactTeamPrs: null
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
    default: return state
  }
}

export default reducer
