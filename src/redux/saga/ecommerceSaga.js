import * as actionTypes from '../action-types';
import { toaster } from '../../utils/services/toast-service';
import { call, delay, put, select, takeLeading } from 'redux-saga/effects';
import { getAPI, postAPI, razorpayPayment } from '../../utils/api-function';
import { add_to_cart, get_customer_cart, get_puja, get_suggested_puja, order_product, register_created_puja, update_cart_item_quantity } from '../../utils/api-routes';

function* getPuja() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const { data } = yield getAPI(get_puja);
        console.log("Get Puja Data Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PUJA, payload: data?.pooja })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        // console.log("Get Puja Data Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getSuggestedPuja() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const { data } = yield postAPI(get_suggested_puja, { customerId: localStorage.getItem('current_user_id') });
        console.log("Get Suggested Puja Data Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_SUGGESTED_PUJA, payload: data?.data?.reverse() })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        // console.log("Get Suggested Puja Data Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* addToCart(action) {
    try {
        const { payload } = action;
        // console.log("Add To Cart Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(add_to_cart, payload?.data);
        // console.log("Add To Cart Saga Response ::: ", data);

        if (data?.success) {
            toaster.success({ text: data?.message });
            yield call(payload?.onComplete);
        } else {
            toaster.info({ text: data?.message });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        // console.log("Add To Cart Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCartData(action) {
    try {
        const { payload } = action;
        // console.log("Get Cart Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { data } = yield postAPI(get_customer_cart, { customerId: localStorage.getItem('current_user_id') });
        // console.log("Get Cart Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_CART_DATA, payload: { cartId: data?.data?.cartId, cart: data?.data?.cartItems, totalPrice: data?.data?.totalCartPrice } })
        } else {
            yield put({ type: actionTypes.SET_CART_DATA, payload: { cart: [], totalPrice: null } })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        // console.log("Get Cart Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* updateCartQuantity(action) {
    try {
        const { payload } = action;
        // console.log("Update Cart Quantity Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(update_cart_item_quantity, payload);
        // console.log("Update Cart Quantity Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.GET_CART_DATA, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (error) {
        // console.log("Update Cart Quantity Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* orderCart(action) {
    try {
        const { payload } = action;
        // console.log("Order Cart Payload ::: ", payload);

        const razorpayResponse = yield razorpayPayment({ amount: payload?.amount, name: payload?.user?.customerName, email: payload?.user?.email, contact: payload?.user?.phoneNumber })
        console.log("Razor Pay Response ::: ", razorpayResponse);

        // {
        //     "status": true,
        //     "message": "Payment was successful.",
        //     "result": {
        //         "razorpay_payment_id": "pay_QCv0JFBzAUgbz3",
        //         "razorpay_order_id": "order_QCv0BiuWXn6ysC",
        //         "razorpay_signature": "7c4a2972b69cebb2516c1afa69d896209afac5a9f49e320fdbf5ad98d3b5cbfd"
        //     }
        // }

        if (razorpayResponse?.status) {
            const { data } = yield postAPI(order_product, { ...payload?.data, razorpayOrderId: razorpayResponse?.result?.razorpay_order_id, razorpayPaymentId: razorpayResponse?.result?.razorpay_payment_id });
            console.log("Final Response :: ", data);

            if (data?.success) {
                toaster({ text: data?.message });
                yield call(payload?.onComplete);
            }
        } else toaster?.error({ text: 'Payment Failed.' });

    } catch (error) {
        toaster?.error({ text: 'Payment Failed.' });
        // console.log("Order Cart Saga Error ::: ", error);
    }
};

function* registerCreatedPuja(action) {
    try {
        const { payload } = action;
        // console.log("Register Created Puja Payload ::: ", payload);

        const { data } = yield postAPI(register_created_puja, payload?.data);
        // console.log("Register Created Puja Saga Response ::: ", data);

        if (data?.success) {
            toaster.info({ text: data?.message });
            yield call(payload?.onComplete);
        } else {
            toaster?.info({ text: data?.message });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        // console.log("Register Created Puja Saga Error ::: ", error);
        toaster.info({ text: error?.response?.data?.message });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
};

export default function* ecommerceSaga() {
    yield takeLeading(actionTypes.GET_SUGGESTED_PUJA, getSuggestedPuja);
    yield takeLeading(actionTypes.GET_PUJA, getPuja);
    yield takeLeading(actionTypes.ADD_TO_CART, addToCart);
    yield takeLeading(actionTypes.GET_CART_DATA, getCartData);
    yield takeLeading(actionTypes.UPDATE_CART_QUANTITY, updateCartQuantity);
    yield takeLeading(actionTypes.ORDER_CART, orderCart);
    //* This is for astrologer side UI
    yield takeLeading(actionTypes.REGISTER_CREATED_PUJA, registerCreatedPuja);
};