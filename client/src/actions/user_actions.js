import axios from 'axios';
import { 
    LOGIN_USER, 
    REGISTER_USER, 
    AUTH_USER, 
    LOGOUT_USER, 
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER
} from './types';

import { USER_SERVER } from '../components/utils/misc';
import { PRODUCT_SERVER } from '../components/utils/misc';

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
};

export function addToCart(_id){
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
                    .then(res => res.data)
    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

export function getCartItems(cartItems, userCart){
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
                    .then(res => {
                        // console.log(res.data);
                        userCart.forEach(item=> {
                            res.data.forEach((el, i) => {
                                if(item.id === el._id){
                                    res.data[i].quantity = item.quantity
                                }
                            })
                        })
                        return res.data;
                    })
    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

export function removeCartItem(id){
    const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
                    .then(res => {
                        res.data.cart.forEach(item => {
                            res.data.cartDetails.forEach((el, i)=> {
                                if(item.id === el._id) {
                                    res.data.cartDetails[i].quantity = item.quantity
                                }
                            })
                        })
                        return res.data;
                    })
    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}
