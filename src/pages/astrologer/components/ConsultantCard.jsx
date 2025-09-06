import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LucideVideo, MessageCircleMore, PhoneCall } from 'lucide-react';

import { api_urls } from '../../../utils/api-urls';
import { FormatSlotDate, IndianRupee } from '../../../utils/common-function';

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
                <div className='col-span-12 lg:col-span-3 space-y-2 self-start'>
                    <div className='h-32 max-lg:h-32 w-32 max-lg:w-32 self-start'>
                        <img loading="lazy" className='h-full w-full rounded-t-xl' src={astrologer?.image ? api_urls + astrologer?.image : Logo} />
                    </div>
                    <p className='text-xs text-black line-clamp-2'>{astrologer?.language?.length > 0 && astrologer?.language?.map(item => item?.title)?.join(' , ') || 'Hindi'}</p>

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
                    <p className='text-sm text-black mt-1 line-clamp-1'>{astrologer?.about || 'With 3 year of experience'}</p>
                    {/* <p className='text-sm text-black mt-1 line-clamp-2'>L   anguages: {astrologer?.language?.length > 0 && astrologer?.language?.map(item => item?.title)?.join(' , ') || 'Hindi'}</p> */}

                    <div className='text-sm text-gray-900 font-medium mt-2'>
                        {(location?.pathname === '/chat-with-consultant') && (
                            <p>Chat Price: {IndianRupee(Number(astrologer?.chat_price) + Number(astrologer?.chat_commission_price))}/min</p>
                        )}

                        {(location?.pathname === '/talk-to-consultant') && (
                            <p>Call Price: {IndianRupee(Number(astrologer?.call_price) + Number(astrologer?.call_commission_price))}/min</p>
                        )}

                        {(location?.pathname === '/video-call-with-consultant') && (
                            <p>Video Call Price: {IndianRupee(Number(astrologer?.video_call_price) + Number(astrologer?.video_call_commission_price))}/min</p>
                        )}
                    </div>

                    <p className="text-sm text-gray-900 font-medium mt-2">
                        {(() => {
                            const minSlot = astrologer?.consultationPrices?.sort((a, b) => a?.price - b?.price)?.[0];
                            return <div>₹{minSlot?.price || 100} for {minSlot?.duration?.slotDuration || 15} min session</div>;
                            // return <>{minSlot && <div className="font-medium">₹{minSlot?.price} for {minSlot?.duration?.slotDuration || 15} min consultation</div>}</>;
                        })()}
                    </p>

                    <hr className='my-3' />

                    <div className='flex items-center justify-end flex-wrap text-nowrap gap-2'>
                        {(location?.pathname === '/chat-with-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                            if (Number(userCustomerDetails?.wallet_balance) < (Number(astrologer?.chat_price) + Number(astrologer?.commission_chat_price)) * 5) {
                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", cancelButtonText: "Cancel", showCancelButton: true });
                                if (result.isConfirmed) navigate('/recharge');
                            } else {
                                if (userCustomerDetails) navigate(`/astrologer/intake-form/${astrologer?._id}?type=chat`);
                                else dispatch(AuthActions.requestToggleCustomerLoginModal());
                            }
                        }} className={`border rounded-2xl px-5 py-2 font-medium ${astrologer?.chat_status == 'online' ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}>
                            Start Chat
                        </button>}

                        {(location?.pathname === '/talk-to-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                            if (Number(userCustomerDetails?.wallet_balance) < (Number(astrologer?.call_price) + Number(astrologer?.call_commission_price)) * 5) {
                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", cancelButtonText: "Cancel", showCancelButton: true });
                                if (result.isConfirmed) navigate('/recharge');
                            } else {
                                if (userCustomerDetails) navigate(`/astrologer/intake-form/${astrologer?._id}?type=voice-call`);
                                else dispatch(AuthActions.requestToggleCustomerLoginModal());
                            }
                        }} className={`border rounded-2xl px-5 py-2 font-medium ${astrologer?.call_status == 'online' ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}>
                            Start Voice Call
                        </button>}

                        {(location?.pathname === '/video-call-with-consultant' || (location?.pathname !== '/chat-with-consultant' && location?.pathname !== '/talk-to-consultant' && location?.pathname !== '/video-call-with-consultant')) && <button onClick={async () => {
                            if (Number(userCustomerDetails?.wallet_balance) < (Number(astrologer?.video_call_price) + Number(astrologer?.video_call_commission_price)) * 5) {
                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", cancelButtonText: "Cancel", showCancelButton: true });
                                if (result.isConfirmed) navigate('/recharge');
                            } else {
                                if (userCustomerDetails) navigate(`/astrologer/intake-form/${astrologer?._id}?type=video-call`);
                                else dispatch(AuthActions.requestToggleCustomerLoginModal());
                            }
                        }} className={`border rounded-2xl px-5 py-2 font-medium ${astrologer?.video_call_status == 'online' ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}>
                            Start Video Call
                        </button>}

                        {location?.pathname !== '/' && <button onClick={() => navigate(`/astrologer/details?name=${astrologer?.name?.split(' ')?.join('-')?.toLowerCase()}&id=${astrologer?._id}`)} className='border rounded-2xl px-5 py-2 font-medium hover:bg-gradient-to-r from-primary to-secondary hover:text-white hover:border-transparent'>Book Session</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultantCard;