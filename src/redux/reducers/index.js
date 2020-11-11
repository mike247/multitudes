import { SET_OPEN_PRS, SET_REACT_CORE_PRS, SET_ALL_PRS } from '../actionTypes'

const initialState = {
  openPrs: null,
  prs: [],
  reactTeamPrs: null,
  allPrs: null
}

const reducer = function (state = initialState, action = {}) {
  switch (action.type) {
    case SET_OPEN_PRS: {
      const { value, prs } = action.payload

      return {
        ...state,
        openPrs: value,
        prs: state.prs.concat(prs.map(pr => ({ createdAt: pr.created_at, name: pr.title, url: pr.url })))
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
