import { SET_OPEN_PRS, SET_REACT_CORE_PRS } from './actionTypes'

export const setOpenPrs = value => ({
  type: SET_OPEN_PRS,
  payload: {
    value
  }
})

export const setReactCorePrs = value => ({
  type: SET_REACT_CORE_PRS,
  payload: {
    value
  }
})
