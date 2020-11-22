import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    SEARCH_USER,
    SEARCH_USER_GROUP_CHAT,
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case LOGOUT_USER:
            return {...state }
        case SEARCH_USER:
            return {...state};
        case SEARCH_USER_GROUP_CHAT:
            return {...state}
        default:
            return state;
    }
}