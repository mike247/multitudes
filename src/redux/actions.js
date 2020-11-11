import { SET_OPEN_PRS, SET_REACT_CORE_PRS, SET_ALL_PRS } from './actionTypes'

export const setOpenPrs = ({ value, prs }) => ({
  type: SET_OPEN_PRS,
  payload: {
    value,
    prs
  }
})

export const setReactCorePrs = value => ({
  type: SET_REACT_CORE_PRS,
  payload: {
    value
  }
})

export const setAllPrs = value => ({
  type: SET_ALL_PRS,
  payload: {
    value
  }
})
