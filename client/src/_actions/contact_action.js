import { ADD_CONTACT, REMOVE_CONTACT_REQUEST, GET_CONTACT_LIST, GET_WAITING_ACCEPT_LIST, GET_FRIEND_REQUEST_LIST, GET_COUNT_CONTACT_ALL, GET_COUNT_CONTACT_WAITING_ACCEPT, GET_COUNT_CONTACT_FRIEND_REQUEST } from "./types";
import axios from 'axios';


export const addContact = async (dataToSubmit) => {
    try {
        const request = await axios.post(`/contact/add-new`,{uid:dataToSubmit},{
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

export const removeContactReq = async (dataToSubmit) => {
    try {
        const request = await axios.delete('/contact/remove-request',{data:{uid: dataToSubmit},
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

export const getContactList = async () => {
    try {
        const request = await axios.get('/contact/list-users',{
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

export const getWaitingAcceptList = async () => {
    try {
        const request = await axios.get('/contact/waiting-accept',{
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

export const getFriendRequestList = async () => {
    try {
        const request = await axios.get('/contact/friend-request',{
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

export const getCountContactAll = async () => {
    try {
        const request = await axios.get('/contract/count/all',{
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

export const getCountContactWaitingAccept = async () => {
    try {
        const request = await axios.get('/contact/count/waiting-accept',{
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

export const getCountContactFriendRequest = async () => {
    try {
        const request = await axios.get('/contact/count/friend-request',{
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