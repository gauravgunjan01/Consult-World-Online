import axios from 'axios';
import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { api_urls } from '../../utils/api-urls';
import SocketService from '../../utils/services/socket-service';
import { postAPI } from '../../utils/api-function';
import { accept_video_call, create_profile_for_chat, get_linked_profile_for_consultation, initiate_chat_message, initiate_video_call, reject_video_call } from '../../utils/api-routes';
import { toaster } from '../../utils/services/toast-service';
import { database, ref, push, serverTimestamp, set } from '../../config/firebase-config';
import { Color } from '../../assets/colors';

// TODO : Consultation Request
function* getLinkedProfileForConsultation(action) {
    try {
        const { payload } = action;
        console.log("Get Linked Profile For Chat Payload ::: ", payload);

        const { data } = yield postAPI(get_linked_profile_for_consultation, payload);
        console.log("Get Linked Profile For Chat Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_LINKED_PROFILE_FOR_CONSULTATION, payload: data?.data });
        }

    } catch (error) {
        console.log("Get Linked Profile For Chat Saga Error ::: ", error);
    }
};

function* initiateRequest(action) {
    try {
        const { payload } = action;
        console.log("chatRequestSendByCustomer Payload ::: ", payload);

        console.log('isNewProfile', payload?.isNewProfile);
        let profileId = payload?.selectedProfileId;

        if (payload?.isNewProfile) {
            const register_response = yield axios.post(api_urls + create_profile_for_chat, { ...payload?.profileData, customerId: localStorage.getItem('current_user_id') })

            console.log('register_response', register_response?.data)
            if (register_response?.data?.success) {
                profileId = register_response?.data?.data;
                console.log('register_response?.data?.data', register_response?.data?.data)
            }
        }
        console.log('profileId', profileId);

        switch (payload?.type) {
            case 'chat':
                const send_request = yield axios.post(api_urls + initiate_chat_message, { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId, chatPrice: payload?.chatPrice, })
                console.log('send_request', send_request?.data)

                if (send_request?.data?.success) {
                    toaster.success({ text: "Chat request send successfully." });
                    SocketService.emit('createChatRoom', {
                        roomID: send_request?.data?.newChat?._id,
                        chatPrice: send_request?.data?.newChat?.chatPrice,
                        customerID: send_request?.data?.newChat?.customerId,
                        astroID: send_request?.data?.newChat?.astrologerId,
                        duration: send_request?.data?.duration,
                        newUser: false,
                        profileId: profileId
                    });
                    localStorage.setItem('Chat_price_during_chat', send_request?.data?.newChat?.chatPrice);
                    SocketService.emit('joinChatRoom', send_request?.data?.newChat?._id);

                    yield put({ type: actionTypes.REQUEST_INITIATED_BY_CUSTOMER, payload: { initiated: true, timer: 60, astrologerData: { name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: payload?.chatPrice, type: 'Chat' } } });
                    localStorage?.setItem('requestInitiatedByCustomerTimer', 60);
                    localStorage?.setItem('requestInitiatedByCustomerInitiated', true);
                    localStorage?.setItem('requestInitiatedByCustomerData', JSON.stringify({ name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: payload?.chatPrice, type: 'Chat' }));

                } else {
                    toaster.error({ text: send_request?.data?.message });
                }
                yield call(payload?.onComplete);
                return;

            case 'voice-call':
                const { data: send_voice_call_request } = yield axios.post(api_urls + 'api/customers/initiate_call_with_exotel', { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId })
                console.log('send_voice_call_request', send_voice_call_request);

                if (send_voice_call_request?.success) {
                    toaster.success({ text: "Call request send successfully." });
                } else {
                    toaster.info({ text: send_voice_call_request?.message });
                }
                yield call(payload?.onComplete);
                return;

            case 'video-call':
                const { data: send_video_call_request } = yield axios.post(api_urls + initiate_video_call, { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId })
                console.log('send_video_call_request', send_video_call_request);

                if (send_video_call_request?.success) {
                    toaster.success({ text: "Video call request send successfully." });
                    SocketService.emit('createVideoCallRoom', {
                        roomID: send_video_call_request?.data?.callId,
                        videoCallPrice: Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice),
                        customerID: send_video_call_request?.data?.customerId,
                        astroID: send_video_call_request?.data?.astrologerId,
                        duration: send_video_call_request?.data?.talkTimeInMinutes,
                        profileId: send_video_call_request?.data?.formId || profileId,
                        newUser: false
                    });
                    SocketService.emit('joinVideoCallRoom', send_video_call_request?.data?.callId);

                    localStorage?.setItem('requestInitiated', true);
                    localStorage?.setItem('initiatedRequestTimer', 60);
                    localStorage?.setItem('initiatedRequestPrice', Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice));
                    localStorage?.setItem('initiatedRequestAstrologerData', JSON.stringify({ name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice), type: 'Video call' }));
                    yield put({ type: actionTypes.INITIATED_REQUEST_DATA, payload: { initiated: true, timer: 60, astrologer_data: { name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice), type: 'Video call' } } });

                } else {
                    toaster.error({ text: send_video_call_request?.message });
                }
                yield call(payload?.onComplete);
                return;

            default:
                toaster.warning({ text: 'Invalid consutlation request.' })
                return;
        };

    } catch (error) {
        toaster.error({ text: 'Failed to send request.' });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Chat Request Send By Customer Saga Error ::: ", error);
    }
};

