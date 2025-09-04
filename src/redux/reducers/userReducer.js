import * as actionTypes from "../action-types";

const initialState = {
    //! Customer 
    userCustomerDetails: null,
    useCustomerCompletedQueueListData: null,
    userCustomerWalletHistoryData: [],
    userCustomerTransactionHistoryData: [],
    userCustomerOrderHistoryData: [],
    userCustomerPujaBookHistoryData: [],
    userCustomerAstromallHistoryData: [],
    userCustomerAddressData: [],
    //! Astrologer 
    userAstrologerDetails: null,
    userAstrologerPendingQueueListData: null,
    userAstrologerCompletedQueueListData: null,
    userAstrologerWalletHistoryData: [],
    userAstrologerTransactionHistoryData: [],
    userAstrologerRegisteredPujaHistoryData: [],
    userAstrologerAssignedPujaHistoryData: [],
    userAstrologerBookedPujaHistoryData: [],

    //! Predefined Message
    userQueuePredefinedMessageData: []
};

const userReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        //! Customer 
        case actionTypes.SET_USER_CUSTOMER_DETAILS:
            return { ...state, userCustomerDetails: payload };

        case actionTypes.SET_USER_CUSTOMER_COMPLETED_QUEUE_LIST:
            return { ...state, userCustomerCompletedQueueListData: payload };

        case actionTypes.SET_USER_CUSTOMER_WALLET_HISTORY:
            return { ...state, userCustomerWalletHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_TRANSACTION_HISTORY:
            return { ...state, userCustomerTransactionHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_ORDER_HISTORY:
            return { ...state, userCustomerOrderHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_PUJA_BOOK_HISTORY:
            return { ...state, userCustomerPujaBookHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_ASTRO_MALL_HISTORY:
            return { ...state, userCustomerAstromallHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_ADDRESS:
            return { ...state, userCustomerAddressData: payload };

        //! Astrologer 
        case actionTypes.SET_USER_ASTROLOGER_DETAILS:
            return { ...state, userAstrologerDetails: payload };

        case actionTypes.SET_USER_ASTROLOGER_PENDING_QUEUE_LIST:
            return { ...state, userAstrologerPendingQueueListData: payload };

        case actionTypes.SET_USER_ASTROLOGER_COMPLETED_QUEUE_LIST:
            return { ...state, userAstrologerCompletedQueueListData: payload };

        case actionTypes.SET_USER_ASTROLOGER_WALLET_HISTORY:
            return { ...state, userAstrologerWalletHistoryData: payload };

        case actionTypes.SET_USER_ASTROLOGER_TRANSACTION_HISTORY:
            return { ...state, userAstrologerTransactionHistoryData: payload };

        case actionTypes.SET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY:
            return { ...state, userAstrologerRegisteredPujaHistoryData: payload };

        case actionTypes.SET_USER_ASTROLOGER_ASSIGNED_PUJA_HISTORY:
            return { ...state, userAstrologerAssignedPujaHistoryData: payload };

        case actionTypes.SET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY:
            return { ...state, userAstrologerBookedPujaHistoryData: payload };

        //! Predefined Message
        case actionTypes.SET_USER_QUEUE_PREDEFINED_MESSAGE:
            return { ...state, userQueuePredefinedMessageData: payload };

        default:
            return state;
    }
};

export default userReducer;