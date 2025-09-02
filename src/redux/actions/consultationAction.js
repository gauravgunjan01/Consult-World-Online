import * as actionTypes from "../action-types";

//! Consultation Request
export const getLinkedProfileForConsultation = payload => ({ type: actionTypes.GET_LINKED_PROFILE_FOR_CONSULTATION, payload });
export const setLinkedProfileForConsultation = payload => ({ type: actionTypes.SET_LINKED_PROFILE_FOR_CONSULTATION, payload });

export const initiateRequest = payload => ({ type: actionTypes?.INITIATE_REQUEST, payload });
export const initiatedRequestData = payload => ({ type: actionTypes?.INITIATED_REQUEST_DATA, payload });
export const incomingRequestData = payload => ({ type: actionTypes?.INCOMING_REQUEST_DATA, payload });
export const handleIncomingRequestByConsultant = payload => ({ type: actionTypes?.HANDLE_INCOMING_REQUEST_BY_CONSULTANT, payload });

export const currentRequestData = payload => ({ type: actionTypes.CURRENT_REQUEST_DATA, payload });
export const currentRequestTimerCountDown = payload => ({ type: actionTypes.CURRENT_REQUEST_TIMER_COUNTDOWN, payload });
export const endCurrentRequest = payload => ({ type: actionTypes.END_CURRENT_REQUEST, payload });
export const closeCurrentRequest = payload => ({ type: actionTypes.CLOSE_CURRENT_REQUEST, payload });

//! Rating
export const getAstrologerRatingVisibility = payload => ({ type: actionTypes.GET_ASTROLOGER_RATING_VISIBILITY, payload });
export const setAstrologerRatingVisibility = payload => ({ type: actionTypes.SET_ASTROLOGER_RATING_VISIBILITY, payload });

//! Chat
export const chatRequestSendByCustomer = payload => ({ type: actionTypes.CHAT_REQUEST_SEND_BY_CUSTOMER, payload });
export const chatRequestAcceptRejectByAstrologer = payload => ({ type: actionTypes.CHAT_REQUEST_ACCEPT_REJECT_BY_ASTROLOGER, payload });
export const chatRequestAcceptRejectByCustomer = payload => ({ type: actionTypes.CHAT_REQUEST_ACCEPT_REJECT_BY_CUSTOMER, payload });
export const endChatMessage = payload => ({ type: actionTypes.END_CHAT_MESSAGE, payload });
export const closeChatMessage = payload => ({ type: actionTypes.CLOSE_CHAT_MESSAGE, payload });
export const hideChatMessageInputField = payload => ({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload });
export const suggestRemediesDuringChat = payload => ({ type: actionTypes.SUGGEST_REMEDIES_DURING_CHAT, payload });

//* Rest
export const sendChatMessage = payload => ({ type: actionTypes.SEND_CHAT_MESSAGE, payload });
export const getChatMessage = payload => ({ type: actionTypes.GET_CHAT_MESSAGE, payload });
export const setChatMessage = payload => ({ type: actionTypes.SET_CHAT_MESSAGE, payload });

//* Chat Invoice
export const getChatInvoiceData = payload => ({ type: actionTypes.GET_CHAT_INVOICE_DATA, payload });
export const setChatInvoiceData = payload => ({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload });
export const getChatInvoiceVisibility = payload => ({ type: actionTypes.GET_CHAT_INVOICE_VISIBILITY, payload });
export const setChatInvoiceVisibility = payload => ({ type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload });
export const getAstrologerChatInvoiceVisibility = payload => ({ type: actionTypes.GET_ASTROLOGER_CHAT_INVOICE_VISIBILITY, payload });
export const setAstrologerChatInvoiceVisibility = payload => ({ type: actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY, payload });

//* Videocall Invoice
export const getVideocallInvoiceData = payload => ({ type: actionTypes.GET_VIDEO_CALL_INVOICE_DATA, payload });
export const setVideocallInvoiceData = payload => ({ type: actionTypes.SET_VIDEO_CALL_INVOICE_DATA, payload });
export const getVideocallInvoiceVisibility = payload => ({ type: actionTypes.GET_VIDEO_CALL_INVOICE_VISIBILITY, payload });
export const setVideocallInvoiceVisibility = payload => ({ type: actionTypes.SET_VIDEO_CALL_INVOICE_VISIBILITY, payload });
export const getAstrologerVideocallInvoiceVisibility = payload => ({ type: actionTypes.GET_ASTROLOGER_VIDEO_CALL_INVOICE_VISIBILITY, payload });
export const setAstrologerVideocallInvoiceVisibility = payload => ({ type: actionTypes.SET_ASTROLOGER_VIDEO_CALL_INVOICE_VISIBILITY, payload });

//! Call
export const callIntakeDetailData = payload => ({ type: actionTypes.CALL_INTAKE_DETAIL_DATA, payload });

//* Call Invoice
export const getCallInvoiceData = payload => ({ type: actionTypes.GET_CALL_INVOICE_DATA, payload });
export const setCallInvoiceData = payload => ({ type: actionTypes.SET_CALL_INVOICE_DATA, payload });
export const getCallInvoiceVisibility = payload => ({ type: actionTypes.GET_CALL_INVOICE_VISIBILITY, payload });
export const setCallInvoiceVisibility = payload => ({ type: actionTypes.SET_CALL_INVOICE_VISIBILITY, payload });