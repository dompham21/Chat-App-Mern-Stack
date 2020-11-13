import {
    ADD_CONTACT, 
    REMOVE_CONTACT_REQUEST, 
    GET_CONTACT_LIST, 
    GET_WAITING_ACCEPT_LIST, 
    GET_FRIEND_REQUEST_LIST, 
    GET_COUNT_CONTACT_ALL, 
    GET_COUNT_CONTACT_WAITING_ACCEPT, 
    GET_COUNT_CONTACT_FRIEND_REQUEST,
    REMOVE_CONTACT_REQUEST_RECEIVED,
    APPROVE_CONTACT_REQUEST_RECEIVED,
    REMOVE_CONTACT
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        //action
        case ADD_CONTACT:
            return {...state, addSuccess: action.payload}
        case REMOVE_CONTACT:
            return {...state, removeContactSuccess: action.payload}
        case APPROVE_CONTACT_REQUEST_RECEIVED:
            return {...state,approveContactReqReceived: action.payload}
        case REMOVE_CONTACT_REQUEST:
            return {...state, removeSuccess: action.payload}
        case REMOVE_CONTACT_REQUEST_RECEIVED:
            return {...state, removeReceivedSuccess: action.payload}
        //get list user
        case GET_CONTACT_LIST:
            return {...state, listContact: action.payload}
        case GET_WAITING_ACCEPT_LIST:
            return {...state, waitingAcceptList: action.payload}
        case GET_FRIEND_REQUEST_LIST:
            return {...state, friendRequestList: action.payload}
        //get count   
        case GET_COUNT_CONTACT_ALL:
            return {...state, countContactAll: action.payload}
        case GET_COUNT_CONTACT_WAITING_ACCEPT:
            return {...state, countContactWaitingAccept: action.payload}
        case GET_COUNT_CONTACT_FRIEND_REQUEST:
            return {...state, countContactFriendRequest: action.payload}
        default:
            return state;
    }
}