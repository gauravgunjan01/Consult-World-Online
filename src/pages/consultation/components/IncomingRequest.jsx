import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CallSvg } from '../../../assets/svg';
import { toaster } from '../../../utils/services/toast-service';
import Logo from '../../../assets/images/logo/logo.png';
import soundFile from '../../../assets/audio/incoming.mp3';
import * as ConsultationActions from '../../../redux/actions/consultationAction';

const IncomingRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { incomingRequestData } = useSelector(state => state?.consultationReducer);
    // console.log({ incomingRequestData });

    const audioRef = useRef(null);
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);

    const handleRequest = ({ status }) => {
        const payload = {
            type: incomingRequestData?.customer_data?.type,
            data: { status, requested_data: incomingRequestData?.data },
            onAcceptVideocall: ({ channel_name, token }) => {
                localStorage?.removeItem('requestIncoming');
                localStorage?.removeItem('incomingRequestTimer');
                localStorage?.removeItem('incomingRequestCustomerData');
                dispatch(ConsultationActions?.incomingRequestData({ incoming: false, timer: 60, customer_data: null, data: JSON.parse(localStorage.getItem('incomingRequestData')) }));
                navigate(`/consultation/video-call-consultation?channel-name=${channel_name}&token=${encodeURIComponent(token)}`, { replace: true });
            },
            onAcceptVoicecall: ({ channel_name, token }) => {
                localStorage?.removeItem('requestIncoming');
                localStorage?.removeItem('incomingRequestTimer');
                localStorage?.removeItem('incomingRequestCustomerData');
                dispatch(ConsultationActions?.incomingRequestData({ incoming: false, timer: 60, customer_data: null, data: JSON.parse(localStorage.getItem('incomingRequestData')) }));
                navigate(`/consultation/voice-call-consultation?channel-name=${channel_name}&token=${encodeURIComponent(token)}`, { replace: true });
            },
            onAcceptChat: () => {
                navigate(`/consultation/chat-consultation?peer-id=${incomingRequestData?.data?.user_id}&customer=${incomingRequestData?.data?.user_id}&astrologer=${incomingRequestData?.data?.astroID}&chatId=${incomingRequestData?.data?.chatId}&profileId=${incomingRequestData?.data?.profileId}`, { replace: true });
                dispatch(ConsultationActions?.incomingRequestData({ incoming: false, timer: 60, customer_data: null, data: JSON.parse(localStorage.getItem('incomingRequestData')) }));
                localStorage?.removeItem('requestIncoming');
                localStorage?.removeItem('incomingRequestTimer');
                localStorage?.removeItem('incomingRequestCustomerData');
            },
            onReject: () => {
                // navigate(`/`);
                dispatch(ConsultationActions?.incomingRequestData({ incoming: false, timer: 60, customer_data: null, data: null }));
                localStorage?.removeItem('requestIncoming');
                localStorage?.removeItem('incomingRequestTimer');
                localStorage?.removeItem('incomingRequestCustomerData');
                localStorage?.removeItem('incomingRequestData');
            },
            onMissed: () => {
                // navigate(`/`);
                dispatch(ConsultationActions?.incomingRequestData({ incoming: false, timer: 60, customer_data: null, data: null }));
                localStorage?.removeItem('requestIncoming');
                localStorage?.removeItem('incomingRequestTimer');
                localStorage?.removeItem('incomingRequestCustomerData');
                localStorage?.removeItem('incomingRequestData');
            },
        };

        //! Dispatch 
        dispatch(ConsultationActions.handleIncomingRequestByConsultant(payload))

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    useEffect(() => {
        if (isSoundPlaying) {
            const audio = new Audio(soundFile);
            audio.loop = true;
            audio.play().catch(error => {
                console.log('Error playing sound:', error);
            });
            audioRef.current = audio;

            return () => {
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            };
        }
    }, [isSoundPlaying]);

    useEffect(() => {
        setIsSoundPlaying(true)
    }, []);

    useEffect(() => {
        let timerInterval;
        if (incomingRequestData.incoming && incomingRequestData.timer > 0) {

            timerInterval = setInterval(() => {
                dispatch(ConsultationActions?.incomingRequestData({ incoming: localStorage.getItem('requestIncoming'), timer: localStorage.getItem('incomingRequestTimer') - 1, customer_data: JSON.parse(localStorage.getItem('incomingRequestCustomerData')), data: JSON.parse(localStorage.getItem('incomingRequestData')) }));
                localStorage?.setItem('incomingRequestTimer', localStorage?.getItem('incomingRequestTimer') - 1);
            }, 1000);

        } else if (incomingRequestData.timer === 0) {
            dispatch(ConsultationActions?.incomingRequestData({ incoming: false, timer: 60, customer_data: null, data: null }));
            localStorage?.removeItem('requestIncoming');
            localStorage?.removeItem('incomingRequestTimer');
            localStorage?.removeItem('incomingRequestCustomerData');
            localStorage?.removeItem('incomingRequestData');
            handleRequest({ status: "Missed" });
            toaster.info({ text: 'You have missed the incoming request!' });
        }

        return () => clearInterval(timerInterval);
    }, [incomingRequestData.incoming, incomingRequestData.timer]);

    return (
        <>
            <div className='fixed inset-0 z-[1000] bg-transparent flex justify-center items-end pb-5'>
                <div className='bg-white rounded-md overflow-hidden'>
                    <div className='bg-gradient-to-tr from-primary via-pink-100/10 to-red-100/5 rounded-md px-5 py-4 flex items-center gap-5'>
                        <div>
                            <div className="flex justify-center">
                                <div className="relative w-16 h-16 rounded-full ring-2 ring-primary bg-white">
                                    <img src={incomingRequestData?.customer_data?.image || Logo} alt="Profile" className="w-full h-full rounded-full object-contain object-center" />
                                    <div className="absolute inset-0 rounded-full border-[6px] border-green-500 animate-ping" />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5 justify-between items-center'>
                            <div className='max-w-60'>
                                <p className='font-semibold capitalize'>{incomingRequestData?.customer_data?.name || 'Consult World Online'}</p>
                                <span className='bg-primary text-white rounded-md text-[13px] self-start px-2 capitalize'>{incomingRequestData?.customer_data?.type?.split('-')?.join(' ')}</span>
                                <p className='text-sm text-black'>Incoming request decline in <span className='text-red-600 font-medium'>{incomingRequestData?.timer} sec</span>.</p>
                            </div>

                            <div className="flex justify-center gap-8 mt-3">
                                <div onClick={() => handleRequest({ status: "Accept" })} className="flex flex-col items-center group cursor-pointer">
                                    <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md group-hover:animate-bounce">
                                        <CallSvg />
                                    </button>
                                    <p className="mt-1 text-xs text-green-400">Accept</p>
                                </div>
                                <div onClick={() => handleRequest({ status: "Reject" })} className="flex flex-col items-center group cursor-pointer">
                                    <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-md group-hover:animate-bounce">
                                        <CallSvg />
                                    </button>
                                    <p className="mt-1 text-xs text-red-400">Decline</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IncomingRequest;