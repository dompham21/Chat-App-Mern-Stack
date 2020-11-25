import axios from "axios";
import { 
    GET_ALL_CONVERSATIONS, 
    GET_MESSAGES_USER, 
    AFTER_POST_MESSAGE, 
    GET_KEY_TABS, 
    GET_DATA_TO_EMIT_CALL_VIDEO, 
    GET_ICE_TURN_SERVER, 
    ADD_NEW_GROUP_CHAT,
    GET_MESSAGES_GROUP,
    AFTER_POST_MESSAGE_GROUP
} from "./types";

export const getAllConversations =  () => {
    try {
        const request =  axios.get(`/message/get-all-conversations`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(response => response.data);
   
        return {
            type: GET_ALL_CONVERSATIONS,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
   
}


export const getMessagesUser =  (dataToSubmit) => {
    try {
        // userId = req.params.id
        const request =  axios.get(`/message/${dataToSubmit}`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(response => response.data);
        return {
            type: GET_MESSAGES_USER,
            payload: request
        }
    } catch (error) {
        console.log(error)
    } 
}

export const getMessagesGroup =  (dataToSubmit) => {
    try {
        const request =  axios.get(`/message/group/${dataToSubmit}`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(response => response.data);
   
        return {
            type: GET_MESSAGES_GROUP,
            payload: request
        }
    } catch (error) {
        console.log(error)
    } 
}



export const afterPostMessage  =  (data) => {
    try {
        return {
            type: AFTER_POST_MESSAGE,
            payload: data
        }
    } catch (error) {
        console.log(error)
    }  
}
export const afterPostMessageGroup  =  (data) => {
    try {
        return {
            type: AFTER_POST_MESSAGE_GROUP,
            payload: data
        }
    } catch (error) {
        console.log(error)
    }  
}

export const getKeyTabs = (data) => {
    try {
        return {
            type: GET_KEY_TABS,
            payload: data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getDataToEmitCallVideo = (data) => {
    try {
        return {
            type: GET_DATA_TO_EMIT_CALL_VIDEO,
            payload:data
        }
    } catch (error) {
        console.log(error)
    }
}



export const addNewGroupChat = (dataToSubmit) => {
    try {
        const request =  axios.post(`/group-chat/add-new`,{data:dataToSubmit},{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(response => response.data);
   
        return {
            type: ADD_NEW_GROUP_CHAT,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
}