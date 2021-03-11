import axios from 'axios';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actionTypes';
import { removeAlerts, catchError} from "./index"

const serverLocation = 'http://localhost:5000/api/auth'
export const setCurrentUser = (userType) => ({
  type: SET_CURRENT_USER,
  userType
});
export const logoutCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

export const login = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${serverLocation}/login`, data).then(response => {
        removeAlerts(dispatch);
        localStorage.setItem("Login Token", response.data.token);
        localStorage.setItem("userType", response.data.user.account_role);
        const jwtToken = localStorage.getItem('Login Token');
        axios.defaults.headers.common['Authorization'] = jwtToken;
        dispatch(setCurrentUser((response.data.user.account_role)));
      })
    } catch (error) {
      removeAlerts(dispatch)
      catchError(error, dispatch)
    };
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    removeAlerts(dispatch);
    dispatch(logoutCurrentUser({}));
  };
};