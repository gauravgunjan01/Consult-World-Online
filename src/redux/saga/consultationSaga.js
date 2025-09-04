import axios from 'axios';
import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';

import { Color } from '../../assets/colors';
import { api_urls } from '../../utils/api-urls';
import { getAPI, postAPI } from '../../utils/api-function';
import { toaster } from '../../utils/services/toast-service';
import { database, ref, push, serverTimestamp, set } from '../../config/firebase-config';

import {
    get_linked_profile_for_consultation, create_profile_for_chat,
    initiate_chat_message,
    initiate_video_call, accept_video_call, reject_video_call,
    accept_voice_call,
    reject_voice_call,
    initiate_voice_call
} from '../../utils/api-routes';

import SocketService from '../../utils/services/socket-service';

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
        console.log("Initiate Request Payload ::: ", payload);

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
                    SocketService.emit('joinChatRoom', send_request?.data?.newChat?._id);

                    localStorage?.setItem('requestInitiated', true);
                    localStorage?.setItem('initiatedRequestTimer', 60);
                    localStorage.setItem('initiatedRequestPrice', send_request?.data?.newChat?.chatPrice);
                    localStorage?.setItem('initiatedRequestAstrologerData', JSON.stringify({ name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: payload?.chatPrice, type: 'Chat' }));
                    yield put({ type: actionTypes.INITIATED_REQUEST_DATA, payload: { initiated: true, timer: 60, astrologer_data: { name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: payload?.chatPrice, type: 'Chat' } } });

                } else {
                    toaster.error({ text: send_request?.data?.message });
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

            case 'voice-call':
                const { data: send_voice_call_request } = yield axios.post(api_urls + initiate_voice_call, { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId })
                console.log('send_voice_call_request', send_voice_call_request);

                if (send_voice_call_request?.success) {
                    toaster.success({ text: "Voice call request send successfully." });
                    SocketService.emit('createVoiceCallRoom', {
                        roomID: send_voice_call_request?.data?.callId,
                        voiceCallPrice: Number(send_voice_call_request?.data?.callPrice) + Number(send_voice_call_request?.data?.commissionPrice),
                        customerID: send_voice_call_request?.data?.customerId,
                        astroID: send_voice_call_request?.data?.astrologerId,
                        duration: send_voice_call_request?.data?.talkTimeInMinutes,
                        profileId: send_voice_call_request?.data?.formId || profileId,
                        newUser: false
                    });
                    SocketService.emit('joinVoiceCallRoom', send_voice_call_request?.data?.callId);

                    localStorage?.setItem('requestInitiated', true);
                    localStorage?.setItem('initiatedRequestTimer', 60);
                    localStorage?.setItem('initiatedRequestPrice', Number(send_voice_call_request?.data?.callPrice) + Number(send_voice_call_request?.data?.commissionPrice));
                    localStorage?.setItem('initiatedRequestAstrologerData', JSON.stringify({ name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: Number(send_voice_call_request?.data?.callPrice) + Number(send_voice_call_request?.data?.commissionPrice), type: 'Voice call' }));
                    yield put({ type: actionTypes.INITIATED_REQUEST_DATA, payload: { initiated: true, timer: 60, astrologer_data: { name: payload?.astrologerName, image: payload?.astrologerProfileImage, price: Number(send_voice_call_request?.data?.callPrice) + Number(send_voice_call_request?.data?.commissionPrice), type: 'Voice call' } } });

                } else {
                    toaster.error({ text: send_voice_call_request?.message });
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
        console.log("Initiate Request Saga Error ::: ", error);
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
                    yield postAPI('api/customers/accept_chat', { chatId: payload?.data?.requested_data?.chatId, type: 'astrologer' });

                    //! Storing Message Start
                    const chat_id = `customer_${payload?.data?.requested_data?.user_id}_astro_${payload?.data?.requested_data?.astroID}`;

                    const { data } = yield postAPI('api/customers/get_linked_profile', { profileId: payload?.data?.requested_data?.profileId });

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
                                _id: 'customer_' + payload?.data?.requested_data?.user_id,
                                name: payload?.data?.requested_data?.customerName,
                                image: api_urls + 'uploads/' + payload?.data?.requested_data?.customerImage
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
                        text: payload?.data?.requested_data?.message,
                        user: {
                            _id: 'astro_' + payload?.data?.requested_data?.astroID,
                            name: payload?.data?.requested_data?.astrologerName,
                            image: api_urls + payload?.data?.requested_data?.astrologerImage
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

                    localStorage.setItem('chatId', payload?.data?.requested_data?.chatId);
                    SocketService.emit('onAstroAccept', payload?.data?.requested_data?.chatId);
                    SocketService.emit('joinChatRoom', payload?.data?.requested_data?.chatId);
                    yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: false });
                    yield call(payload?.onAcceptChat);
                    return;
                }
                if (payload?.data?.status == 'Missed') {
                    const data = { roomID: payload?.data?.requested_data?.chatId, actionBy: 'astro' };
                    SocketService.emit('missedChat', data);
                    yield call(payload?.onMissed);
                    yield postAPI('api/customers/reject_chat', { chatId: payload?.data?.requested_data?.chatId, type: 'astrologer' });
                }
                else {
                    const data = { roomID: payload?.data?.requested_data?.chatId, actionBy: 'astro' };
                    SocketService.emit('declinedChat', data);
                    yield call(payload?.onReject);
                    yield postAPI('api/customers/reject_chat', { chatId: payload?.data?.requested_data?.chatId, type: 'astrologer' });
                }
                return;

            case 'video-call':
                console.log("Handle Incoming Request By Consultant Video Call!!!");

                if (payload?.data?.status == 'Accept') {
                    try {
                        const { data: agora_token } = yield getAPI(`api/customers/generate_agora_token?channelName=${payload?.data?.requested_data?.invoiceId}&uid=${payload?.data?.requested_data?.astroID}`);
                        console.log({ agora_token: agora_token?.token })
                        if (agora_token?.success) {
                            yield postAPI(accept_video_call, { callId: payload?.data?.requested_data?.invoiceId, type: 'astrologer' });
                            localStorage.setItem('roomId', payload?.data?.requested_data?.invoiceId);
                            SocketService.emit('onVideoCallAstroAccept', payload?.data?.requested_data?.invoiceId);
                            SocketService.emit('joinVideoCallRoom', payload?.data?.requested_data?.invoiceId);
                            yield call(payload?.onAcceptVideocall, { channel_name: payload?.data?.requested_data?.invoiceId, token: agora_token?.token });
                        }
                    } catch (error) {
                        console.log("Agora Token Error :::", error?.response?.data);
                    }
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

                if (payload?.data?.status == 'Accept') {
                    try {
                        const { data: agora_token } = yield getAPI(`api/customers/generate_agora_token?channelName=${payload?.data?.requested_data?.invoiceId}&uid=${payload?.data?.requested_data?.astroID}`);
                        console.log({ agora_token: agora_token?.token })
                        if (agora_token?.success) {
                            yield postAPI(accept_voice_call, { callId: payload?.data?.requested_data?.invoiceId, type: 'astrologer' });
                            localStorage.setItem('roomId', payload?.data?.requested_data?.invoiceId);
                            SocketService.emit('onVoiceCallAstroAccept', payload?.data?.requested_data?.invoiceId);
                            SocketService.emit('joinVoiceCallRoom', payload?.data?.requested_data?.invoiceId);
                            yield call(payload?.onAcceptVoicecall, { channel_name: payload?.data?.requested_data?.invoiceId, token: agora_token?.token });
                        }
                    } catch (error) {
                        console.log("Agora Token Error :::", error?.response?.data);
                    }
                    return;
                }
                if (payload?.data?.status == 'Missed') {
                    const data = { roomID: payload?.data?.requested_data?.invoiceId, actionBy: 'astro' };
                    SocketService.emit('declinedVoiceCall', data);
                    yield call(payload?.onMissed);
                    yield postAPI(reject_voice_call, { callId: payload?.data?.requested_data?.invoiceId, type: 'astrologer' });
                }
                else {
                    const data = { roomID: payload?.data?.requested_data?.invoiceId, actionBy: 'astro' };
                    SocketService.emit('declinedVoiceCall', data);
                    yield call(payload?.onReject);
                    yield postAPI(reject_voice_call, { callId: payload?.data?.requested_data?.invoiceId, type: 'astrologer' });
                }
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

        const result = yield Swal.fire({ icon: "warning", text: `Do you want to end this ${payload?.type?.split('-')?.join(' ')}?`, showConfirmButton: true, timer: 20000, confirmButtonText: "Yes", confirmButtonColor: Color.primary, cancelButtonText: "No", showCancelButton: true, cancelButtonColor: Color.darkgrey });

        if (!result.isConfirmed) return;

        switch (payload?.type) {
            case 'chat':
                const message = {
                    _id: Math.random().toString(36).substr(2, 9),
                    text: `Chat has been ended by ${payload?.currentUser?.name}`,
                    user: payload?.currentUser,
                    createdAt: new Date().getTime(),
                    addedAt: serverTimestamp(),
                };

                const chatNode = push(ref(database, `ChatMessages/${payload?.chat_id}`));
                const newKey = chatNode.key;
                const chatRef = ref(database, `ChatMessages/${payload?.chat_id}/${newKey}`);
                yield set(chatRef, { ...message, pending: false, sent: true, received: false });

                SocketService.emit('endChat', { roomID: payload?.roomId });
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
        const user_type = localStorage.getItem('user_type');
        console.log("User Type ::: ", user_type);

        if (!payload) return;
        switch (payload?.type) {
            case 'chat':
                console.log("Close Current Request Saga Run For Chat!!!");
                localStorage.removeItem('chatId');
                yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: true });

                const close_chat_reponse = yield axios.post(api_urls + 'api/customers/get_chat_details', { chatId: payload?.roomId });
                console.log('close_chat_reponse', close_chat_reponse?.data);

                if (close_chat_reponse?.data?.success) {
                    yield put({ type: actionTypes.CURRENT_REQUEST_TIMER_COUNTDOWN, payload: 0 });
                    yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: { ...close_chat_reponse?.data?.chatHistory, serviceId: payload?.roomId } });

                    if (user_type == 'customer') {
                        localStorage.removeItem('initiatedRequestData');
                        yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload: true });
                        yield put({ type: actionTypes.GET_USER_CUSTOMER_DETAILS, payload: { customerId: localStorage.getItem('current_user_id') } });
                    }
                    if (user_type == 'astrologer') {
                        localStorage.removeItem('incomingRequestData');
                        yield put({ type: actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY, payload: true });
                        console.log("Invoice Open Astrolgoer !!!")
                    }
                }
                // yield call(payload?.onComplete);
                return;

            case 'video-call':
                console.log("Close Current Request Saga Run For Video Call!!!");
                // const { data: video_call_reponse } = yield axios.post(api_urls + 'api/customers/get_chat_details', { chatId: payload?.chatId });
                // console.log('video_call_reponse', video_call_reponse);

                // if (video_call_reponse?.success) {
                yield put({ type: actionTypes.CURRENT_REQUEST_TIMER_COUNTDOWN, payload: 0 });
                // yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: { ...video_call_reponse?.chatHistory, serviceId: payload?.chatId } });

                if (user_type == 'customer') {
                    localStorage.removeItem('roomId');
                    localStorage.removeItem('initiatedRequestData');
                    // yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload: true });
                    // yield put({ type: actionTypes.GET_USER_CUSTOMER_DETAILS, payload: { customerId: localStorage.getItem('current_user_id') } });
                }
                if (user_type == 'astrologer') {
                    localStorage.removeItem('roomId');
                    localStorage.removeItem('incomingRequestData');
                    // yield put({ type: actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY, payload: true });
                }
                // }
                yield call(payload?.onComplete);
                toaster.success({ text: 'Current video call session ended.' });
                return;

            case 'voice-call':
                console.log("Close Current Request Saga Run For Voice Call!!!");
                yield put({ type: actionTypes.CURRENT_REQUEST_TIMER_COUNTDOWN, payload: 0 });
                if (user_type == 'customer') {
                    localStorage.removeItem('roomId');
                    localStorage.removeItem('initiatedRequestData');
                }
                if (user_type == 'astrologer') {
                    localStorage.removeItem('roomId');
                    localStorage.removeItem('incomingRequestData');
                }
                yield call(payload?.onComplete);
                toaster.success({ text: 'Current voice call session ended.' });
                return;

            default:
                return;
        }
    } catch (error) {
        console.log('Close Current Request Payload ::: ', error?.response?.data);
    }
};

//! Remedies During Chat
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

    //! Remedies During Chat
    yield takeLeading(actionTypes?.SUGGEST_REMEDIES_DURING_CHAT, suggestRemediesDuringChat);
};