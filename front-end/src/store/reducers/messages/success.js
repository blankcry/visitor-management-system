import {ADD_SUCCESS, REMOVE_SUCCESS} from '../../actionTypes';

export default (state = {message:null}, action) => {
    switch (action.type) {
        case ADD_SUCCESS:
            return {...state, message: action.success};
        case REMOVE_SUCCESS: 
            return {...state, message: null};
        default: 
            return state;
    };
};