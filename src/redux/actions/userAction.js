import * as actionTypes from "../action-types";


export const enquiryPremiumService = payload => ({ type: actionTypes.ENQUIRY_PREMIUM_SERVICE, payload });

//! Customer 
export const getUserCustomerById = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload
});

export const setUserCustomerById = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_BY_ID, payload
});

export const rechargeUserCustomerWallet = payload => ({
    type: actionTypes.RECHARGE_USER_CUSTOMER_WALLET, payload
});

export const getUserCustomerCompletedQueueList = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_COMPLETED_QUEUE_LIST, payload
});

export const setUserCustomerCompletedQueueList = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_COMPLETED_QUEUE_LIST, payload
});

export const updateUserCustomerCompletedQueueListReadStatus = payload => ({
    type: actionTypes.UPDATE_USER_CUSTOMER_COMPLETED_QUEUE_LIST_READ_STATUS, payload
});

export const getUserCustomerWalletHistory = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_WALLET_HISTORY, payload
});

export const setUserCustomerWalletHistory = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_WALLET_HISTORY, payload
});

export const getUserCustomerTransactionHistory = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_TRANSACTION_HISTORY, payload
});

export const setUserCustomerTransactionHistory = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_TRANSACTION_HISTORY, payload
});

export const getUserCustomerOrderHistory = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_ORDER_HISTORY, payload
});

export const setUserCustomerOrderHistory = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_ORDER_HISTORY, payload
});

export const getUserCustomerPujaBookHistory = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_PUJA_BOOK_HISTORY, payload
});

export const setUserCustomerPujaBookHistory = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_PUJA_BOOK_HISTORY, payload
});

export const getUserCustomerAstromallHistory = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_ASTRO_MALL_HISTORY, payload
});

export const setUserCustomerAstromallHistory = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_ASTRO_MALL_HISTORY, payload
});

export const getUserCustomerAddress = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_ADDRESS, payload
});

export const setUserCustomerAddress = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_ADDRESS, payload
});

export const createUserCustomerAddress = payload => ({
    type: actionTypes.CREATE_USER_CUSTOMER_ADDRESS, payload
});

export const updateUserCustomerAddress = payload => ({
    type: actionTypes.UPDATE_USER_CUSTOMER_ADDRESS, payload
});

export const deleteUserCustomerAddress = payload => ({
    type: actionTypes.DELETE_USER_CUSTOMER_ADDRESS, payload
});

//! Astrologer
export const getUserAstrologerById = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload
});

export const setUserAstrologerById = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_BY_ID, payload
});

export const changeUserAstrologerChatStatus = payload => ({
    type: actionTypes.CHANGE_USER_ASTROLOGER_CHAT_STATUS, payload
});

export const changeUserAstrologerCallStatus = payload => ({
    type: actionTypes.CHANGE_USER_ASTROLOGER_CALL_STATUS, payload
});

export const changeUserAstrologerVideoCallStatus = payload => ({
    type: actionTypes.CHANGE_USER_ASTROLOGER_VIDEO_CALL_STATUS, payload
});

export const userAstrologerWithdrawalRequest = payload => ({
    type: actionTypes.USER_ASTROLOGER_WITHDRAWAL_REQUEST, payload
});

export const getUserAstrologerPendingQueueList = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_PENDING_QUEUE_LIST, payload
});

export const setUserAstrologerPendingQueueList = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_PENDING_QUEUE_LIST, payload
});

export const getUserAstrologerCompletedQueueList = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_COMPLETED_QUEUE_LIST, payload
});

export const setUserAstrologerCompletedQueueList = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_COMPLETED_QUEUE_LIST, payload
});

export const updateUserAstrologerPendingQueueListStatus = payload => ({
    type: actionTypes.UPDATE_USER_ASTROLOGER_PENDING_QUEUE_LIST_STATUS, payload
});

export const getUserAstrologerWalletHistory = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_WALLET_HISTORY, payload
});

export const setUserAstrologerWalletHistory = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_WALLET_HISTORY, payload
});

export const getUserAstrologerTransactionHistory = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_TRANSACTION_HISTORY, payload
});

export const setUserAstrologerTransactionHistory = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_TRANSACTION_HISTORY, payload
});

export const getUserAstrologerRegisteredPujaHistory = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY, payload
});

export const setUserAstrologerRegisteredPujaHistory = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY, payload
});

export const getUserAstrologerAssignedPujaHistory = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_ASSIGNED_PUJA_HISTORY, payload
});

export const setUserAstrologerAssignedPujaHistory = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_ASSIGNED_PUJA_HISTORY, payload
});

export const getUserAstrologerBookedPujaHistory = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY, payload
});

export const setUserAstrologerBookedPujaHistory = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY, payload
});

export const completeBookedPujaHistory = payload => ({
    type: actionTypes.COMPLETE_BOOKED_PUJA_HISTORY, payload
});

//! Predefined Message
export const getUserQueuePredefinedMessage = payload => ({
    type: actionTypes.GET_USER_QUEUE_PREDEFINED_MESSAGE, payload
});

export const setUserQueuePredefinedMessage = payload => ({
    type: actionTypes.SET_USER_QUEUE_PREDEFINED_MESSAGE, payload
});