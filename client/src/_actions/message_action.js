import axios from "axios";
import { GET_ALL_CONVERSATIONS, GET_MESSAGES_USER, AFTER_POST_MESSAGE } from "./types";

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


export const afterPostMessage  = async (data) => {
    try {
        return {
            type: AFTER_POST_MESSAGE,
            payload: data
        }
    } catch (error) {
        console.log(error)
    }  
}