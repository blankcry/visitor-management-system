import { VIEW_VISITORS_ONSITE, 
  GET_CLOSED_VISITS_LOG,
  SEARCH_FOR_USERS, 
  REMOVE_USER_LOG,
  SET_USER_LOG, 
  SET_USER_VIA_APPOINTMENT_CODE,
  SET_LOG_PROFILE,
  REMOVE_LOG_PROFILE
} from '../actionTypes';


const DEFAULT_STATE = {
  visitors: []
};
const DEFAULT_USERS_STATE = {
  users: []
};
const DEFAULT_USER_STATE = {
  username: ''
};
const DEFAULT_APPOINTMENT_FORM_STATE = {
  user: {}
};

export const getVisitors =  (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case VIEW_VISITORS_ONSITE: 
      return {...state, visitors: action.visitors};
    case GET_CLOSED_VISITS_LOG:
      return {...state, visitors: action.visitors};
    default: 
      return state;
  };
};

export const getSearchedUser = (state = DEFAULT_USERS_STATE, action) => {
  switch (action.type) {
    case SEARCH_FOR_USERS: 
      return {...state, users: action.users};
      default: 
      return state;
    };
};

export const setUser = (state = DEFAULT_USER_STATE, action) => {
    switch (action.type) {
    case SET_USER_LOG: 
      return {...state, username: action.username};
    case REMOVE_USER_LOG: 
      return {...state, username: ''};
    default: 
      return state;
  };
};

export const setUserViaCode = (state = DEFAULT_APPOINTMENT_FORM_STATE, action) => {
  switch (action.type) {
    case SET_USER_VIA_APPOINTMENT_CODE: 
      return {...state, user: action.user};
    default:
      return state;
  };
};

export const setLogEntryToBeEdited = (state = {profile: {}}, action) => {
  switch (action.type) {
    case SET_LOG_PROFILE:
      return {...state, profile: action.profile};
    case REMOVE_LOG_PROFILE:
      return {...state, profile: {}};
    default: 
      return state;
  };
};