function* handleIncomingRequestByConsultant(action) {
    try {
        const { payload } = action;
        console.log("Handle Incoming Request By Consultant Payload ::: ", payload);

        switch (payload?.type) {
            case 'chat':
                console.log("Handle Incoming Request By Consultant Chat!!!");

                if (payload?.data?.status == 'Accept') {
                    console.log("Accept");

                    yield postAPI('api/customers/accept_chat', { chatId: payload?.data?.requestedData?.chatId, type: 'astrologer' });

                    //! Storing Message Start
                    const chat_id = `customer_${payload?.data?.requestedData?.customer_id}_astro_${payload?.data?.requestedData?.astrologer_id}`;

                    const { data } = yield postAPI('api/customers/get_linked_profile', { profileId: payload?.data?.requestedData?.profileId });

                    if (data?.success) {
                        const { firstName, lastName, dateOfBirth, timeOfBirth, placeOfBirth, maritalStatus, gender, topic_of_concern, description } = data?.data;

                        const message_customer = {
                            _id: Math.random().toString(36).substr(2, 9),
                            text: `Hi, 
                    Below are my details:
                    Name: ${firstName + ' ' + lastName}
                    Gender: ${gender}
                    DOB: ${dateOfBirth}
                    Time: ${timeOfBirth}
                    Address: ${placeOfBirth}
                    Marital Status: ${maritalStatus}
                    Topic of Concern: ${topic_of_concern}
                    Description: ${description}
                    `,
                            user: {
                                _id: 'customer_' + payload?.data?.requestedData?.customer_id,
                                name: payload?.data?.requestedData?.customerName,
                                image: api_urls + 'uploads/' + payload?.data?.requestedData?.customerImage
                            },
                            createdAt: new Date().getTime(),
                            addedAt: serverTimestamp(),
                        };

                        console.log("Welcome Message Data In Notification ::: ", message_customer);

                        const chatNodeCustomer = push(ref(database, `ChatMessages/${chat_id}`));
                        const newKeyCustomer = chatNodeCustomer.key;
                        const chatRefCustomer = ref(database, `ChatMessages/${chat_id}/${newKeyCustomer}`);
                        yield set(chatRefCustomer, { ...message_customer, pending: false, sent: true, received: false });
                    }

                    const message = {
                        _id: Math.random().toString(36).substr(2, 9),
                        text: payload?.data?.requestedData?.welcome_message,
                        user: {
                            _id: 'astro_' + payload?.data?.requestedData?.astrologer_id,
                            name: payload?.data?.requestedData?.astrologerName,
                            image: api_urls + payload?.data?.requestedData?.astrologerImage
                        },
                        createdAt: new Date().getTime(),
                        addedAt: serverTimestamp(),
                    };

                    console.log("Welcome Message Data In Notification ::: ", message);

                    const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
                    const newKey = chatNode.key;
                    const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
                    yield set(chatRef, { ...message, pending: false, sent: true, received: false });
                    //! Storing Message End

                    localStorage.setItem('chatId', payload?.data?.requestedData?.chatId);
                    SocketService.emit('onAstroAccept', payload?.data?.requestedData?.chatId);
                    SocketService.emit('joinChatRoom', payload?.data?.requestedData?.chatId);
                    yield call(payload?.onComplete);
                    yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: false });
                    yield put({ type: actionTypes.REJECT_CHAT_BY_ASTROLOGER, payload: { rejected: false, timer: 60 } });
                    return;
                }
                if (payload?.data?.status == 'Missed') {
                    const data = { roomID: payload?.data?.requestedData?.chatId, actionBy: 'astro' };
                    yield call(payload?.onMissed);
                    yield postAPI('api/customers/reject_chat', { chatId: payload?.data?.requestedData?.chatId, type: 'astrologer' });
                    SocketService.emit('missedChat', data);
                }
                else {
                    const data = { roomID: payload?.data?.requestedData?.chatId, actionBy: 'astro' };
                    yield call(payload?.onReject);
                    yield postAPI('api/customers/reject_chat', { chatId: payload?.data?.requestedData?.chatId, type: 'astrologer' });
                    SocketService.emit('declinedChat', data);
                }
                return;

            case 'video-call':
                console.log("Handle Incoming Request By Consultant Video Call!!!");

                if (payload?.data?.status == 'Accept') {
                    yield postAPI(accept_video_call, { callId: payload?.data?.requested_data?.invoiceId, type: 'astrologer' });
                    localStorage.setItem('roomId', payload?.data?.requested_data?.invoiceId);
                    SocketService.emit('onVideoCallAstroAccept', payload?.data?.requested_data?.invoiceId);
                    SocketService.emit('joinVideoCallRoom', payload?.data?.requested_data?.invoiceId);
                    yield call(payload?.onComplete);
                    return;
                }
                if (payload?.data?.status == 'Missed') {
                    const data = { roomID: payload?.data?.requested_data?.invoiceId, actionBy: 'astro' };
                    SocketService.emit('declinedVideoCall', data);
                    yield call(payload?.onMissed);
                    yield postAPI(reject_video_call, { callId: payload?.data?.requested_data?.invoiceId, type: 'astrologer' });
                }
                else {
                    const data = { roomID: payload?.data?.requested_data?.invoiceId, actionBy: 'astro' };
                    SocketService.emit('declinedVideoCall', data);
                    yield call(payload?.onReject);
                    yield postAPI(reject_video_call, { callId: payload?.data?.requested_data?.invoiceId, type: 'astrologer' });
                }
                return;

            case 'voice-call':
                console.log("Handle Incoming Request By Consultant Voice Call!!!");

                return;

            default:
                return;
        }
    } catch (error) {
        console.log("Handle Incoming Request By Consultant Saga Error ::: ", error?.response?.data);
    }
};

