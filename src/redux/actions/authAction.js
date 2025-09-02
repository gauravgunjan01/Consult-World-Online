import * as actionTypes from "../action-types";

//! Customer
export const setCustomerLoginModalOpen = (payload) => ({ type: actionTypes.IS_CUSTOMER_LOGIN_MODAL_OPEN, payload });
export const customerLogin = (payload) => ({ type: actionTypes.CUSTOMER_LOGIN, payload });
export const customerLoginOtp = (payload) => ({ type: actionTypes.CUSTOMER_LOGIN_OTP, payload });
export const customerUpdateProfile = (payload) => ({ type: actionTypes.CUSTOMER_UPDATE_PROFILE, payload });
export const customerChangePicture = (payload) => ({ type: actionTypes.CUSTOMER_CHANGE_PICTURE, payload });
export const customerLoginInputField = (payload) => ({ type: actionTypes.CUSTOMER_LOGIN_INPUT_FIELD, payload });

//! Astrologer
export const setAstrologerLoginModalOpen = (payload) => ({ type: actionTypes.IS_ASTROLOGER_LOGIN_MODAL_OPEN, payload });
export const astrologerLogin = (payload) => ({ type: actionTypes.ASTROLOGER_LOGIN, payload });
export const userLogout = (payload) => ({ type: actionTypes.USER_LOGOUT, payload });