import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp, set } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import * as ConsultationActions from '../../redux/actions/consultationAction';
import SocketService from "../../utils/services/socket-service";
import { toaster } from "../../utils/services/toast-service";
import { getAPI, postAPI } from "../../utils/api-function";

const firebaseConfig = {
  apiKey: "AIzaSyCHaBdK41yP7DsTnSMtg707hUunU-tISeM",
  authDomain: "my-future-talk.firebaseapp.com",
  databaseURL: "https://my-future-talk-default-rtdb.firebaseio.com",
  projectId: "my-future-talk",
  storageBucket: "my-future-talk.firebasestorage.app",
  messagingSenderId: "373261190733",
  appId: "1:373261190733:web:95aec6dc4d96608b637e04",
};


//! Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//! Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

const generateTokenByRequestPermission = async () => {
  try {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      const fcm_token = await getToken(messaging, { vapidKey: "BJDHrbqe5vBOtqyoI317NoXvYQcbz1-9MHju0EaKey13HnTUtGn-UR9wNV5xD38RVwPMJRd5P4bUwoiNb1H3e3A" });
      console.log('FCM Token', fcm_token);
      localStorage.setItem('fcm_token', fcm_token);
      return fcm_token;
    } else if (permission === 'denied') {
    }
  } catch (error) {
    console.log(error)
  }
};

