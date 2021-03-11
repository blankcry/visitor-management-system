import {
  VIEW_APPOINTMENTS,
  VIEW_VISITS,
  SET_APPOINTMENT_PROFILE,
  REMOVE_APPOINTMENT_PROFILE
} from '../actionTypes';

const DEFAULT_STATE = {
  appointments: []
};

export const getAppointments = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case VIEW_APPOINTMENTS:
      return { ...state, appointments: action.appointments };
    default:
      return state;
  };
};

export const getPersonalVisits = (state = { visits: [] }, action) => {
  switch (action.type) {
    case VIEW_VISITS:
      return { ...state, visits: action.visits };
    default:
      return state;
  };
};

export const setAppointmentInfo = (state = {info: {}}, action) => {
  switch (action.type) {
    case SET_APPOINTMENT_PROFILE:
      return { ...state, info: action.appointment};
    case REMOVE_APPOINTMENT_PROFILE:
      return { ...state, info: {}};
    default:
      return state;
  };
};