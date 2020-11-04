import { ADD_CONTACT, REMOVE_CONTACT_REQUEST } from "./types";
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