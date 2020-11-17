import { GET_ALL_CONVERSATIONS, GET_MESSAGES_USER, AFTER_POST_MESSAGE } from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case GET_ALL_CONVERSATIONS:
            return {...state,listAllConversations: action.payload}
        case GET_MESSAGES_USER:
            return {...state,dataMessages: action.payload}
        case AFTER_POST_MESSAGE:
            return {...state,dataMessages: state.dataMessages.concat(action.payload)}
        default:
            return state;
    }
}