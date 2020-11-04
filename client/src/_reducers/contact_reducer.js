import {
    ADD_CONTACT, REMOVE_CONTACT_REQUEST
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case ADD_CONTACT:
            return {...state}
        case REMOVE_CONTACT_REQUEST:
            return {...state}
        default:
            return state;
    }
}