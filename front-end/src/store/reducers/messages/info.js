import { ADD_INFO, REMOVE_INFO } from '../../actionTypes';

export default (state = {message:null}, action) => {
    switch(action.type) {
        case ADD_INFO:
            return {...state, message: action.info};
        case REMOVE_INFO: 
            return {...state, message: null};
        default : 
            return state;
    };
};