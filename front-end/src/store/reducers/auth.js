import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actionTypes'

const DEFAULT_STATE = {
  isAuthenticated: false,
  userType: 0
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        userType: action.userType
      }
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: DEFAULT_STATE.isAuthenticated,
        userType: DEFAULT_STATE.userType
      }
    default:
      return state
  }
}