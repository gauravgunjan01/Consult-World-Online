import * as actionTypes from '../action-types'

export const getSuggestedPuja = payload => ({
    type: actionTypes.GET_SUGGESTED_PUJA, payload
});

export const setSuggestedPuja = payload => ({
    type: actionTypes.SET_SUGGESTED_PUJA, payload
});

export const getPuja = payload => ({
    type: actionTypes.GET_PUJA, payload
});

export const setPuja = payload => ({
    type: actionTypes.SET_PUJA, payload
});

export const addToCart = payload => ({
    type: actionTypes.ADD_TO_CART, payload
});

export const getCartData = payload => ({
    type: actionTypes.GET_CART_DATA, payload
});

export const setCartData = payload => ({
    type: actionTypes.SET_CART_DATA, payload
});

export const updateCartQuantity = payload => ({
    type: actionTypes.UPDATE_CART_QUANTITY, payload
});

export const orderCart = payload => ({
    type: actionTypes.ORDER_CART, payload
});

//* This is for astrologer side UI
export const registerCreatedPuja = payload => ({
    type: actionTypes.REGISTER_CREATED_PUJA, payload
});