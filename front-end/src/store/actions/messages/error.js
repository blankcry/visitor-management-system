import { ADD_ERROR, REMOVE_ERROR } from '../../actionTypes';
export const addError = error => ({
    type: ADD_ERROR,
    error
});

export const removeError = () => ({
    type: REMOVE_ERROR
});

export function handleError(error, dispatch) {
    if (error.response) {
        dispatch(addError((error.response.data.errorMessage)));
    } else {
        dispatch(addError(error.message));
    };
};