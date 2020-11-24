
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    SEARCH_USER,
    SEARCH_USER_GROUP_CHAT,
    UPDATE_AVATAR,
    UPDATE_INFO_USER,
    UPDATE_PASSWORD
} from './types';
import axios from "axios";



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
    const request =  axios.post(`/signin`,(dataToSubmit))
            .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
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

export const updateAvatar = (data) => {
    try {
        const request =  axios.put(`/user/update-avatar`,{data},{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')            }
        })
        .then(res => res.data)
        return {
            type: UPDATE_AVATAR,
            payload: request
        }
    } catch (error) {
        console.log(error);
    }   
}

export const searchUser =  (query) => {
    try {
        const request =  axios.get(`/contact/find-users/${encodeURI(query)}`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')            }
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

export const searchUserGroupChat = (query) => {
    try {
        const request =  axios.get(`/contact/group-chat/find-users/${encodeURI(query)}`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data.users)
        return {
            type: SEARCH_USER_GROUP_CHAT,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
}

export const uploadCloundinary = (formData) => {
    try {
        const request =  axios.post('https://api.cloudinary.com/v1_1/dmriwkfll/image/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => res.data)
        return {
            type: SEARCH_USER_GROUP_CHAT,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateUserInfo = (dataToSubmit) => {
    try {
        const request =  axios.put('/user/update-info', dataToSubmit, {
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: UPDATE_INFO_USER,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
}

export const updatePassword = (dataToSubmit) => {
    try {
        const request =  axios.put('/user/update-password', dataToSubmit, {
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.data)
        return {
            type: UPDATE_PASSWORD,
            payload: request
        }
    } catch (error) {
        console.log(error)
    }
}

