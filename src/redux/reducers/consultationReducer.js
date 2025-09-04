import * as actionTypes from "../action-types";

const initialState = {
    //! Consultation Request
    linkedConsultationProfileDetails: null,

    initiatedRequestData: { initiated: Boolean(localStorage.getItem('requestInitiated')), timer: 60, astrologer_data: null, data: null },
    incomingRequestData: { incoming: Boolean(localStorage.getItem('requestIncoming')), timer: 60, customer_data: null, data: null },
    currentRequestData: null,
    currentRequestTimerCountDown: 0,

    isConsultationRatingVisible: false,

    consultationInvoiceDataForCustomer: null,
    isInvoiceVisibleForCustomer: false,

    consultationInvoiceDataForAstrologer: null,
    isInvoiceVisibleForAstrologer: false,

    
    // //* Chat
    // chatInvoiceData: {},
    // chatInvoiceVisibility: false,
    // astrologerChatInvoiceVisibility: false,
    // hideChatMessageInputField: false,

    // //* Videocall
    // videocallInvoiceData: {},
    // videocallInvoiceVisibility: false,
    // astrologerVideocallInvoiceVisibility: false,

    // //* Call 
    // callIntakeDetailData: { visible: false, profileId: null },
    // callInvoiceData: {},
    // callInvoiceVisibility: false,
    // //* Rating 
    // astrologerRatingVisibility: { data: null, ratingVisible: false, type: null, serviceId: null },
};

const consultationReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        //! Consultation Request
        case actionTypes.SET_LINKED_CONSULTATION_PROFILE:
            return { ...state, linkedConsultationProfileDetails: payload }
        case actionTypes.INITIATED_REQUEST_DATA:
            return { ...state, initiatedRequestData: payload }
        case actionTypes.INCOMING_REQUEST_DATA:
            return { ...state, incomingRequestData: payload }
        case actionTypes.CURRENT_REQUEST_DATA:
            return { ...state, currentRequestData: payload }
        case actionTypes.CURRENT_REQUEST_TIMER_COUNTDOWN:
            return { ...state, currentRequestTimerCountDown: payload }




        // //! Chat
        // case actionTypes.SET_CHAT_INVOICE_DATA:
        //     return { ...state, chatInvoiceData: payload }
        // case actionTypes.SET_CHAT_INVOICE_VISIBILITY:
        //     return { ...state, chatInvoiceVisibility: payload }
        // case actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY:
        //     return { ...state, astrologerChatInvoiceVisibility: payload }
        // case actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD:
        //     return { ...state, hideChatMessageInputField: payload }

        // //! Videocall
        // case actionTypes.SET_VIDEO_CALL_INVOICE_DATA:
        //     return { ...state, videocallInvoiceData: payload }
        // case actionTypes.SET_VIDEO_CALL_INVOICE_VISIBILITY:
        //     return { ...state, videocallInvoiceVisibility: payload }
        // case actionTypes.SET_ASTROLOGER_VIDEO_CALL_INVOICE_VISIBILITY:
        //     return { ...state, astrologerVideocallInvoiceVisibility: payload }

        // //! Call
        // case actionTypes.CALL_INTAKE_DETAIL_DATA:
        //     return { ...state, callIntakeDetailData: payload }
        // case actionTypes.SET_CALL_INVOICE_DATA:
        //     return { ...state, callInvoiceData: payload }
        // case actionTypes.SET_CALL_INVOICE_VISIBILITY:
        //     return { ...state, callInvoiceVisibility: payload }
        // case actionTypes.SET_ASTROLOGER_RATING_VISIBILITY:
        //     return { ...state, astrologerRatingVisibility: payload }

        default:
            return state;
    }
};

export default consultationReducer;