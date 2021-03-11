import { ADD_INFO, REMOVE_INFO } from '../../actionTypes';
import {removeSuccess} from './success';
import {removeError} from './error';
import {removeWarning} from './warning';

export const addInfo = info => ({
    type: ADD_INFO,
    info
});

export const removeInfo = () => ({
    type: REMOVE_INFO
});

export function handleInfo(info, dispatch) {
    dispatch(removeSuccess());
    dispatch(removeError());
    dispatch(removeWarning());
    dispatch(addInfo(info));
};