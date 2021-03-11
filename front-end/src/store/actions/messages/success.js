import { ADD_SUCCESS, REMOVE_SUCCESS } from '../../actionTypes';
import {removeError} from './error';
import {removeWarning} from './warning';
import {removeInfo} from './info';

export const addSuccess = success => ({
  type: ADD_SUCCESS,
  success
});

export const removeSuccess = () => ({
  type: REMOVE_SUCCESS
});

export function handleSuccess(success, dispatch) {
  dispatch(removeError());
  dispatch(removeWarning());
  dispatch(removeInfo());
  dispatch(addSuccess(success));
};