function* endCurrentRequest(action) {
    try {
        const { payload } = action;
        console.log('End Current Request Payload ::: ', payload);
        console.log("End Current Request Saga Run!!!");

        switch (payload?.type) {
            case 'chat':
                SocketService.emit('endChat', { roomID: payload?.chatId });
                yield put({ type: actionTypes.CLOSE_CHAT_MESSAGE, payload: null });  //* Let check to remove this.
                return;

            case 'video-call':
                SocketService.emit('endVideoCall', { roomID: payload?.roomId });
                return;

            case 'voice-call':
                SocketService.emit('endVoiceCall', { roomID: payload?.roomId });
                return;

            default:
                return;
        }
    } catch (error) {
        console.log('End Current Request Payload ::: ', error?.response?.data);
    }
};

function* closeCurrentRequest(action) {
    try {
        const { payload } = action;
        console.log('Close Current Request Payload ::: ', payload);
        console.log("Close Current Request Saga Run!!!");

        if (!payload) return;
        switch (payload?.type) {
            case 'chat':
                console.log("Close Current Request Saga Run For Chat!!!");
                const user_type = localStorage.getItem('user_type');
                console.log("User Type ::: ", user_type);

                console.log("On Complete Run");
                localStorage.removeItem('chatId');
                yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: true });

                const close_chat_reponse = yield axios.post(api_urls + 'api/customers/get_chat_details', { chatId: payload?.chatId });
                console.log('close_chat_reponse', close_chat_reponse);

                if (close_chat_reponse?.data?.success) {
                    yield put({ type: actionTypes.CURRENT_REQUEST_TIMER_COUNTDOWN, payload: 0 });
                    yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: { ...close_chat_reponse?.data?.chatHistory, serviceId: payload?.chatId } });

                    if (user_type == 'customer') {
                        yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload: true });
                        yield put({ type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload: { customerId: localStorage.getItem('current_user_id') } });
                    }
                    if (user_type == 'astrologer') {
                        yield put({ type: actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY, payload: true });
                        console.log("Invoice Open Astrolgoer !!!")
                    }
                }
                return;

            case 'video-call':
                console.log("Close Current Request Saga Run For Video Call!!!");

                return;

            case 'voice-call':
                console.log("Close Current Request Saga Run For Voice Call!!!");

                return;

            default:
                return;
        }
    } catch (error) {
        console.log('Close Current Request Payload ::: ', error?.response?.data);
    }
};

