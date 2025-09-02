import { io } from 'socket.io-client';
import { api_urls } from '../../api-urls';
import * as ConsultationActions from '../../../redux/actions/consultationAction';
import * as CommonActions from '../../../redux/actions/commonAction';

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

            //! Chat
            this.socket.on('updateChatTimer', data => {
                // console.log("Timer Data ::: ", data);
                dispatch(ConsultationActions.currentRequestTimerCountDown(data));
            });

            this.socket.on('timerStopped', async () => {
                console.log("Timer Stopped Event Run !!!");
                dispatch(ConsultationActions.closeCurrentRequest({ type: 'chat', roomId: localStorage?.getItem('chatId'), onComplete: () => navigate('/', { replace: true }) }));
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