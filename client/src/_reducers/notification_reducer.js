import { GET_NOTIFICATION, MARK_NOTIFICATION, GET_COUNT_NOTIFICATION, } from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case GET_NOTIFICATION:
            return {...state}
        case MARK_NOTIFICATION:
            return {...state};
        case GET_COUNT_NOTIFICATION:
            return {...state,countNotification: action.payload}
        default:
            return state;
    }
}