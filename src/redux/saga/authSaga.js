import axios from 'axios';
import Swal from 'sweetalert2';
import * as actionTypes from '../action-types';
import { api_urls } from '../../utils/api-urls';
import { astrologer_login, customer_change_picture, customer_login, customer_login_otp, customer_update_profile } from '../../utils/api-routes';
import { put, call, takeLeading } from 'redux-saga/effects';
import { access_token, refresh_token, user_name, user_role } from '../../utils/constants';
import { Color } from '../../assets/colors';
import { toaster } from '../../utils/services/toast-service';
import SocketService from '../../utils/services/socket-service';
import { generateTokenByRequestPermission } from '../../config/firebase-config';

//! Astrologer
function* requestToggleAstrologerLoginModal() {
    yield put({ type: actionTypes.TOGGLE_HAMBURGER_MENU, payload: false });
    if (!('Notification' in window)) {
        toaster.info({ text: 'This browser does not support desktop notifications.' });
        return;
    }

    if (Notification.permission === 'granted') {
        yield call(generateTokenByRequestPermission);
        yield put({ type: actionTypes.TOGGLE_ASTROLOGER_LOGIN_MODAL, payload: true });
    } else if (Notification.permission === 'denied') {
        toaster.info({ text: 'You have blocked notifications. Please enable them in your browser settings.' });
    } else if (Notification.permission === 'default') {
        const permission = yield call([Notification, Notification.requestPermission]);
        if (permission === 'granted') {
            yield call(generateTokenByRequestPermission);
            yield put({ type: actionTypes.TOGGLE_ASTROLOGER_LOGIN_MODAL, payload: true });
        }
    }
};

function* astrologerLogin(action) {
    try {
        const { payload } = action;
        console.log('Payload ::: ', payload);

        const { data } = yield axios.post(api_urls + astrologer_login, payload?.data);
        console.log('Astrologer Login Saga Response ::: ', data);

        if (data?.status) {
            Swal.fire({ icon: 'success', text: data?.message, showConfirmButton: false, timer: 2000 });
            localStorage.setItem(access_token, data?.result?.access_token);
            localStorage.setItem(refresh_token, data?.result?.refresh_token);
            localStorage.setItem(user_name, data?.result?.name);
            localStorage.setItem(user_role, data?.result?.role);
            yield put({ type: actionTypes.GET_USER_ASTROLOGER_DETAILS, payload: null });
            yield put({ type: actionTypes.TOGGLE_ASTROLOGER_LOGIN_MODAL, payload: false });
            yield call(payload?.onComplete);
        } else {
            Swal.fire({ icon: 'info', text: data?.message, showConfirmButton: false, timer: 2000 });
        }

    } catch (error) {
        Swal.fire({ icon: 'error', text: error?.response?.data?.message || 'Failed to login', showConfirmButton: false, timer: 2000, });
        console.log('Astrologer Login Saga Error ::: ', error)
    }
};

//! Customer
function* requestToggleCustomerLoginModal() {
    yield put({ type: actionTypes.TOGGLE_HAMBURGER_MENU, payload: false });
    if (!('Notification' in window)) {
        toaster.info({ text: 'This browser does not support desktop notifications.' });
        return;
    }

    if (Notification.permission === 'granted') {
        yield call(generateTokenByRequestPermission);
        yield put({ type: actionTypes.TOGGLE_CUSTOMER_LOGIN_MODAL, payload: true });
    } else if (Notification.permission === 'denied') {
        toaster.info({ text: 'You have blocked notifications. Please enable them in your browser settings.' });
    } else if (Notification.permission === 'default') {
        const permission = yield call([Notification, Notification.requestPermission]);
        if (permission === 'granted') {
            yield call(generateTokenByRequestPermission);
            yield put({ type: actionTypes.TOGGLE_CUSTOMER_LOGIN_MODAL, payload: true });
        }
    }
};

