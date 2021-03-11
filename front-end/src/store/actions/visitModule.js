import axios from 'axios';
import { VIEW_VISITORS_ONSITE, GET_CLOSED_VISITS_LOG, SEARCH_FOR_USERS, SET_USER_LOG, SET_USER_VIA_APPOINTMENT_CODE, REMOVE_USER_LOG, SET_LOG_PROFILE, REMOVE_LOG_PROFILE } from '../actionTypes';
import { handleSuccess} from './messages/success';
import { handleInfo } from './messages/info';
import { removeAlerts, catchError} from "./index";

const serverLocation = 'http://localhost:5000/api/visitmodule';

export const viewVisitorsOnSite = visitors => ({
  type: VIEW_VISITORS_ONSITE,
  visitors
});
export const getClosedVisitsLog = visitors => ({
  type: GET_CLOSED_VISITS_LOG,
  visitors
});
export const searchForUser = users => ({
  type: SEARCH_FOR_USERS,
  users
});
export const setUserForLogEntry = username => ({
  type: SET_USER_LOG,
  username
});
export const removeUserLogEntry = () => ({
  type: REMOVE_USER_LOG
})
export const setUserViaAppointmentCode = user => ({
  type: SET_USER_VIA_APPOINTMENT_CODE,
  user
});
export const setLogProfile = profile => ({
  type: SET_LOG_PROFILE, 
  profile
});
export const removeLogProfile = () => ({
  type: REMOVE_LOG_PROFILE
});

export const getLogProfile = (log_id) => {
  return async (dispatch) => {
    try {
      await axios.get(`${serverLocation}/editlog/${log_id}`).then(response => {
        removeAlerts(dispatch)
        dispatch(setLogProfile(response.data))
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const updatelogentry = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${serverLocation}/editlog/`, data).then(response => {
        handleSuccess(response.data, dispatch);
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const getuserforlogentryviacode = (code) => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/findappointment/${code}`).then(response => {
        removeAlerts(dispatch)
        dispatch(setUserViaAppointmentCode(response.data));
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const getuserforlogentry = (id) => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/getuser/${id}`).then(response => {
        dispatch(setUserForLogEntry(response.data));
      })
    } catch (error) {
      catchError(error, dispatch)
    };
  };
};
export const getvisitorsonsite = () => {
  return async dispatch => {
    try {
      await axios.get("http://localhost:5000/api/visitmodule/viewactivevisits").then(response => { 
        removeAlerts(dispatch)
        dispatch(getClosedVisitsLog(response.data));
      })
    } catch (error) {
      catchError(error, dispatch);
    };
  };
};
export const getClosedVisits = (offset) => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/viewvisits?offset=${offset}`).then(response => {
        removeAlerts(dispatch);
        dispatch(viewVisitorsOnSite(response.data));
    })
    } catch(error) {
      catchError(error, dispatch);
    };
  };
};
export const updatevisitlog = (data) => {
  return async dispatch => {
    try {
      await axios.post("http://localhost:5000/api/visitmodule/lognewvisit", data).then(response => {
        handleSuccess(response.data, dispatch);
      })
    } catch (error) {
      catchError(error, dispatch);
    };
  };
};
export const closeopenvisit = (data) => {
  return async dispatch => {
    try {
      await axios.get(`${serverLocation}/closelogvisit/${data}`).then(response => {
        handleInfo(response.data.message, dispatch);
      })
    } catch(error) {
      catchError(error, dispatch);
    };
  };
};
export const searchforuser = (data) => {
  return async dispatch => {
    try {
      removeAlerts(dispatch)
      await axios.post(`${serverLocation}/searchusersforvisit`, data).then(response => {
        dispatch(searchForUser(response.data.data))
        handleInfo(response.data.message, dispatch);
      })
    } catch(error) {
      catchError(error, dispatch);
    };
  };
};
export const removeuserforlogentry = () => {
  return async dispatch => {
    try {
      // removeAlerts(dispatch);
      dispatch(removeUserLogEntry())
    } catch (error) {
      catchError(error, dispatch)
    }
  };
};