import * as actionTypes from "../action-types";

const initialState = {
    customerLoginInputFieldDetail: { phone_number: '', country_code_length: '' },
    isCustomerLoginModalOpen: false,
    isAstrologerLoginModalOpen: false,
};

const authReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.CUSTOMER_LOGIN_INPUT_FIELD:
            return { ...state, customerLoginInputFieldDetail: payload };

        case actionTypes.IS_CUSTOMER_LOGIN_MODAL_OPEN:
            return { ...state, isCustomerLoginModalOpen: payload };

        case actionTypes.IS_ASTROLOGER_LOGIN_MODAL_OPEN:
            return { ...state, isAstrologerLoginModalOpen: payload };

        default:
            return state;
    }
};

export default authReducer;