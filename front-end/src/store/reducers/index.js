import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import error from './messages/error';
import warning from './messages/warning';
import info from './messages/info';
import success from './messages/success';
import auth from './auth';
import { getCarLog, getCarsOnSite, getRegisteredCars, setProfileToBeEdited } from './carModule';
import { getVisitors, setUserViaCode, getSearchedUser, setUser, setLogEntryToBeEdited } from './visitModule';
import { getAppointments, getPersonalVisits, setAppointmentInfo } from './userModule';

export default combineReducers({
  error, success, warning, info,
  auth,
  getCarLog, getCarsOnSite, getRegisteredCars, setProfileToBeEdited,
  getVisitors, getSearchedUser, setUser, setUserViaCode, setLogEntryToBeEdited,
  getAppointments, getPersonalVisits, setAppointmentInfo,
  form: formReducer
});