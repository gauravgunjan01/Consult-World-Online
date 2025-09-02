import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import AgoraRTC, {
    AgoraRTCProvider,
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import { Mic, MicOff, PhoneOff, Volume2, VolumeX } from "lucide-react";

import { Color } from "../../../assets/colors";
import { agora_app_id } from "../../../utils/constants";
import SocketService from "../../../utils/services/socket-service";
import CurrentRequestTimerCountDown from "../components/CurrentRequestTimerCountDown";
import * as ConsultationActions from "../../../redux/actions/consultationAction";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const Basics = ({ channel, token }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { socketConnectionStatus } = useSelector((state) => state?.commonReducer);
    const { currentRequestData } = useSelector((state) => state?.consultationReducer);

    const currentUserId = localStorage.getItem("current_user_id");
    const numericUid = parseInt(currentUserId.slice(-6), 16);

    useJoin({ appid: agora_app_id, channel, token, uid: numericUid }, true);
    const isConnected = useIsConnected();

    const { localMicrophoneTrack } = useLocalMicrophoneTrack();
    usePublish([localMicrophoneTrack]);
    const remoteUsers = useRemoteUsers();

    const [isMuted, setIsMuted] = useState(false);
    const [speakerOn, setSpeakerOn] = useState(true);

    useEffect(() => {
        const roomId = localStorage.getItem("roomId");
        if (roomId) SocketService?.emit("joinVoiceCallRoom", roomId);
    }, [socketConnectionStatus]);

    useEffect(() => {
        const user_type = localStorage.getItem("user_type");
        if (user_type === "customer")
            dispatch(
                ConsultationActions.currentRequestData(
                    JSON.parse(localStorage.getItem("initiatedRequestData"))
                )
            );
        else
            dispatch(
                ConsultationActions.currentRequestData(
                    JSON.parse(localStorage.getItem("incomingRequestData"))
                )
            );
    }, []);

    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <div>
                    <h2 className="text-lg font-semibold">
                        {currentRequestData?.customerName ||
                            currentRequestData?.astrologerName}
                    </h2>
                    <p className="text-sm text-gray-400">
                        In Call • <CurrentRequestTimerCountDown />
                    </p>
                </div>
                <span
                    className={`text-sm px-3 py-1 rounded-full ${isConnected ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {isConnected ? "Connected" : "Connecting..."}
                </span>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
                    {currentRequestData?.customerName?.[0] ||
                        currentRequestData?.astrologerName?.[0] ||
                        "U"}
                </div>
                <h3 className="text-xl font-medium mb-2">
                    {currentRequestData?.customerName ||
                        currentRequestData?.astrologerName}
                </h3>
                <p className="text-gray-400">
                    {remoteUsers.length > 0 ? "On Call" : "Waiting to connect..."}
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8 py-6 border-t border-gray-700">
                <button
                    onClick={() => {
                        setIsMuted(!isMuted);
                        localMicrophoneTrack?.setEnabled(isMuted);
                    }}
                    className="bg-gray-800 p-4 rounded-full hover:bg-gray-700 transition"
                >
                    {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
                </button>

                <button
                    onClick={() =>
                        dispatch(
                            ConsultationActions.endCurrentRequest({
                                roomId: localStorage.getItem("roomId"),
                                type: "voice-call",
                            })
                        )
                    }
                    className="bg-red-600 p-5 rounded-full hover:bg-red-500 transition shadow-lg"
                >
                    <PhoneOff size={32} />
                </button>

                <button
                    onClick={() => setSpeakerOn(!speakerOn)}
                    className="bg-gray-800 p-4 rounded-full hover:bg-gray-700 transition"
                >
                    {speakerOn ? <Volume2 size={28} /> : <VolumeX size={28} />}
                </button>
            </div>
        </div>
    );
};

const VoiceCallConsultation = () => {
    const [searchParams] = useSearchParams();
    const channel = searchParams.get("channel-name");
    const token = decodeURIComponent(searchParams.get("token"));

    return (
        <AgoraRTCProvider client={client}>
            <Basics channel={channel} token={token} />
        </AgoraRTCProvider>
    );
};

export default VoiceCallConsultation;