//! Chat 
function* chatRequestSendByCustomer(action) {
    try {
        const { payload } = action;
        console.log("chatRequestSendByCustomer Payload ::: ", payload);

        console.log('isNewProfile', payload?.isNewProfile);
        let profileId = payload?.selectedProfileId;

        if (payload?.isNewProfile) {
            const register_response = yield axios.post(api_urls + create_profile_for_chat, { ...payload?.profileData, customerId: localStorage.getItem('current_user_id') })

            console.log('register_response', register_response?.data)
            if (register_response?.data?.success) {
                profileId = register_response?.data?.data;
                console.log('register_response?.data?.data', register_response?.data?.data)
            }
        }
        console.log('profileId', profileId);

        switch (payload?.type) {
            case 'chat':
                const send_request = yield axios.post(api_urls + initiate_chat_message, { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId, chatPrice: payload?.chatPrice, })
                console.log('send_request', send_request?.data)

                if (send_request?.data?.success) {
                    toaster.success({ text: "Chat request send successfully." });
                    SocketService.emit('createChatRoom', {
                        roomID: send_request?.data?.newChat?._id,
                        chatPrice: send_request?.data?.newChat?.chatPrice,
                        customerID: send_request?.data?.newChat?.customerId,
                        astroID: send_request?.data?.newChat?.astrologerId,
                        duration: send_request?.data?.duration,
                        newUser: false,
                        profileId: profileId
                    });
                    localStorage.setItem('Chat_price_during_chat', send_request?.data?.newChat?.chatPrice);
                    SocketService.emit('joinChatRoom', send_request?.data?.newChat?._id);

                    yield put({ type: actionTypes.REQUEST_INITIATED_BY_CUSTOMER, payload: { initiated: true, timer: 60, astrologerData: { name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: payload?.chatPrice, type: 'Chat' } } });
                    localStorage?.setItem('requestInitiatedByCustomerTimer', 60);
                    localStorage?.setItem('requestInitiatedByCustomerInitiated', true);
                    localStorage?.setItem('requestInitiatedByCustomerData', JSON.stringify({ name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: payload?.chatPrice, type: 'Chat' }));

                } else {
                    toaster.error({ text: send_request?.data?.message });
                }
                yield call(payload?.onComplete);
                return;

            case 'voice-call':
                const { data: send_voice_call_request } = yield axios.post(api_urls + 'api/customers/initiate_call_with_exotel', { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId })
                console.log('send_voice_call_request', send_voice_call_request);

                if (send_voice_call_request?.success) {
                    toaster.success({ text: "Call request send successfully." });
                } else {
                    toaster.info({ text: send_voice_call_request?.message });
                }
                yield call(payload?.onComplete);
                return;

            case 'video-call':
                const { data: send_video_call_request } = yield axios.post(api_urls + initiate_video_call, { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId })
                console.log('send_video_call_request', send_video_call_request);

                if (send_video_call_request?.success) {
                    toaster.success({ text: "Video call request send successfully." });
                    SocketService.emit('createVideoCallRoom', {
                        roomID: send_video_call_request?.data?.callId,
                        videoCallPrice: Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice),
                        customerID: send_video_call_request?.data?.customerId,
                        astroID: send_video_call_request?.data?.astrologerId,
                        duration: send_video_call_request?.data?.talkTimeInMinutes,
                        profileId: send_video_call_request?.data?.formId || profileId,
                        newUser: false
                    });
                    SocketService.emit('joinVideoCallRoom', send_video_call_request?.data?.callId);

                    localStorage?.setItem('requestInitiated', true);
                    localStorage?.setItem('initiatedRequestTimer', 60);
                    localStorage?.setItem('initiatedRequestPrice', Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice));
                    localStorage?.setItem('initiatedRequestAstrologerData', JSON.stringify({ name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice), type: 'Video call' }));
                    yield put({ type: actionTypes.INITIATED_REQUEST_DATA, payload: { initiated: true, timer: 60, astrologer_data: { name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: Number(send_video_call_request?.data?.videcallPrice) + Number(send_video_call_request?.data?.videocommissionPrice), type: 'Video call' } } });

                } else {
                    toaster.error({ text: send_video_call_request?.message });
                }
                yield call(payload?.onComplete);
                return;

            default:
                toaster.warning({ text: 'Invalid consutlation request.' })
                return;
        };

    } catch (error) {
        toaster.error({ text: 'Failed to send request.' });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Chat Request Send By Customer Saga Error ::: ", error);
    }
};

