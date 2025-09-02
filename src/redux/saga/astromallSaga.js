import * as actionTypes from '../action-types';
import { toaster } from '../../utils/services/toast-service';
import { call, delay, put, select, takeLeading } from 'redux-saga/effects';
import { getAPI, postAPI, razorpayPayment } from '../../utils/api-function';
import { add_astro_mall_product_to_cart, add_to_cart, get_astro_mall_category, get_astro_mall_product, get_customer_cart, get_puja, get_suggested_puja, order_astro_mall_cart, order_product, register_created_puja, update_astro_mall_cart_item_quantity, update_cart_item_quantity } from '../../utils/api-routes';

function* getAstromallCategory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const { data } = yield getAPI(get_astro_mall_category);
        console.log("Get Astromall Category Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_MALL_CATEGORY, payload: data?.productCategory })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Get Astromall Category Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
};

function* getAstromallProduct(action) {
    try {
        const { payload } = action;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const { data } = yield postAPI(get_astro_mall_product, payload);
        console.log("Get Astromall Product Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_MALL_PRODUCT, payload: data?.products })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Get Astromall Product Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
};

function* addAstromallProductToCart(action) {
    try {
        const { payload } = action;
        console.log("Add Astromall Product To Cart Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(add_astro_mall_product_to_cart, payload?.data);
        console.log("Add Astromall Product To Cart Saga Response ::: ", data);

        if (data?.success) {
            toaster.success({ text: data?.message });
            yield call(payload?.onComplete);
        } else {
            toaster.info({ text: data?.message });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Add Astromall Product To Cart Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCustomerAstromallCart() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { data } = yield postAPI(actionTypes.get_customer_astro_mall_cart, { customerId: localStorage.getItem('current_user_id') });
        console.log("Get Customer Astromall Cart Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_CUSTOMER_ASTRO_MALL_CART, payload: { cart: data?.cart, totalPrice: data?.totalPrice } })
        } else {
            yield put({ type: actionTypes.SET_CUSTOMER_ASTRO_MALL_CART, payload: { cart: [], totalPrice: null } })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Get Customer Astromall Cart Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_CUSTOMER_ASTRO_MALL_CART, payload: { cart: [], totalPrice: null } })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* updateAstromallCartItemQuantity(action) {
    try {
        const { payload } = action;
        console.log("Update Cart Quantity Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(update_astro_mall_cart_item_quantity, payload);
        console.log("Update Cart Quantity Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.GET_CUSTOMER_ASTRO_MALL_CART, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (error) {
        console.log("Update Cart Quantity Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* orderAstromallCart(action) {
    try {
        const { payload } = action;
        console.log("Order Cart Saga Payload ::: ", payload);

        const razorpayResponse = yield razorpayPayment({ amount: payload?.amount, name: payload?.user?.customerName, email: payload?.user?.email, contact: payload?.user?.phoneNumber })
        console.log("Razor Pay Response ::: ", razorpayResponse);

        if (razorpayResponse?.status) {
            const { data } = yield postAPI(order_astro_mall_cart, { ...payload?.data, razorpayOrderId: razorpayResponse?.result?.razorpay_order_id, razorpayPaymentId: razorpayResponse?.result?.razorpay_payment_id });
            console.log("Final Response :: ", data);

            if (data?.success) {
                toaster({ text: data?.message });
                yield call(payload?.onComplete);
            }
        } else toaster?.error({ text: 'Payment Failed.' });

    } catch (error) {
        console.log("Order Cart Saga Error ::: ", error);
        toaster?.error({ text: 'Payment Failed.' });
    }
};

export default function* astromallSaga() {
    yield takeLeading(actionTypes.GET_ASTRO_MALL_CATEGORY, getAstromallCategory);
    yield takeLeading(actionTypes.GET_ASTRO_MALL_PRODUCT, getAstromallProduct);
    yield takeLeading(actionTypes.ADD_ASTRO_MALL_PRODUCT_TO_CART, addAstromallProductToCart);
    yield takeLeading(actionTypes.GET_CUSTOMER_ASTRO_MALL_CART, getCustomerAstromallCart);
    yield takeLeading(actionTypes.UPDATE_ASTRO_MALL_CART_ITEM_QUANTITY, updateAstromallCartItemQuantity);
    yield takeLeading(actionTypes.ORDER_ASTRO_MALL_CART, orderAstromallCart);
};