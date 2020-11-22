import { 
    GET_ALL_CONVERSATIONS, 
    GET_MESSAGES_USER, 
    AFTER_POST_MESSAGE, 
    GET_KEY_TABS, 
    GET_DATA_TO_EMIT_CALL_VIDEO, 
    GET_ICE_TURN_SERVER, 
    ADD_NEW_GROUP_CHAT,
    GET_MESSAGES_GROUP
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case GET_ALL_CONVERSATIONS:
            return {...state,listAllConversations: action.payload}
        case GET_MESSAGES_USER:
            return {...state,dataMessages: action.payload}
        case GET_MESSAGES_GROUP:
            return {...state,dataMessagesGroup: action.payload}
        case AFTER_POST_MESSAGE:
            return {...state,dataMessages: state.dataMessages.concat(action.payload),receiveMessage: action.payload}
        case GET_KEY_TABS:
            return {...state,activeKey: action.payload}
        case GET_DATA_TO_EMIT_CALL_VIDEO:
            return {...state,dataToEmitCallVideo: action.payload}
        case GET_ICE_TURN_SERVER:
            return {...state,iceTurnServer: action.payload}
        case ADD_NEW_GROUP_CHAT:
            return {...state,addGroupSuccess: action.payload}
        default:
            return state;
    }
}