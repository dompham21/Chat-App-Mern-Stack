
import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    SEARCH_USER,
} from './types';


export const registerUser =  (dataToSubmit) => {
    try {
        const request =  axios.post(`/signup`,dataToSubmit)
        .then(response => response.data);
   
        return {
            type: REGISTER_USER,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
   
}

export const loginUser =  (dataToSubmit) => {
    try {
        const request =  axios.post(`/signin`,(dataToSubmit))
                .then(response => response.data);

        return {
            type: LOGIN_USER,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
    
}


export const logoutUser =  () => {
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

export const searchUser =  (query) => {
    try {
        const request =  axios.get('/contact/find-users',{
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