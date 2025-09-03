import * as actionTypes from "../action-types";

//! Customer
export const requestToggleCustomerLoginModal = payload => ({ type: actionTypes.REQUEST_TOGGLE_CUSTOMER_LOGIN_MODAL, payload });
export const toggleCustomerLoginModal = payload => ({ type: actionTypes.TOGGLE_CUSTOMER_LOGIN_MODAL, payload });
export const customerLogin = payload => ({ type: actionTypes.CUSTOMER_LOGIN, payload });
export const customerLoginOtp = payload => ({ type: actionTypes.CUSTOMER_LOGIN_OTP, payload });
export const customerUpdateProfile = payload => ({ type: actionTypes.CUSTOMER_UPDATE_PROFILE, payload });
export const customerChangePicture = payload => ({ type: actionTypes.CUSTOMER_CHANGE_PICTURE, payload });
export const customerLoginInputField = payload => ({ type: actionTypes.CUSTOMER_LOGIN_INPUT_FIELD, payload });

//! Astrologer
export const requestToggleAstrologerLoginModal = payload => ({ type: actionTypes.REQUEST_TOGGLE_ASTROLOGER_LOGIN_MODAL, payload });
export const toggleAstrologerLoginModal = payload => ({ type: actionTypes.TOGGLE_ASTROLOGER_LOGIN_MODAL, payload });
export const astrologerLogin = payload => ({ type: actionTypes.ASTROLOGER_LOGIN, payload });
export const userLogout = payload => ({ type: actionTypes.USER_LOGOUT, payload });