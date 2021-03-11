import axios from 'axios';
import { handleInfo } from './messages/info';
import { catchError } from "./index";

const serverLocation = 'http://localhost:5000/api/adminmodule'
export const register = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${serverLocation}/registeruser`, data).then(response => {
        handleInfo(response.data.message, dispatch)
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};