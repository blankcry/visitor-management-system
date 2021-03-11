import axios from 'axios';
import { handleSuccess } from './messages/success';
import { VIEW_APPOINTMENTS, VIEW_VISITS, SET_APPOINTMENT_PROFILE, REMOVE_APPOINTMENT_PROFILE } from '../actionTypes';
import { catchError, removeAlerts } from "./index";
import { handleInfo } from './messages/info';

const serverLocation = "http://localhost:5000/api/usermodule/";

export const viewAppointments = appointments => ({
  type: VIEW_APPOINTMENTS,
  appointments
});
export const viewVisits = visits => ({
  type: VIEW_VISITS,
  visits
});
export const setAppointmentToBeEdited = appointment => ({
  type: SET_APPOINTMENT_PROFILE,
  appointment
});
export const removeAppointmentInfo = () => ({
  type: REMOVE_APPOINTMENT_PROFILE
})
export const getAppointments = () => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/viewappointments`).then(response => {
        handleInfo(response.data.message, dispatch)
        dispatch(viewAppointments(response.data.data));
      })
    } catch (error) {
      catchError(error, dispatch);
    };
  };
};
export const getPersonalVisits = (offset) => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/viewpersonalvisits?offset=${offset}`).then(response => {
        handleInfo(response.data.message, dispatch)
        dispatch(viewVisits(response.data.data));
      })
    } catch (error) {
      catchError(error, dispatch);
    };
  };
};
export const createAppointment = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${serverLocation}/createappointment`, data).then(response => {
        handleSuccess(response.data.message, dispatch);
      })
    } catch (error) {
      catchError(error, dispatch);
    };
  };
};
export const deleteAppointment = (data) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${serverLocation}/deleteappointment/${data}`).then(response => {
        handleInfo(response.data.message, dispatch);
      })
    } catch (error) {
      catchError(error, dispatch);
    };
  };
};
export const getAppointmentInfo = (id) => {
  return async (dispatch) => {
    try {
      await axios.get(`${serverLocation}/editappointment/${id}`).then(response => {
        removeAlerts(dispatch)
        dispatch(setAppointmentToBeEdited(response.data))
      })
    } catch(error) {
      catchError(error, dispatch)
    };
  };
};
export const editAppointmentInfo = (data) => {
  return async (dispatch) => {
    try {
      await axios.put(`${serverLocation}/editappointment`, data).then(response => {
        handleSuccess(response.data, dispatch)
      })
    } catch (error) {
      console.dir(error)
      catchError(error, dispatch)
    };
  };
};

export const removeEditedInfo = () => {
  return async (dispatch) => {
    dispatch(removeAppointmentInfo())
  };
};