import { VIEW_CARS_ONSITE, VIEW_CARS_LOG, VIEW_REGISTERED_CARS, SET_CAR_PROFILE, REMOVE_CAR_PROFILE } from '../actionTypes';


const DEFAULT_STATE = {
  cars: []
};
export const getCarsOnSite = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case VIEW_CARS_ONSITE:
      return { ...state, cars: action.cars };
    default:
      return state;
  };
};
export const getCarLog = (state = { log: [] }, action) => {
  switch (action.type) {
    case VIEW_CARS_LOG:
      return { ...state, log: action.log };
    default:
      return state;
  };
};
export const getRegisteredCars = (state = { cars: [] }, action) => {
  switch (action.type) {
    case VIEW_REGISTERED_CARS:
      return { ...state, cars: action.cars };
    default:
      return state;
  };
};
export const setProfileToBeEdited = (state = { profile: {} }, action) => {
  switch (action.type) {
    case SET_CAR_PROFILE:
      return { ...state, profile: action.profile };
    case REMOVE_CAR_PROFILE:
      return { ...state, profile: {} };
    default:
      return state;
  };
};