//! Handle foreground messages
const onMessageListener = (navigate, dispatch) => {
  onMessage(messaging, async (payload) => {
    const notificationOptions = { data: payload.data, title: payload.data.title };
    console.log("Notification Option :: ", notificationOptions);

    const notificationData = notificationOptions.data;
    console.log("Notification Data :: ", notificationData);
    console.log('Profile Id ::: ', notificationData?.profileId);

    switch (notificationData?.type) {
      case 'chat_declined':
        toaster?.info({ text: notificationOptions?.title });

        localStorage?.removeItem('requestInitiated');
        localStorage?.removeItem('initiatedRequestTimer');
        localStorage?.removeItem('initiatedRequestPrice');
        localStorage?.removeItem('initiatedRequestAstrologerData');
        dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: null }));
        dispatch(ConsultationActions?.hideChatMessageInputField(false));
        return;

      case 'call_invoice':
        dispatch(ConsultationActions?.setCallInvoiceVisibility(true));
        dispatch(ConsultationActions?.setCallInvoiceData(JSON.parse(notificationData?.data)));
        return;

      case 'VideoCall':
        dispatch(ConsultationActions?.setVideocallInvoiceVisibility(true));
        dispatch(ConsultationActions?.setVideocallInvoiceData(notificationData));
        return;

      case 'voice_call_request': //* For Astrologer
        localStorage?.setItem('requestIncoming', true);
        localStorage?.setItem('incomingRequestTimer', 60);
        localStorage?.setItem('incomingRequestData', JSON.stringify(notificationData));
        localStorage?.setItem('incomingRequestCustomerData', JSON.stringify({ name: notificationData?.customerName, image: notificationData?.customerImage, type: 'voice-call' }));
        dispatch(ConsultationActions?.incomingRequestData({ incoming: true, timer: 60, customer_data: { name: notificationData?.customerName, image: notificationData?.profileImage, type: 'voice-call' }, data: notificationData }));
        return;

      case 'voicecall_accepted': //* For Customer
        try {
          const { data: agora_token } = await getAPI(`api/customers/generate_agora_token?channelName=${notificationData?.roomID}&uid=${notificationData?.user_id}`);
          console.log({ agora_token: agora_token?.token })
          if (agora_token?.success) {
            navigate(`/consultation/voice-call-consultation?channel-name=${notificationData?.roomID}&token=${encodeURIComponent(agora_token?.token)}`, { replace: true })
            localStorage?.removeItem('requestInitiated');
            localStorage?.removeItem('initiatedRequestTimer');
            localStorage?.removeItem('initiatedRequestPrice');
            localStorage?.removeItem('initiatedRequestAstrologerData');
            localStorage?.setItem('initiatedRequestData', JSON.stringify(notificationData));
            dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: notificationData }));
            toaster.success({ text: `${notificationData?.astrologerName || 'Astrologer'} has accepted your voice call request.` });

            localStorage.setItem('roomId', notificationData?.roomID || notificationData?.invoiceId);
            SocketService.emit('joinVoiceCallRoom', notificationData?.roomID || notificationData?.invoiceId);
            SocketService.emit('startVoiceCallTimer', notificationData?.roomID || notificationData?.invoiceId);
          }
        } catch (error) {
          console.log("Agora Token Error :::", error?.response?.data);
        }
        return;

      case 'voiceCall_declined': //* For Customer
        localStorage?.removeItem('requestInitiated');
        localStorage?.removeItem('initiatedRequestTimer');
        localStorage?.removeItem('initiatedRequestPrice');
        localStorage?.removeItem('initiatedRequestAstrologerData');
        dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: null }));
        toaster.info({ text: notificationData?.title })
        return;

      case 'video_call_request': //* For Astrologer
        localStorage?.setItem('requestIncoming', true);
        localStorage?.setItem('incomingRequestTimer', 60);
        localStorage?.setItem('incomingRequestData', JSON.stringify(notificationData));
        localStorage?.setItem('incomingRequestCustomerData', JSON.stringify({ name: notificationData?.customerName, image: notificationData?.profileImage, type: 'video-call' }));
        dispatch(ConsultationActions?.incomingRequestData({ incoming: true, timer: 60, customer_data: { name: notificationData?.customerName, image: notificationData?.profileImage, type: 'video-call' }, data: notificationData }));
        return;

      case 'videocall_accepted': //* For Customer
        try {
          const { data: agora_token } = await getAPI(`api/customers/generate_agora_token?channelName=${notificationData?.roomID}&uid=${notificationData?.user_id}`);
          console.log({ agora_token: agora_token?.token })
          if (agora_token?.success) {
            navigate(`/consultation/video-call-consultation?channel-name=${notificationData?.roomID}&token=${encodeURIComponent(agora_token?.token)}`, { replace: true })
            localStorage?.removeItem('requestInitiated');
            localStorage?.removeItem('initiatedRequestTimer');
            localStorage?.removeItem('initiatedRequestPrice');
            localStorage?.removeItem('initiatedRequestAstrologerData');
            localStorage?.setItem('initiatedRequestData', JSON.stringify(notificationData));
            dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: notificationData }));
            toaster.success({ text: `${notificationData?.astrologerName || 'Astrologer'} has accepted your video call request.` });

            localStorage.setItem('roomId', notificationData?.roomID || notificationData?.invoiceId);
            SocketService.emit('joinVideoCallRoom', notificationData?.roomID || notificationData?.invoiceId);
            SocketService.emit('startVideoCallTimer', notificationData?.roomID || notificationData?.invoiceId);
          }
        } catch (error) {
          console.log("Agora Token Error :::", error?.response?.data);
        }
        return;

      case 'videoCall_declined': //* For Customer
        localStorage?.removeItem('requestInitiated');
        localStorage?.removeItem('initiatedRequestTimer');
        localStorage?.removeItem('initiatedRequestPrice');
        localStorage?.removeItem('initiatedRequestAstrologerData');
        dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: null }));
        toaster.info({ text: notificationData?.title })
        return;

      case 'chat_request':
        let url;
        switch (notificationData?.sent_to) {
          case 'astrologer':
            // console.log('For Astrologer', notificationData?.sent_to)
            // url = `/chat/astrologer-accept-reject?user_id=${notificationData.user_id}&astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&customerName=${notificationData.customerName}&astrologerName=${notificationData.astrologerName}&invoiceId=${notificationData.invoiceId}&priority=${notificationData.priority}&profileId=${notificationData.profileId}&type=${notificationData.type}&wallet_balance=${notificationData.wallet_balance}&welcome_message=${notificationData?.message}&customerImage=${notificationData.customerImage}&astrologerImage=${notificationData.astrologerImage}`;
            // navigate(url, '_blank');
            // localStorage?.setItem('incomingRequestTimer', 60);
            // dispatch(ConsultationActions?.incomingRequestData({ incoming: true, timer: 60, customer_data: { name: notificationData?.customerName, image: notificationData?.profileImage, type: 'Chat' }, data: notificationData }));
            // break;
            localStorage?.setItem('requestIncoming', true);
            localStorage?.setItem('incomingRequestTimer', 60);
            localStorage?.setItem('incomingRequestData', JSON.stringify(notificationData));
            localStorage?.setItem('incomingRequestCustomerData', JSON.stringify({ name: notificationData?.customerName, image: notificationData?.profileImage, type: 'chat' }));
            dispatch(ConsultationActions?.incomingRequestData({ incoming: true, timer: 60, customer_data: { name: notificationData?.customerName, image: notificationData?.profileImage, type: 'chat' }, data: notificationData }));
            return;

          case 'customer':
            console.log('For Customer', notificationData?.sent_to)
            navigate(`/consultation/chat-consultation?peer-id=${notificationData.astroID}&customer=${notificationData.user_id}&astrologer=${notificationData.astroID}&chatId=${notificationData?.chatId}&profileId=${notificationData?.profileId || "67ebbdaf8bc2fa603ca7ec5a"}`, { replace: true })
            localStorage?.removeItem('requestInitiated');
            localStorage?.removeItem('initiatedRequestTimer');
            localStorage?.removeItem('initiatedRequestPrice');
            localStorage?.removeItem('initiatedRequestAstrologerData');
            localStorage?.setItem('initiatedRequestData', JSON.stringify(notificationData));
            dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null, data: notificationData }));
            dispatch(ConsultationActions?.hideChatMessageInputField(false));

            //! New Logic
            // dispatch(ConversationActions?.setChatRoomData(notificationData));
            localStorage.setItem('chatId', notificationData?.chatId);
            SocketService.emit('joinChatRoom', notificationData?.chatId);
            SocketService.emit('startChatTimer', notificationData?.chatId);
            break;

          default:
            break
        }
        return;

      default:
        return;
    };
  });
};

export { database, ref, push, onValue, serverTimestamp, set, messaging, generateTokenByRequestPermission, onMessageListener };