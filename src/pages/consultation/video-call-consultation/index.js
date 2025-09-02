import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AgoraRTC, { LocalUser, RemoteUser, useJoin, useLocalMicrophoneTrack, useLocalCameraTrack, usePublish, AgoraRTCProvider } from "agora-rtc-react";
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
    // console.log('Current Request Data :::', currentRequestData);

    const [micOn, setMicOn] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);
    const [isLocalMain, setIsLocalMain] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState([]);

    const currentUserId = localStorage.getItem("current_user_id");
    const numericUid = parseInt(currentUserId.slice(-6), 16); // Convert last 6 hex chars to number
    const { isConnected } = useJoin({ appid: agora_app_id, channel, token, uid: numericUid }, true);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);

    usePublish([localMicrophoneTrack, localCameraTrack]);
    AgoraRTC.setLogLevel(2); // warning + error

    useEffect(() => {
        const syncUsers = async () => {
            for (const user of client.remoteUsers) {
                if (user.hasVideo) await client.subscribe(user, "video").catch(err => console.warn("subscribe video failed", err));
                if (user.hasAudio) await client.subscribe(user, "audio").catch(err => console.warn("subscribe audio failed", err));
            }
            setRemoteUsers(Array.from(client.remoteUsers));
        };

        const handleUserPublished = async (user, mediaType) => {
            if (!isConnected) return;
            try {
                await client.subscribe(user, mediaType);
                console.log("✅ Subscribed to", mediaType, "from UID:", user.uid);
                setRemoteUsers([...client.remoteUsers]);
            } catch (err) {
                console.error("subscribe failed", err);
            }
        };

        const handleUserUnpublished = () => {
            setRemoteUsers(Array.from(client.remoteUsers));
        };

        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        client.on("user-left", handleUserUnpublished);

        if (isConnected) syncUsers();

        return () => {
            client.off("user-published", handleUserPublished);
            client.off("user-unpublished", handleUserUnpublished);
            client.off("user-left", handleUserUnpublished);
        };
    }, [client, isConnected]);

    const remoteUser = remoteUsers[0];

    // Ensure video track plays whenever available
    useEffect(() => {
        if (remoteUser?.videoTrack) {
            const videoContainer = document.getElementById(`remote-video-${remoteUser.uid}`);
            if (videoContainer) {
                remoteUser.videoTrack.play(videoContainer);
            }
        }
    }, [remoteUser?.videoTrack]);

    useEffect(() => {
        if (!remoteUser || !remoteUser.videoTrack) return;

        const videoContainer = document.getElementById(`remote-video-${remoteUser.uid}`);
        if (videoContainer) {
            remoteUser.videoTrack.play(videoContainer);
        }
    }, [remoteUser, remoteUser?.videoTrack]);

    useEffect(() => {
        if (!remoteUser || !remoteUser.videoTrack) return;

        const containerId = isLocalMain
            ? `remote-video-${remoteUser.uid}`
            : `remote-video-${remoteUser.uid}-small`;

        const videoContainer = document.getElementById(containerId);
        if (videoContainer) {
            remoteUser.videoTrack.play(videoContainer);
        }
    }, [remoteUser, remoteUser?.videoTrack, isLocalMain]);

    // Todo : Emitting 'join-room' Event On Page Mount or Page Relaoding
    useEffect(() => {
        const roomId = localStorage.getItem('roomId');
        if (roomId) SocketService?.emit('joinVideoCallRoom', roomId);
        else navigate('/');
    }, [socketConnectionStatus]);

    useEffect(() => {
        const user_type = localStorage.getItem('user_type');

        if (user_type == 'customer') dispatch(ConsultationActions.currentRequestData(JSON.parse(localStorage.getItem('initiatedRequestData'))))
        else dispatch(ConsultationActions.currentRequestData(JSON.parse(localStorage.getItem('incomingRequestData'))))
    }, []);

    const handleEndCall = async () => {
        try {
            if (localMicrophoneTrack) {
                localMicrophoneTrack.stop();
                localMicrophoneTrack.close();
            }
            if (localCameraTrack) {
                localCameraTrack.stop();
                localCameraTrack.close();
            }
            await client.leave();  // Leave the Agora client
            dispatch(ConsultationActions.endCurrentRequest({ roomId: localStorage.getItem("roomId"), type: "video-call" }));
        } catch (error) {
            console.error("Error ending call:", error);
        }
    };

    return (
        <div className="relative overflow-hidden px-5 py-2">
            {/* Main Screen */}
            <div className="bg-black w-full p-5">
                <div className="relative w-full md:max-w-[50vw] m-auto" style={{ height: "calc(100vh - 156px)" }}>
                    <div className="absolute z-10 w-full flex justify-between items-center flex-wrap gap-5">
                        <div className="flex items-center gap-2">
                            <span className="text-white">{currentRequestData?.customerName || currentRequestData?.astrologerName}</span>
                            <span className="bg-white rounded-full pt-0.5 px-3 text-sm"><CurrentRequestTimerCountDown /></span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => dispatch(ConsultationActions.endCurrentRequest({ roomId: localStorage.getItem('roomId'), type: 'video-call' }))} className="bg-red-600 p-2 rounded-full cursor-pointer">
                                <ChatCloseSvg color={Color?.white} />
                            </button>
                        </div>
                    </div>

                    {isLocalMain ? (
                        <>
                            <LocalUser audioTrack={localMicrophoneTrack} videoTrack={localCameraTrack} micOn={micOn} cameraOn={cameraOn} style={{ objectFit: 'contain' }} />
                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Local</div>
                        </>
                    ) : remoteUser ? (
                        <>
                            <div id={`remote-video-${remoteUser.uid}`} className="w-full h-full object-contain pointer-events-none bg-green-700" style={{ objectFit: 'contain' }}></div>
                            <div className="absolute -top-4 bg-black/50 text-white text-xs py-1 rounded">Remote</div>
                        </>
                    ) : (
                        <div className="flex bg-black items-center justify-center h-full text-gray-400">Waiting for others to join...</div>
                    )}
                </div>
            </div>

            {/* Small Screen */}
            <div
                className="absolute z-[100] bottom-10 right-5 w-40 h-28 rounded-sm overflow-hidden shadow-lg border-2 border-white bg-black"
            // onClick={() => setIsLocalMain(prev => !prev)}
            >
                {isLocalMain ? (
                    remoteUser && (
                        <>
                            <div id={`remote-video-${remoteUser.uid}-small`} className="w-full h-full object-cover"></div>
                            <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1 rounded">Remote</div>
                        </>
                    )
                ) : (
                    <>
                        <LocalUser audioTrack={localMicrophoneTrack} videoTrack={localCameraTrack} micOn={micOn} cameraOn={cameraOn} className="w-full h-full object-cover" />
                        <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1 rounded">Local</div>
                    </>
                )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-[200]">
                <button onClick={() => setMicOn(prev => !prev)} className="px-4 py-2 bg-gray-700 text-white rounded-full shadow">
                    {micOn ? "Mute Mic" : "Unmute Mic"}
                </button>
                <button onClick={() => setCameraOn(prev => !prev)} className="px-4 py-2 bg-gray-700 text-white rounded-full shadow">
                    {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
                </button>
            </div>
        </div>
    );
};

const VideocallConsultation = () => {
    // const channel = '68a700fb97a3b2887b0c1041';
    // const token = localStorage.getItem('user_type') == 'astrologer' ?
    //     '006efe8d6b1140441a08bebc5595c120892IADy+JOYzKKLVTw1hjUXLG9dTgABI7Q/vsuR4ClJcGONLkSfCLV50nk2IgAeFlvq6E6paAQAAQB4C6hoAgB4C6hoAwB4C6hoBAB4C6ho' :
    //     '006efe8d6b1140441a08bebc5595c120892IACNExP6Ed8lzgFC50y8+R85X+XMw7sWD+79gHCp4o881ESfCLUqu57mIgAeFlvq2k6paAQAAQBqC6hoAgBqC6hoAwBqC6hoBABqC6ho'
    const [searchParams] = useSearchParams();
    const channel = searchParams.get("channel-name");
    const token = decodeURIComponent(searchParams.get("token"));

    // console.log("Channel:", channel);
    // console.log("Decoded Token:", token);

    return (
        <AgoraRTCProvider client={client}>
            <Basics channel={channel} token={token} client={client} />
        </AgoraRTCProvider>
    );
};

export default VideocallConsultation;