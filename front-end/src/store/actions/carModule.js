import axios from 'axios';
import { VIEW_CARS_ONSITE, VIEW_CARS_LOG, VIEW_REGISTERED_CARS, SET_CAR_PROFILE, REMOVE_CAR_PROFILE } from '../actionTypes';
import { handleInfo, addInfo } from './messages/info';
import { handleSuccess } from './messages/success';
import { removeAlerts, catchError } from "./index";

const serverLocation = 'http://localhost:5000/api/carmodule';

export const viewCarsOnSite = cars => ({
  type: VIEW_CARS_ONSITE,
  cars
});
export const viewCarLog = log => ({
  type: VIEW_CARS_LOG,
  log
});
export const viewregisteredcars = cars => ({
  type: VIEW_REGISTERED_CARS,
  cars
});
export const setProfileToBeEdited = profile => ({
  type: SET_CAR_PROFILE,
  profile
});
export const removeProfile = () => ({
  type: REMOVE_CAR_PROFILE
})
export const registerCar = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${serverLocation}/registercar`, data).then(response => {
        handleSuccess(response.data.message, dispatch);
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const updatelog = (data) => {
  return async dispatch => {
    try {
      await axios.post(`${serverLocation}/createnewvehiclelog`, data).then(response => {
        dispatch(addInfo(response.data.message))
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const closeopenlog = (data) => {
  return async (dispatch) => {
    try {
      await axios.get(`${serverLocation}/closevehiclelog/${data}`).then(response => {
        handleInfo(response.data.message, dispatch);
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const getCarsOnsite = () => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/viewcarsonsite`).then(response => {
        dispatch(viewCarsOnSite(response.data));
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const getCarLog = (offset) => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/viewcarlog?offset=${offset}`).then(response => {
        removeAlerts(dispatch)
        dispatch(viewCarLog(response.data));
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const getRegisteredVehicles = () => {
  return async (dispatch) => {
    try {
      await axios.get(`${serverLocation}/viewregisteredcars`).then(response => {
        dispatch(viewregisteredcars(response.data));
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const getProfileToBeEdited = (id) => {
  return async (dispatch) => {
    try {
      await axios.get(`${serverLocation}/editprofile/${id}`).then(response => {
        removeAlerts(dispatch)
        dispatch(setProfileToBeEdited(response.data))
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const editProfile = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${serverLocation}/editprofile`, data).then(response => {
        handleSuccess(response.data, dispatch);
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const removeProfileToBeEdited = () => {
  return async (dispatch) => {
    try {
      dispatch(removeProfile())
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};