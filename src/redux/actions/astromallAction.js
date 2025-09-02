import * as actionTypes from '../action-types';

export const getAstromallCategory = payload => ({ type: actionTypes.GET_ASTRO_MALL_CATEGORY, payload });
export const setAstromallCategory = payload => ({ type: actionTypes.SET_ASTRO_MALL_CATEGORY, payload });
export const getAstromallProduct = payload => ({ type: actionTypes.GET_ASTRO_MALL_PRODUCT, payload });
export const setAstromallProduct = payload => ({ type: actionTypes.SET_ASTRO_MALL_PRODUCT, payload });

export const addAstromallProductToCart = payload => ({ type: actionTypes.ADD_ASTRO_MALL_PRODUCT_TO_CART, payload });
export const getCustomerAstromallCart = payload => ({ type: actionTypes.GET_CUSTOMER_ASTRO_MALL_CART, payload });
export const setCustomerAstromallCart = payload => ({ type: actionTypes.SET_CUSTOMER_ASTRO_MALL_CART, payload });
export const updateAstromallCartItemQuantity = payload => ({ type: actionTypes.UPDATE_ASTRO_MALL_CART_ITEM_QUANTITY, payload });
export const orderAstromallCart = payload => ({ type: actionTypes.ORDER_ASTRO_MALL_CART, payload });