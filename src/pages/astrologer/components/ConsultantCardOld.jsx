import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LucideVideo, MessageCircleMore, PhoneCall } from 'lucide-react';

import { api_urls } from '../../../utils/api-urls';
import { FormatSlotDate } from '../../../utils/common-function';

import Logo from '../../../assets/images/logo/logo.png';
import * as AuthActions from '../../../redux/actions/authAction';

const ConsultantCard = ({ astrologer }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userCustomerDetails } = useSelector(state => state?.userReducer);

    return (
        <>
            <div className='grid grid-cols-12 gap-[20px] rounded-md p-4 capitalize shadow-md'>
                <div className='col-span-12 lg:col-span-3 space-y-5 self-start'>
                    <div className='h-32 max-lg:h-32 w-32 max-lg:w-32 self-start'>
                        <img loading="lazy" className='h-full w-full rounded-t-xl' src={astrologer?.image ? api_urls + astrologer?.image : Logo} />
                    </div>

                    <div className='py-2'>
                        <p className='text-xs text-gray-400'>Next available slot</p>
                        <div className='text-sm text-[#EF4444] font-medium text-wrap'>{FormatSlotDate(astrologer?.nextAvailableSlot)}</div>
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-9 flex-1'>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 capitalize">{astrologer?.name}</h2>
                            <p className="text-sm text-gray-400 font-normal -mt-1">{astrologer?.tag_line || 'Vedic Astrology'}</p>
                        </div>
                        <div className="flex items-center text-base font-medium">
                            {Array.from({ length: 5 }, (_, i) => {
                                const rating = astrologer?.rating || 4.9;
                                const fullStars = Math.floor(rating);
                                const hasHalfStar = rating % 1 >= 0.5;
                                const isAlmostFull = rating >= 4.8; // ✅ agar rating 4.8 ya usse jyada hai toh 5 full stars

                                if (isAlmostFull) {
                                    return <span key={i} className="text-green-400">★</span>;
                                } else if (i < fullStars) {
                                    return <span key={i} className="text-green-400">★</span>;
                                } else if (i === fullStars && hasHalfStar) {
                                    return <span key={i} className="text-green-400">☆</span>; // half star ke jagah icon bhi use kar sakte
                                } else {
                                    return <span key={i} className="text-gray-300">★</span>;
                                }
                            })}
                            {astrologer?.rating ? <span className="text-gray-500 text-xs ml-1">({astrologer?.rating} reviews)</span> : ''}
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">Counselling ({astrologer?.experience}+ yrs of experience)</p>
                    <p className='text-sm text-black mt-1 line-clamp-2'>{astrologer?.expertise?.length > 0 && astrologer?.expertise?.map(item => item?.title)?.join(' , ') || 'Self Discovery, Anxiety, Self Esteem and Confidence'}</p>
                    <p className='text-sm text-black mt-1 line-clamp-2'>{astrologer?.about}</p>
                    <p className='text-sm text-black mt-1 line-clamp-2'>Languages: {astrologer?.language?.length > 0 && astrologer?.language?.map(item => item?.title)?.join(' , ') || 'Hindi'}</p>

                    <p className="text-sm text-gray-900 font-semibold mt-2">
                        {(() => {
                            const minSlot = astrologer?.consultationPrices?.sort((a, b) => a?.price - b?.price)?.[0];
                            return <div className="font-medium">₹{minSlot?.price || 100} for {minSlot?.duration?.slotDuration || 15} min session</div>;
                            // return <>{minSlot && <div className="font-medium">₹{minSlot?.price} for {minSlot?.duration?.slotDuration || 15} min consultation</div>}</>;
                        })()}
                    </p>

                    <hr className='my-3' />

                    <div className='flex items-center justify-between gap-5'>
                        <div className="flex gap-3">
                            {[
                                { title: "Video", value: "videocall", icon: <LucideVideo size={18} /> },
                                { title: "Voice", value: "call", icon: <PhoneCall size={18} /> },
                                { title: "Chat", value: "chat", icon: <MessageCircleMore size={18} /> },
                            ]?.map((item) => (
                                <button
                                    key={item?.value}
                                    className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-md border transition-all duration-300 ${false
                                        ? "bg-gradient-to-r from-primary to-secondary text-white border-none"
                                        : "border-gray-300 text-gray-600 hover:bg-gradient-to-r from-primary to-secondary hover:text-white hover:border-none"
                                        }`}
                                >
                                    {item?.icon}
                                    <span className="text-[13px] font-medium">{item?.title}</span>
                                </button>
                            ))}
                        </div>

                        <div onClick={() => navigate(`/astrologer/details?name=${astrologer?.name?.split(' ')?.join('-')?.toLowerCase()}&id=${astrologer?._id}`)} className='cursor-pointer justify-self-end border rounded-2xl px-5 py-2 font-medium'>Book Session</div>
                    </div>

                    <div className='flex justify-end'>
                        <div className='flex items-center flex-wrap text-nowrap gap-2 pt-2'>
                            {/* {(location?.pathname === '/chat-with-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                                if (Number(userCustomerDetails?.wallet_balance) < (Number(astrologer?.chat_price) + Number(astrologer?.commission_chat_price)) * 5) {
                                    const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", cancelButtonText: "Cancel", showCancelButton: true });
                                    if (result.isConfirmed) navigate('/recharge');
                                } else {
                                    if (userCustomerDetails) navigate(`/astrologer/intake-form/${astrologer?._id}?type=chat`);
                                    else dispatch(AuthActions.requestToggleCustomerLoginModal());
                                }
                            }} className={`relative px-3 py-0.5 flex gap-1 justify-center items-center border ${astrologer?.chat_status == 'online' ? 'text-[#27AE60] border-[#27AE60]' : 'text-red-500 border-red-500'} rounded-full`}>
                                <MessageCircleMore size={18} />
                                <div className='text-[13.5px] font-semibold'>Chat</div>
                            </button>} */}

                            {(location?.pathname === '/talk-to-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                                if (Number(userCustomerDetails?.wallet_balance) < (Number(astrologer?.call_price) + Number(astrologer?.call_commission_price)) * 5) {
                                    const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", cancelButtonText: "Cancel", showCancelButton: true });
                                    if (result.isConfirmed) navigate('/recharge');
                                } else {
                                    if (userCustomerDetails) navigate(`/astrologer/intake-form/${astrologer?._id}?type=voice-call`);
                                    else dispatch(AuthActions.requestToggleCustomerLoginModal());
                                }
                            }}
                                className={`flex items-center justify-center gap-1 rounded-2xl px-5 py-2 border font-medium transition-all duration-300 hover:bg-gradient-to-r from-primary to-secondary hover:text-white hover:border-transparent border-gray-300 text-gray-600`}
                            >
                                <PhoneCall size={18} />
                                <div className='text-[13.5px] font-semibold'>{Number(astrologer?.call_price) + Number(astrologer?.call_commission_price)}/min</div>
                            </button>}

                            {/* {(location?.pathname === '/video-call-with-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                                if (Number(userCustomerDetails?.wallet_balance) < (Number(astrologer?.chat_price) + Number(astrologer?.commission_chat_price)) * 5) {
                                    const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", cancelButtonText: "Cancel", showCancelButton: true });
                                    if (result.isConfirmed) navigate('/recharge');
                                } else {
                                    if (userCustomerDetails) navigate(`/astrologer/intake-form/${astrologer?._id}?type=video-call`);
                                    else dispatch(AuthActions.requestToggleCustomerLoginModal());
                                }
                            }} className={`relative px-3 py-0.5 flex gap-1 justify-center items-center border ${astrologer?.video_call_status == 'online' ? 'text-[#27AE60] border-[#27AE60]' : 'text-red-500 border-red-500'} rounded-full`}>
                                <LucideVideo size={16} color={astrologer?.video_call_status == 'online' ? '#27AE60' : 'red'} />
                                <div className='text-[13.5px] font-semibold'>Video Call</div>
                            </button>} */}
                        </div>

                        <div onClick={() => navigate(`/astrologer/details?name=${astrologer?.name?.split(' ')?.join('-')?.toLowerCase()}&id=${astrologer?._id}`)} className='cursor-pointer justify-self-end border rounded-2xl px-5 py-2 font-medium'>Book Session</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ConsultantCard;