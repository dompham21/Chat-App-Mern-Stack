import {
    ADD_CONTACT, REMOVE_CONTACT_REQUEST, GET_CONTACT_LIST, GET_WAITING_ACCEPT_LIST, GET_FRIEND_REQUEST_LIST
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case ADD_CONTACT:
            return {...state}
        case REMOVE_CONTACT_REQUEST:
            return {...state}
        case GET_CONTACT_LIST:
            return {...state}
        case GET_WAITING_ACCEPT_LIST:
            return {...state,waitingAcceptList: action.payload}
        case GET_FRIEND_REQUEST_LIST:
            return {...state,friendRequestList: action.payload}
        default:
            return state;
    }
}