import * as actionTypes from '../action-types'

const initialState = {
    suggestedPujaData: [],
    pujaData: [],
    cartData: {},
}

const ecommerceReducer = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_PUJA:
            return { ...state, pujaData: payload };

        case actionTypes.SET_SUGGESTED_PUJA:
            return { ...state, suggestedPujaData: payload };

        case actionTypes.SET_CART_DATA:
            return { ...state, cartData: payload };

        default:
            return state;
    }
}

export default ecommerceReducer;