function* customerLogin(action) {
    try {
        const { payload } = action;
        console.log('Payload ::: ', payload);

        const { data } = yield axios.post(api_urls + customer_login, payload?.data);
        console.log('Customer Login Saga Response ::: ', data);

        if (data?.status) {
            Swal.fire({ icon: 'success', text: data?.message, showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        } else {
            Swal.fire({ icon: 'info', text: data?.message, showConfirmButton: false, timer: 2000 });
        }

    } catch (error) {
        Swal.fire({ icon: 'error', text: error?.response?.data?.message || 'Failed to sent OTP', showConfirmButton: false, timer: 2000, });
        console.log('Customer Login Saga Error ::: ', error?.response?.data)
    }
};

function* customerLoginOtp(action) {
    try {
        const { payload } = action;
        console.log('Payload ::: ', payload);

        const { data } = yield axios.post(api_urls + customer_login_otp, payload?.data);
        console.log('Customer Login Saga Response ::: ', data);

        if (data?.status) {
            Swal.fire({ icon: 'success', text: 'Login Successfully', showConfirmButton: false, timer: 2000 });
            localStorage.setItem(access_token, data?.result?.access_token);
            localStorage.setItem(refresh_token, data?.result?.refresh_token);
            localStorage.setItem(user_name, data?.result?.name);
            localStorage.setItem(user_role, data?.result?.role);
            yield put({ type: actionTypes.GET_USER_CUSTOMER_DETAILS, payload: null });
            yield put({ type: actionTypes.TOGGLE_CUSTOMER_LOGIN_MODAL, payload: false });
            yield call(payload?.onComplete);
        } else {
            Swal.fire({ icon: 'info', text: data?.message, showConfirmButton: false, timer: 2000 });
        }

    } catch (error) {
        Swal.fire({ icon: 'error', text: error?.response?.data?.message || 'Please try again', showConfirmButton: false, timer: 2000, });
        console.log('Customer Login Saga Error ::: ', error)
    }
};

function* customerUpdateProfile(action) {
    try {
        const { payload } = action;
        console.log('Payload ::: ', payload);

        const { data } = yield axios.post(api_urls + customer_update_profile, payload);
        console.log('Customer Update Profile Saga Response ::: ', data);

        if (data?.status) {
            toaster.success({ text: 'Profile updated successfully!!!' });
            yield put({ type: actionTypes.GET_USER_CUSTOMER_DETAILS, payload: { customerId: payload?.customerId } });
        }

    } catch (error) {
        toaster.error({ text: 'Failed to updated profile!!!' });
        console.log('Customer Update Profile Saga Error ::: ', error)
    }
};

function* customerChangePicture(action) {
    try {
        const { payload } = action;
        console.log('Payload ::: ', payload);

        const { data } = yield axios.post(api_urls + customer_change_picture, payload?.data);
        console.log('Customer Change Picture Saga Response ::: ', data);

        if (data?.status) {
            toaster.success({ text: 'Profile picture updated successfully!!!' });
            yield put({ type: actionTypes.GET_USER_CUSTOMER_DETAILS, payload: { customerId: payload?.customerId } });
        }

    } catch (error) {
        toaster.error({ text: 'Failed to change profile picture!!!' });
        console.log('Customer Change Picture Saga Error ::: ', error)
    }
};

function* userLogout(action) {
    try {
        const { payload } = action;
        const result = yield Swal.fire({ icon: 'warning', text: 'Do you want to logout ?', showConfirmButton: true, timer: 20000, confirmButtonText: 'Yes', confirmButtonColor: Color.primary, cancelButtonText: 'No', showCancelButton: true, cancelButtonColor: Color.darkgrey });

        if (result.isConfirmed) {
            localStorage.removeItem('current_user_data');
            localStorage.removeItem('user_type');
            localStorage.removeItem('current_user_id');

            yield put({ type: actionTypes.SET_USER_CUSTOMER_DETAILS, payload: null });
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_DETAILS, payload: null });
            Swal.fire({ icon: 'success', text: 'Logout successfully', showConfirmButton: false, timer: 2000 });
            SocketService.disconnect();
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: 'error', text: 'Failed To Logout', text: error?.response?.data ? error?.response?.data : 'Failed To Login', showConfirmButton: false, timer: 2000, });
        console.log('Customer Login Saga Error ::: ', error)
    }
};

export default function* authSaga() {
    //! Astrologer
    yield takeLeading(actionTypes.REQUEST_TOGGLE_ASTROLOGER_LOGIN_MODAL, requestToggleAstrologerLoginModal);
    yield takeLeading(actionTypes.ASTROLOGER_LOGIN, astrologerLogin);

    //! Customer
    yield takeLeading(actionTypes.REQUEST_TOGGLE_CUSTOMER_LOGIN_MODAL, requestToggleCustomerLoginModal);
    yield takeLeading(actionTypes.CUSTOMER_LOGIN, customerLogin);
    yield takeLeading(actionTypes.CUSTOMER_LOGIN_OTP, customerLoginOtp);
    yield takeLeading(actionTypes.CUSTOMER_UPDATE_PROFILE, customerUpdateProfile);
    yield takeLeading(actionTypes.CUSTOMER_CHANGE_PICTURE, customerChangePicture);
    yield takeLeading(actionTypes.USER_LOGOUT, userLogout);
};