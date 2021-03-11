import { removeError, handleError } from './messages/error';
import { removeWarning, addWarning} from './messages/warning';
import { removeInfo } from './messages/info';
import { removeSuccess} from './messages/success';

export function removeAlerts(dispatch) {
  dispatch(removeError());
  dispatch(removeWarning());
  dispatch(removeSuccess());
  dispatch(removeInfo());
};

export const removePageAlert =() => {
  return async (dispatch) => {
    dispatch(removeError());
    dispatch(removeWarning());
    dispatch(removeSuccess());
    dispatch(removeInfo());
  };
};

export function catchError(error, dispatch) {
  if (error.response !== undefined && (error.response.status > 400 && error.response.status < 500) ) {
    dispatch(removeError());
    dispatch(removeSuccess());
    dispatch(removeInfo());
    if (error.response.data.errorMessage !== undefined){
      dispatch(addWarning(error.response.data.errorMessage))
    }else {
      dispatch(addWarning(error.response.data))
    }
  }else {
    dispatch(removeWarning());
    dispatch(removeSuccess());
    dispatch(removeInfo());
    handleError(error, dispatch);
  };  
}