function* chatRequestAcceptRejectByAstrologer(action) {
    try {
        const { payload } = action;
        console.log("chatRequestAcceptRejectByAstrologer Payload ::: ", payload);

        if (payload?.data?.status == 'Accept') {
            console.log("Accept");

            yield postAPI('api/customers/accept_chat', { chatId: payload?.data?.requestedData?.chatId, type: 'astrologer' });

            //! Storing Message Start
            const chat_id = `customer_${payload?.data?.requestedData?.customer_id}_astro_${payload?.data?.requestedData?.astrologer_id}`;

            const { data } = yield postAPI('api/customers/get_linked_profile', { profileId: payload?.data?.requestedData?.profileId });

            if (data?.success) {
                const { firstName, lastName, dateOfBirth, timeOfBirth, placeOfBirth, maritalStatus, gender, topic_of_concern, description } = data?.data;

                const message_customer = {
                    _id: Math.random().toString(36).substr(2, 9),
                    text: `Hi, 
                    Below are my details:
                    Name: ${firstName + ' ' + lastName}
                    Gender: ${gender}
                    DOB: ${dateOfBirth}
                    Time: ${timeOfBirth}
                    Address: ${placeOfBirth}
                    Marital Status: ${maritalStatus}
                    Topic of Concern: ${topic_of_concern}
                    Description: ${description}
                    `,
                    user: {
                        _id: 'customer_' + payload?.data?.requestedData?.customer_id,
                        name: payload?.data?.requestedData?.customerName,
                        image: api_urls + 'uploads/' + payload?.data?.requestedData?.customerImage
                    },
                    createdAt: new Date().getTime(),
                    addedAt: serverTimestamp(),
                };

                console.log("Welcome Message Data In Notification ::: ", message_customer);

                const chatNodeCustomer = push(ref(database, `ChatMessages/${chat_id}`));
                const newKeyCustomer = chatNodeCustomer.key;
                const chatRefCustomer = ref(database, `ChatMessages/${chat_id}/${newKeyCustomer}`);
                yield set(chatRefCustomer, { ...message_customer, pending: false, sent: true, received: false });
            }

            const message = {
                _id: Math.random().toString(36).substr(2, 9),
                text: payload?.data?.requestedData?.welcome_message,
                user: {
                    _id: 'astro_' + payload?.data?.requestedData?.astrologer_id,
                    name: payload?.data?.requestedData?.astrologerName,
                    image: api_urls + payload?.data?.requestedData?.astrologerImage
                },
                createdAt: new Date().getTime(),
                addedAt: serverTimestamp(),
            };

            console.log("Welcome Message Data In Notification ::: ", message);

            const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
            const newKey = chatNode.key;
            const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
            yield set(chatRef, { ...message, pending: false, sent: true, received: false });
            //! Storing Message End

            localStorage.setItem('chatId', payload?.data?.requestedData?.chatId);
            SocketService.emit('onAstroAccept', payload?.data?.requestedData?.chatId);
            SocketService.emit('joinChatRoom', payload?.data?.requestedData?.chatId);
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: false });
            yield put({ type: actionTypes.REJECT_CHAT_BY_ASTROLOGER, payload: { rejected: false, timer: 60 } });
            return;
        }
        if (payload?.data?.status == 'Missed') {
            const data = { roomID: payload?.data?.requestedData?.chatId, actionBy: 'astro' };
            yield call(payload?.onMissed);
            yield postAPI('api/customers/reject_chat', { chatId: payload?.data?.requestedData?.chatId, type: 'astrologer' });
            SocketService.emit('missedChat', data);
        }
        else {
            const data = { roomID: payload?.data?.requestedData?.chatId, actionBy: 'astro' };
            yield call(payload?.onReject);
            yield postAPI('api/customers/reject_chat', { chatId: payload?.data?.requestedData?.chatId, type: 'astrologer' });
            SocketService.emit('declinedChat', data);
        }
    } catch (error) {
        console.log("chatRequestAcceptRejectByAstrologer Saga Error ::: ", error);
    }
};

