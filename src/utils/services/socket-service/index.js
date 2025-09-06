import { io } from 'socket.io-client';
import { api_urls } from '../../api-urls';
import * as ConsultationActions from '../../../redux/actions/consultationAction';
import * as CommonActions from '../../../redux/actions/commonAction';
import { toaster } from '../toast-service';

const SOCKET_URL = api_urls;

class SocketService {
    constructor() {
        this.socket = null;
    };

    static initializeSocket = async (dispatch, navigate, userId, user_type) => {
        if (this.socket) {
            console.log('Socket is already initialized !!!');
            return;
        }

        try {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket'],
                query: { userId, user_type },
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000,
            });

            //* Listen for connection
            this.socket.on('connect', () => {
                console.log(`Connected to server with socket ID: ${this.socket.id} and user ID: ${this.socket?._opts?.query?.userId}`);
                dispatch(CommonActions?.setSocketConnectionStatus(true));
            });

            //* Listen for disconnection
            this.socket.on('disconnect', (reason) => {
                console.log('Disconnected from server:', reason);
                dispatch(CommonActions?.setSocketConnectionStatus(false));
                if (reason === 'io server disconnect') {
                    this.socket.connect();
                }
            });

            //! Listen for notification event from the server
            this.socket.on('notification', (message) => {
                console.log('Received notification !!!  ::: ', message);
                const notification_type = message?.data?.type;
                const notification_data = message?.data;
                console.log('Notification Data !!!  ::: ', notification_data);

                switch (notification_type) {
                    // Todo : Customer
                    case 'chat_accepted':
                        console.log('Chat Accepted!!!  ::: ', message);
                        navigate(`/consultation/chat-consultation?peer-id=${notification_data.astrologerId}&customer=${notification_data.customerId}&astrologer=${notification_data.astrologerId}&chatId=${notification_data?.chatId}&profileId=${notification_data?.profileId || "67ebbdaf8bc2fa603ca7ec5a"}`, { replace: true }); //* Navigate to chat screen
                        localStorage?.removeItem('requestInitiated');
                        localStorage?.removeItem('initiatedRequestTimer');
                        localStorage?.removeItem('initiatedRequestPrice');
                        localStorage?.removeItem('initiatedRequestAstrologerData');
                        localStorage?.setItem('initiatedRequestData', JSON.stringify(notification_data));
                        dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: notification_data }));
                        this.emit('join-room', notification_data?.chatId);
                        this.emit('start-chat-timer', notification_data?.chatId);
                        break;

                    case 'chat_reject':
                        console.log("Chat Rejected! ", message?.data);
                        toaster.info({ text: message?.title });

                        localStorage?.removeItem('requestInitiated');
                        localStorage?.removeItem('initiatedRequestTimer');
                        localStorage?.removeItem('initiatedRequestPrice');
                        localStorage?.removeItem('initiatedRequestAstrologerData');
                        dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: null }));
                        break;
                    case 'chat_invoice':
                        //! Dispatching Action
                        break;

                    case 'call_invoice':
                        //! Dispatching Action
                        break;
                    case 'videocall_accepted':
                        console.log("Videocall accepted! ", message?.data);
                        break;
                    case 'videocall_reject':
                        console.log("Videocall rejected! ", message?.data);
                        // dispatch(ConversationActions?.setVideocallRoomData(message?.data));

                        // if (ZegoExpressEngine?.instance()) {
                        //     console.log("Engine found for destroy.");
                        //     ZegoExpressEngine?.destroyEngine();
                        //     navigation?.goBack();
                        // } else {
                        //     console.log("Engine not found to destroy.");
                        //     navigation?.goBack();
                        // }
                        break;

                    // Todo : Astrologer
                    case 'chat_request':
                        //! Dispatching Action
                        console.log("Chat request received! ", message?.data);
                        // displayChatNotification(message?.title, message?.data);
                        // displayChatNotification(message?.title, dispatch, navigation, message?.data);
                        localStorage?.setItem('requestIncoming', true);
                        localStorage?.setItem('incomingRequestTimer', 10);
                        localStorage?.setItem('incomingRequestData', JSON.stringify(message?.data));
                        localStorage?.setItem('incomingRequestCustomerData', JSON.stringify({ name: notification_data?.customer_name, image: message?.image, type: 'chat' }));
                        dispatch(ConsultationActions?.incomingRequestData({ incoming: true, timer: 10, customer_data: { name: notification_data?.customer_name, image: message?.image, type: 'chat' }, data: notification_data }));
                        break;
                    case 'chat_invoice':
                        //! Dispatching Action
                        break;

                    case 'call_invoice':
                        //! Dispatching Action
                        break;
                    case 'videocall_request':
                        //! Dispatching Action
                        console.log("Videocall request received! ", message?.data);
                        // displayVideocallNotification(message?.title, message?.data);
                        // displayVideocallNotification(message?.title, dispatch, navigation, message?.data);

                        break;
                    default:
                        toaster.success({ text: message?.title });
                        break;
                }
            });

            //! Chat
            this.socket.on('update-chat-timer', data => {
                // console.log("Timer Data ::: ", data);
                dispatch(ConsultationActions.currentRequestTimerCountDown(data));
            });

            this.socket.on('stop-chat-timer', async () => {
                console.log("Stop Time Event Run !!!");
                dispatch(ConsultationActions.closeCurrentRequest({ type: 'chat', onComplete: () => navigate('/', { replace: true }) }));
            });

            this.socket.on('chatEnded', () => {
                console.log("Chat Ended Event Run !!!");
            });

            //! Video Call
            this.socket.on('updateVideoCallTimer', data => {
                // console.log("Videocall Timer Data ::: ", data);
                dispatch(ConsultationActions.currentRequestTimerCountDown(data))
            });

            this.socket.on('timerVideoCallStopped', data => {
                console.log("Videocall Timer Stopped Event Run !!!", data);
                dispatch(ConsultationActions.closeCurrentRequest({ type: 'video-call', roomId: localStorage?.getItem('roomId'), onComplete: () => navigate('/', { replace: true }) }));
            });

            //! Voice Call
            this.socket.on('updateVoiceCallTimer', data => {
                // console.log("Voicecall Timer Data ::: ", data);
                dispatch(ConsultationActions.currentRequestTimerCountDown(data))
            });

            this.socket.on('timerVoiceCallStopped', data => {
                console.log("Voicecall Timer Stopped Event Run !!!", data);
                dispatch(ConsultationActions.closeCurrentRequest({ type: 'voice-call', roomId: localStorage?.getItem('roomId'), onComplete: () => navigate('/', { replace: true }) }));
            });

            this.socket.on('error', data => {
                console.log('Socket Error', data);
            });
        } catch (error) {
            console.log('Socket initialization failed !!!', error);
        }
    };

    static emit(event, data = {}) {
        console.log("Inside Socket")
        if (this.socket && this.socket.connected) {
            console.log("Socket Connected")
            console.log('Emitting event:', event, 'with data:', data);
            this.socket.emit(event, data);
        } else {
            console.log('Socket is not connected. Cannot emit event:', event);
        }
    }

    // static removeListener(listenerName) {
    //     this.socket.removeAllListeners(listenerName);
    // }
    static removeListener(event) {
        if (this.socket) {
            this.socket.removeListener(event);
            console.log(`Stopped listening to ${event} event.`);
        }
    };

    static disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            console.log('Socket disconnected.');
        }
    };
}

export default SocketService;