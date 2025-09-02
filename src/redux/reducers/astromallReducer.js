import * as actionTypes from '../action-types'

const initialState = {
    astromallCategoryData: null,
    astromallProductData: null,
    customerAstromallCartData: {}
}

const astromallReducer = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_ASTRO_MALL_CATEGORY:
            return { ...state, astromallCategoryData: payload };

        case actionTypes.SET_ASTRO_MALL_PRODUCT:
            return { ...state, astromallProductData: payload };

        case actionTypes.SET_CUSTOMER_ASTRO_MALL_CART:
            return { ...state, customerAstromallCartData: payload };

        default:
            return state;
    }
}

export default astromallReducer;