import {
    ADD_CONTACT, REMOVE_CONTACT_REQUEST, GET_CONTACT_LIST
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case ADD_CONTACT:
            return {...state}
        case REMOVE_CONTACT_REQUEST:
            return {...state}
        case GET_CONTACT_LIST:
            return {...state}
        default:
            return state;
    }
}