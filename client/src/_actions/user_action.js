
import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    SEARCH_USER,
} from './types';

console.log(localStorage.getItem('token'));

export function registerUser(dataToSubmit){
    const request = axios.post(`/signup`,dataToSubmit)
        .then(response => response.data);
   
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`/signin`,(dataToSubmit))
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}


export function logoutUser(){
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
}

export function searchUser(query){
    const request = axios.get('/search/byusername',{
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('token'),
            "query": query
        }
    })
    .then(response => response.data.users);

    return {
        type: SEARCH_USER,
        payload: request
    }
}