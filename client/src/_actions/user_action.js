
import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    SEARCH_USER,
} from './types';


export const registerUser = async (dataToSubmit) => {
    try {
        const request = await axios.post(`/signup`,dataToSubmit)
        .then(response => response.data);
   
        return {
            type: REGISTER_USER,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
   
}

export const loginUser = async (dataToSubmit) => {
    try {
        const request = await axios.post(`/signin`,(dataToSubmit))
                .then(response => response.data);

        return {
            type: LOGIN_USER,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
    
}


export const logoutUser = async () => {
    try {
        const request = axios.get(`/logout`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(response => response.data);
    
        return {
            type: LOGOUT_USER,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
    
}

export const searchUser = async (query) => {
    try {
        const request = await axios.get('/contact/find-users',{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token'),
                "query": query
            }
        })
        .then(res => res.data.users)
        return {
            type: SEARCH_USER,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }
    
}