import { 
    GET_NOTIFICATION,
    MARK_NOTIFICATION, 
    GET_COUNT_NOTIFICATION, 
    NOTIFICATION_ADD_NEW, 
    NOTIFICATION_REMOVE_REQ_CONTACT_RECEIVED,
    NOTIFICATION_REMOVE_REQ_CONTACT_SENT,
    NOTIFICATION_APPROVE_REQ_CONTACT_RECEIVED,
    NOTIFICATION_REMOVE_CONTACT, 
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case GET_NOTIFICATION:
            return {...state}
        case MARK_NOTIFICATION:
            return {...state};
        case GET_COUNT_NOTIFICATION:
            return {...state,countNotification: action.payload}
        // notification action    
        case NOTIFICATION_ADD_NEW:
            return {...state, notificationAddNew: action.payload}
        case NOTIFICATION_REMOVE_CONTACT:
            return {...state, notiRemoveContact: action.payload}
        case NOTIFICATION_APPROVE_REQ_CONTACT_RECEIVED:
            return {...state, notiApproveReqContactReceived: action.payload}
        case NOTIFICATION_REMOVE_REQ_CONTACT_RECEIVED:
            return {...state, notiRemoveReqContactReceived: action.payload}
        case NOTIFICATION_REMOVE_REQ_CONTACT_SENT:
            return {...state, notiRemoveReqContactSent: action.payload}
        default:
            return state;
    }
}