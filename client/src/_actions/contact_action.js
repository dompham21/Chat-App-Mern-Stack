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
} from "./types";
import axios from 'axios';


export const addContact =  (dataToSubmit) => {
    try {
        const request =  axios.post(`/contact/add-new`,{uid:dataToSubmit},{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
            .then(response => response.data);
       
        return {
            type: ADD_CONTACT,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
    
}

export const approveContactReqReceived =  (dataToSubmit) => {
    try {
        const request =  axios.put(`/contact/approve-request-received`,{uid:dataToSubmit},{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
            .then(response => response.data);
       
        return {
            type: APPROVE_CONTACT_REQUEST_RECEIVED,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeContact =  (dataToSubmit) => {
    try {
        const request =  axios.delete('/contact/remove-contact',{data:{uid: dataToSubmit},
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
            .then(response => response.data);
        return {
            type: REMOVE_CONTACT,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const removeContactReq =  (dataToSubmit) => {
    try {
        const request =  axios.delete('/contact/remove-request',{data:{uid: dataToSubmit},
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
            .then(response => response.data);
        return {
            type: REMOVE_CONTACT_REQUEST,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const removeContactReqReceived =  (dataToSubmit) => {
    try {
        const request =  axios.delete('/contact/remove-request-received',{data:{uid: dataToSubmit},
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
            .then(response => response.data);
        return {
            type: REMOVE_CONTACT_REQUEST_RECEIVED,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const getContactList =  () => {
    try {
        const request =  axios.get('/contact/list-users',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: GET_CONTACT_LIST,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const getWaitingAcceptList =  () => {
    try {
        const request =  axios.get('/contact/waiting-accept',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: GET_WAITING_ACCEPT_LIST,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const getFriendRequestList =  () => {
    try {
        const request =  axios.get('/contact/friend-request',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: GET_FRIEND_REQUEST_LIST,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCountContactAll =  () => {
    try {
        const request =  axios.get('/contract/count/all',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: GET_COUNT_CONTACT_ALL,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCountContactWaitingAccept =  () => {
    try {
        const request =  axios.get('/contact/count/waiting-accept',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: GET_COUNT_CONTACT_WAITING_ACCEPT,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCountContactFriendRequest =  () => {
    try {
        const request =  axios.get('/contact/count/friend-request',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: GET_COUNT_CONTACT_FRIEND_REQUEST,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}