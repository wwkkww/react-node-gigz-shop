import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './types';
import { USER_SERVER } from '../components/utils/misc';

export function loginUser(dataToSubmit){
    console.log('axios loginUser')
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then((res)=> res.data);
    //reducer
    return {
        type: LOGIN_USER,
        payload: request
    }
};

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then(res => res.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
};

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`).then((res)=> res.data);
    console.log('user_action.js - auth()')
    return {
        type: AUTH_USER,
        payload: request
    }
};

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`).then((res)=> res.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

