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

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const Basics = ({ channel, token, client }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { socketConnectionStatus } = useSelector(state => state?.commonReducer);
    const { currentRequestData } = useSelector(state => state?.consultationReducer);

    const currentUserId = localStorage.getItem("current_user_id");
    const numericUid = parseInt(currentUserId.slice(-6), 16);

    AgoraRTC.setLogLevel(2); // warning + error
    useJoin({ appid: agora_app_id, channel, token, uid: numericUid }, true);
    const isConnected = useIsConnected();

    const { localMicrophoneTrack } = useLocalMicrophoneTrack();
    usePublish([localMicrophoneTrack]);
    const remoteUsers = useRemoteUsers();

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
            <div className="relative overflow-hidden px-5 py-2">
                <div className="bg-black w-full p-5">
                    <div className="relative w-full md:max-w-[50vw] m-auto" style={{ height: "calc(100vh - 156px)" }}>
                        <div className="absolute z-10 w-full flex justify-between items-center flex-wrap gap-5">
                            <div className="flex items-center gap-2">
                                <span className="text-white">{currentRequestData?.customerName || currentRequestData?.astrologerName}</span>
                                <span className="bg-white rounded-full pt-0.5 px-3 text-sm"><CurrentRequestTimerCountDown /></span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => dispatch(ConsultationActions.endCurrentRequest({ roomId: localStorage.getItem('roomId'), type: 'voice-call' }))} className="bg-red-600 p-2 rounded-full cursor-pointer">
                                    <ChatCloseSvg color={Color?.white} />
                                </button>
                            </div>
                        </div>

                        <div className="p-5 text-white bg-black h-screen">
                            <h2>{isConnected ? "✅ Connected" : "❌ Not Connected"}</h2>

                            {remoteUsers.length > 0 && (
                                <RemoteUser user={remoteUsers[0]} play />
                            )}
                        </div>
                    </div>
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