function* endChatMessage(action) {
    try {
        const { payload } = action;
        console.log('End Chat Message Payload ::: ', payload);

        SocketService.emit('endChat', { roomID: payload?.chatId });
        // SocketService.emit('endVideoCall', { roomID: payload?.chatId });
        console.log("End Chat Saga Run");
        yield put({ type: actionTypes.CLOSE_CHAT_MESSAGE, payload: null });

    } catch (error) {
        console.log("endChatMessage Saga Error ::: ", error);
    }
}

function* closeChatMessage(action) {
    try {
        const { payload } = action;
        console.log("closeChatMessage Payload ::: ", payload);

        if (payload) {
            console.log('closeChatMessage Saga Run');
            const user_type = localStorage.getItem('user_type');
            console.log("User Type ::: ", user_type);

            console.log("On Complete Run");
            localStorage.removeItem('chatId');
            yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: true });

            const close_chat_reponse = yield axios.post(api_urls + 'api/customers/get_chat_details', { chatId: payload?.chatId });
            console.log('close_chat_reponse', close_chat_reponse);

            if (close_chat_reponse?.data?.success) {
                yield put({ type: actionTypes.CURRENT_REQUEST_TIMER_COUNTDOWN, payload: 0 });
                yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: { ...close_chat_reponse?.data?.chatHistory, serviceId: payload?.chatId } });

                if (user_type == 'customer') {
                    yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload: true });
                    yield put({ type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload: { customerId: localStorage.getItem('current_user_id') } });
                }
                if (user_type == 'astrologer') {
                    yield put({ type: actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY, payload: true });
                    console.log("Invoice Open Astrolgoer !!!")
                }
            }
        }
    } catch (error) {
        console.log("closeChatMessage Saga Error ::: ", error);
    }
};

function* suggestRemediesDuringChat(action) {
    try {
        const { payload } = action;
        console.log('Suggest Remedies During Chat Payload ::: ', payload);

        const result = yield Swal.fire({
            icon: "warning", text: "Do you want to send this remedies?", showConfirmButton: true, timer: 20000,
            confirmButtonText: "Yes", confirmButtonColor: Color.primary, cancelButtonText: "No", showCancelButton: true, cancelButtonColor: Color.darkgrey
        });
        console.log('result', result);

        if (result.isConfirmed) {
            const { data } = yield postAPI('api/puja/add_suggested_remedies', payload?.data);
            console.log("Suggested Puja Response :::", data);

            yield call(payload?.onComplete);
        }
    } catch (error) {
        console.log('Suggest Remedies During Chat Saga Error ::: ', error?.response?.data);
    }
};

export default function* consultationSaga() {
    // TODO : Consultation Request
    yield takeLeading(actionTypes?.GET_LINKED_PROFILE_FOR_CONSULTATION, getLinkedProfileForConsultation);
    yield takeLeading(actionTypes?.INITIATE_REQUEST, initiateRequest);
    yield takeLeading(actionTypes?.HANDLE_INCOMING_REQUEST_BY_CONSULTANT, handleIncomingRequestByConsultant);
    yield takeLeading(actionTypes?.END_CURRENT_REQUEST, endCurrentRequest);
    yield takeLeading(actionTypes?.CLOSE_CURRENT_REQUEST, closeCurrentRequest);

    // TODO : Old
    yield takeLeading(actionTypes?.CHAT_REQUEST_SEND_BY_CUSTOMER, chatRequestSendByCustomer);
    yield takeLeading(actionTypes?.CHAT_REQUEST_ACCEPT_REJECT_BY_ASTROLOGER, chatRequestAcceptRejectByAstrologer);
    yield takeLeading(actionTypes?.END_CHAT_MESSAGE, endChatMessage);
    yield takeLeading(actionTypes?.CLOSE_CHAT_MESSAGE, closeChatMessage);
    yield takeLeading(actionTypes?.SUGGEST_REMEDIES_DURING_CHAT, suggestRemediesDuringChat);
};