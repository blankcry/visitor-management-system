import { ADD_WARNING, REMOVE_WARNING } from '../../actionTypes';

export default (state = {message:null}, action) => {
    switch(action.type) {
        case ADD_WARNING:
            return {...state, message: action.warning};
        case REMOVE_WARNING: 
            return {...state, message: null};
        default: 
            return state;
    };
};