import axios from "axios";
import { GET_NOTIFICATION, MARK_NOTIFICATION, GET_COUNT_NOTIFICATION,  } from "./types";

export const getNotification = async () => {
    try {
        const request = await axios.get('/get/notification',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: GET_NOTIFICATION,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
}

export const markNotification = async (targetUsers) => {
    try {
        const request = await axios.put('/notification/all-as-read',{targetUsers:targetUsers},{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        return {
            type: MARK_NOTIFICATION
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCountNotification = async () => {
    try {
        const request = await axios.get('/count/notification',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        return {
            type: GET_COUNT_NOTIFICATION,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
}