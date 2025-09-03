import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Color } from '../../../assets/colors';
import { api_urls } from '../../../utils/api-urls';
import { CallSvg, ChatSvg } from '../../../assets/svg';
import WebLogo from '../../../assets/images/logo/logo.png';
import { IndianRupee } from '../../../utils/common-function';
import { generateTokenByRequestPermission } from '../../../config/firebase-config';
import * as AuthActions from '../../../redux/actions/authAction';
import { LucideVideo } from 'lucide-react';

const ConsultantCard = ({ astrologer }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const handleOpenLoginCustomerModal = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            dispatch(AuthActions.toggleCustomerLoginModal(true));
        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
    };

    return (
        <>
            <div className="relative overflow-hidden bg-white rounded-[3px] p-4 flex gap-4 border border-secondary" >
                <div className='max-md:hidden bg-black text-[#AE852C] px-5 py-0.5 absolute z-10 -rotate-[40deg] w-44 top-[30px] -left-[45px] text-nowrap text-center text-xs'>{astrologer?.title || 'Rising Star'}</div>
                <Link to={`/astrologer/details?name=${astrologer?.astrologerName?.split(' ')?.join('-')?.toLowerCase()}&id=${astrologer?._id}`} className=' self-end'><img src={astrologer?.profileImage ? api_urls + astrologer?.profileImage : WebLogo} alt={astrologer?.astrologerName} className="max-md:hidden w-16 h-16 rounded-full object-cover border-2 border-green-500" /></Link>

                <div className="flex-1 text-sm text-gray-600">
                    <Link to={`/astrologer/details?name=${astrologer?.astrologerName?.split(' ')?.join('-')?.toLowerCase()}&id=${astrologer?._id}`} className='space-y-1'>
                        <h3 className="font-semibold text-lg text-[#000]">{astrologer?.astrologerName}</h3>
                        <p className="text-sm text-gray-700">{astrologer?.expertise}</p>

                        <p className='line-clamp-1'>{astrologer?.skill?.length > 0 && astrologer?.skill?.map(item => item?.skill)?.join(' , ')}</p>
                        <p>Language: {astrologer?.language.length > 0 ? astrologer?.language.join(', ') : "Hindi"}</p>

                        <div className='flex items-center flex-wrap text-nowrap gap-1 text-primary font-medium'>
                            {(location?.pathname === '/chat-with-consultant') && (
                                <div>Chat Price: {IndianRupee(Number(astrologer?.chat_price) + Number(astrologer?.commission_chat_price))}/min</div>
                            )}

                            {(location?.pathname === '/talk-to-consultant') && (
                                <div>Call Price: {IndianRupee(Number(astrologer?.call_price) + Number(astrologer?.commission_call_price))}/min</div>
                            )}

                            {(location?.pathname === '/video-call-with-consultant') && (
                                <div>Video Call Price: {IndianRupee(Number(astrologer?.video_call_price) + Number(astrologer?.commission_video_call_price))}/min</div>
                            )}
                        </div>
                    </Link>

                    <div className='flex items-center flex-wrap text-nowrap gap-2 pt-2'>
                        {(location?.pathname === '/chat-with-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                            if (Number(userCustomerDataById?.wallet_balance) < (Number(astrologer?.chat_price) + Number(astrologer?.commission_chat_price)) * 5) {
                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.secondary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: 'grey' });
                                if (result.isConfirmed) navigate('/recharge');
                            } else {
                                if (!("Notification" in window)) {
                                    alert("This browser does not support desktop notifications.");
                                } else if (Notification.permission === "granted") {
                                    if (userCustomerDataById) {
                                        navigate(`/astrologer/intake-form/${astrologer?._id}?type=chat`);
                                    } else {
                                        handleOpenLoginCustomerModal();
                                    }
                                } else if (Notification.permission === "denied") {
                                    alert("You have blocked notifications. Please enable them in your browser settings.");

                                } else if (Notification.permission === "default") {
                                    console.log('Requesting Notification Permission');
                                    await Notification.requestPermission();
                                }
                            }
                        }} className={`relative px-3 py-0.5 flex gap-1 justify-center items-center border ${astrologer?.chat_status == 'online' ? 'text-[#27AE60] border-[#27AE60]' : 'text-red-500 border-red-500'} rounded-full`}>
                            <ChatSvg h='13' w='13' color={astrologer?.chat_status == 'online' ? '#27AE60' : 'red'} />
                            <div className='text-[13.5px] font-semibold'>Chat</div>
                        </button>}

                        {(location?.pathname === '/talk-to-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                            if (Number(userCustomerDataById?.wallet_balance) < (Number(astrologer?.call_price) + Number(astrologer?.commission_call_price)) * 5) {
                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.secondary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: 'grey' });
                                if (result.isConfirmed) navigate('/recharge');
                            } else {
                                if (!("Notification" in window)) {
                                    alert("This browser does not support desktop notifications.");
                                } else if (Notification.permission === "granted") {
                                    if (userCustomerDataById) {
                                        navigate(`/astrologer/intake-form/${astrologer?._id}?type=voice-call`);
                                    } else {
                                        handleOpenLoginCustomerModal();
                                    }
                                } else if (Notification.permission === "denied") {
                                    alert("You have blocked notifications. Please enable them in your browser settings.");

                                } else if (Notification.permission === "default") {
                                    console.log('Requesting Notification Permission');
                                    await Notification.requestPermission();
                                }
                            }
                        }} className={`relative px-3 py-0.5 flex gap-1 justify-center items-center border ${astrologer?.call_status == 'online' ? 'text-[#27AE60] border-[#27AE60]' : 'text-red-500 border-red-500'} rounded-full`}>
                            <CallSvg h='13' w='13' color={astrologer?.call_status == 'online' ? '#27AE60' : 'red'} />
                            <div className='text-[13.5px] font-semibold'>Voice Call</div>
                        </button>}

                        {(location?.pathname === '/video-call-with-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                            if (Number(userCustomerDataById?.wallet_balance) < (Number(astrologer?.chat_price) + Number(astrologer?.commission_chat_price)) * 5) {
                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.secondary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: 'grey' });
                                if (result.isConfirmed) navigate('/recharge');
                            } else {
                                if (!("Notification" in window)) {
                                    alert("This browser does not support desktop notifications.");
                                } else if (Notification.permission === "granted") {
                                    if (userCustomerDataById) {
                                        navigate(`/astrologer/intake-form/${astrologer?._id}?type=video-call`);
                                    } else {
                                        handleOpenLoginCustomerModal();
                                    }
                                } else if (Notification.permission === "denied") {
                                    alert("You have blocked notifications. Please enable them in your browser settings.");

                                } else if (Notification.permission === "default") {
                                    console.log('Requesting Notification Permission');
                                    await Notification.requestPermission();
                                }
                            }
                        }} className={`relative px-3 py-0.5 flex gap-1 justify-center items-center border ${astrologer?.video_call_status == 'online' ? 'text-[#27AE60] border-[#27AE60]' : 'text-red-500 border-red-500'} rounded-full`}>
                            <LucideVideo size={16} color={astrologer?.video_call_status == 'online' ? '#27AE60' : 'red'} />
                            <div className='text-[13.5px] font-semibold'>Video Call</div>
                        </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultantCard;