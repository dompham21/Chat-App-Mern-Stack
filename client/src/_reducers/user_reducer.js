import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    SEARCH_USER,
    SEARCH_USER_GROUP_CHAT,
    UPDATE_AVATAR,
    UPLOAD_CLOUDINARY,
    UPDATE_INFO_USER,
    UPDATE_PASSWORD,
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case LOGOUT_USER:
            return {...state }
        case UPDATE_AVATAR:
            return {...state, updateAvatarSuccess: action.payload}
        case UPLOAD_CLOUDINARY:
            return {...state}
        case SEARCH_USER:
            return {...state};
        case SEARCH_USER_GROUP_CHAT:
            return {...state}
        case UPDATE_INFO_USER:
            return {...state, updateInfoSuccess: action.payload}
        case UPDATE_PASSWORD:
            return {...state, updatePasswordSuccess: action.payload}
        default:
            return state;
    }
}