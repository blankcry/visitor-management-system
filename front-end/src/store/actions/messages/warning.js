import { ADD_WARNING, REMOVE_WARNING } from '../../actionTypes';
import {removeSuccess} from './success';
import {removeError} from './error';
import {removeInfo} from './info'

export const addWarning = warning => ({
    type: ADD_WARNING,
    warning
});

export const removeWarning = () => ({
    type: REMOVE_WARNING
});

export function handleWarning(warning, dispatch) {
        dispatch(removeSuccess());
        dispatch(removeError());
        dispatch(removeInfo())
        dispatch(addWarning(warning));
};
