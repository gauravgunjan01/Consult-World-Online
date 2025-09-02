import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import AgoraRTC, { AgoraRTCProvider, LocalUser, RemoteUser, useIsConnected, useJoin, useLocalMicrophoneTrack, usePublish, useRemoteUsers, } from "agora-rtc-react";

import { Color } from "../../../assets/colors";
import { ChatCloseSvg } from "../../../assets/svg";
import { agora_app_id } from "../../../utils/constants";
import SocketService from "../../../utils/services/socket-service";
import CurrentRequestTimerCountDown from "../components/CurrentRequestTimerCountDown";
import * as ConsultationActions from '../../../redux/actions/consultationAction';
import { Mic, MicOff, PhoneOff, Volume2, VolumeX } from "lucide-react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const Basics = ({ channel, token, client }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { socketConnectionStatus } = useSelector(state => state?.commonReducer);
    const { currentRequestData } = useSelector(state => state?.consultationReducer);

    const currentUserId = localStorage.getItem("current_user_id");
    const numericUid = parseInt(currentUserId.slice(-6), 16);

    const [isMuted, setIsMuted] = useState(false);
    const [speakerOn, setSpeakerOn] = useState(true);

    AgoraRTC.setLogLevel(2); // warning + error
    useJoin({ appid: agora_app_id, channel, token, uid: numericUid }, true);
    const isConnected = useIsConnected();

    const { localMicrophoneTrack } = useLocalMicrophoneTrack();
    usePublish([localMicrophoneTrack]);
    const remoteUsers = useRemoteUsers();

    useEffect(() => {
        if (remoteUsers.length > 0) {
            const remoteAudioTrack = remoteUsers[0].audioTrack;
            if (remoteAudioTrack) {
                if (speakerOn) {
                    remoteAudioTrack.play();
                } else {
                    remoteAudioTrack.stop();
                }
            }
        }
    }, [remoteUsers, speakerOn]);

    useEffect(() => {
        console.log("Connected:", isConnected);
        console.log("Remote users:", remoteUsers);
    }, [isConnected, remoteUsers]);

    // Todo : Emitting 'join-room' Event On Page Mount or Page Relaoding
    useEffect(() => {
        const roomId = localStorage.getItem('roomId');
        if (roomId) SocketService?.emit('joinVoiceCallRoom', roomId);
        // else navigate('/');
    }, [socketConnectionStatus]);

    useEffect(() => {
        const user_type = localStorage.getItem('user_type');

        if (user_type == 'customer') dispatch(ConsultationActions.currentRequestData(JSON.parse(localStorage.getItem('initiatedRequestData'))))
        else dispatch(ConsultationActions.currentRequestData(JSON.parse(localStorage.getItem('incomingRequestData'))))
    }, []);

    return (
        <>
            <div className={`relative flex flex-col h-[calc(100vh-100px)] w-full bg-gradient-to-b from-gray-900 to-black text-white`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <div>
                        <h2 className="text-lg font-semibold">{currentRequestData?.customerName || currentRequestData?.astrologerName}</h2>
                        <p className="text-sm text-gray-400">In Call • <CurrentRequestTimerCountDown /></p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full ${isConnected ? "bg-green-600" : "bg-red-600"}`}>{isConnected ? "Connected" : "Connecting..."}</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
                        {currentRequestData?.customerName?.[0] || currentRequestData?.astrologerName?.[0] || "U"}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{currentRequestData?.customerName || currentRequestData?.astrologerName}</h3>
                    <p className="text-gray-400">{remoteUsers.length > 0 ? "On Call" : "Waiting to connect..."}</p>
                    <div className="absolute -z-10">{remoteUsers.length > 0 && (<RemoteUser user={remoteUsers[0]} play />)}</div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-8 py-6 border-t border-gray-700">
                    <button onClick={() => { setIsMuted(!isMuted); localMicrophoneTrack?.setEnabled(isMuted); }} className="bg-gray-800 p-4 rounded-full hover:bg-gray-700 transition" >{isMuted ? <MicOff size={28} /> : <Mic size={28} />}</button>
                    <button onClick={() => dispatch(ConsultationActions.endCurrentRequest({ roomId: localStorage.getItem('roomId'), type: 'voice-call' }))} className="bg-red-600 p-5 rounded-full hover:bg-red-500 transition shadow-lg"><PhoneOff size={32} /></button>
                    <button onClick={() => setSpeakerOn(!speakerOn)} className="bg-gray-800 p-4 rounded-full hover:bg-gray-700 transition">{speakerOn ? <Volume2 size={28} /> : <VolumeX size={28} />}</button>
                </div>
            </div>
        </>
    );
};

const VoiceCallConsultation = () => {
    const [searchParams] = useSearchParams();
    const channel = searchParams.get("channel-name");
    const token = decodeURIComponent(searchParams.get("token"));

    return (
        <>
            <AgoraRTCProvider client={client}>
                <Basics channel={channel} token={token} client={client} />
            </AgoraRTCProvider>
        </>
    );
};

export default VoiceCallConsultation;