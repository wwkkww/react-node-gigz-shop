import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP
} from './types';
import { PRODUCT_SERVER } from '../components/utils/misc';

//////////////////////////////////////////
/////////        PRODUCTS
//////////////////////////////////////////

export function getProductByArrival() {
    //article?sortBy=createdAt&order=desc&limit=100&skip=5
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
};

export function getProductBySell() {
    //article?sortBy=sold&order=desc&limit=4
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);
    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
};

export function getProductsToShop(skip, limit, filters = [], prevState = []) {
    const data = { limit, skip, filters };

    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
        .then(response => {
            // console.log('getProductsToShop: response', response)
            let newState = [
                ...prevState,
                ...response.data.articles
            ];

            return {
                size: response.data.size,
                // articles: response.data.articles
                articles: newState
            }
        })
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
};


//////////////////////////////////////////
/////////        CATEGORIES
//////////////////////////////////////////
export function getBrands() {
    const request = axios.get(`${PRODUCT_SERVER}/brands`).then(response => response.data);
    return {
        type: GET_BRANDS,
        payload: request
    }
};

export function getWoods() {
    const request = axios.get(`${PRODUCT_SERVER}/woods`).then(response => response.data);
    return {
        type: GET_WOODS,
        payload: request
    }
};

