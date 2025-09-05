
import moment from 'moment';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ExpandIcon, MessageCircle, MinimizeIcon, Phone, Video } from 'lucide-react';

import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';

import OnlinePing from '../../../components/features/OnlinePing';
import OfflinePing from '../../../components/features/OfflinePing';
import DataNotFound from '../../../components/common/DataNotFound';
import AstrologerGallerySwiper from '../components/AstrologerGallerySwiper';

import * as AuthActions from '../../../redux/actions/authAction';
import * as AstrologerActions from '../../../redux/actions/astrologerAction';

import '../../../assets/css/swiper.css';
Modal.setAppElement('#root');

const SingleAstrologer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const astrologerId = searchParams.get('id');

    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state?.commonReducer);
    const { userCustomerDetails } = useSelector(state => state?.userReducer);
    const { astrologerDetails, astrologerReviewsData, astrologerFollowedStatusByCustomer } = useSelector(state => state?.astrologerReducer);

    const [isReadMore, setIsReadMore] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        window.scrollTo(0, 100);
        setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 0);
    }, [location]);

    useEffect(() => {
        if (!astrologerId) navigate(-1);

        //! Dispatching API
        dispatch(AstrologerActions.getAstrologerDetails({ astrologerId }));
        // dispatch(AstrologerActions.getAstrologerReviews({ astrologerId: astrologerId }));
        // dispatch(AstrologerActions?.getAstrologerFollowedStatusByCustomer({ customerId: userCustomerDetails?._id, astrologerId }));
    }, []);

    return (
        <>
            <div className="p-5 lg:grid grid-cols-10 gap-5 max-lg:space-y-5 select-none bg-white">
                <div className="lg:col-span-6 space-y-4">
                    <div className='flex max-md:flex-wrap-reverse justify-between gap-5'>
                        <div className='space-y-4 flex-1'>
                            <div>
                                <h1 className="text-xl font-semibold text-[#3c5f41]">{astrologerDetails?.name}</h1>
                                <p className='text-gray-500 text-sm'>{astrologerDetails?.tag_line || 'Vedic Astrology'}</p>
                            </div>

                            <div>
                                <p className='font-semibold text-base'>About Me</p>
                                <p className='text-justify line-clamp-6'>{astrologerDetails?.about}</p>
                            </div>

                            <div className='flex gap-2'>
                                <button className={`bg-secondary text-white text-sm outline-none py-2 px-5 rounded-full transition duration-500 transform`}>Start Chat</button>
                                <button className={`bg-secondary text-white text-sm outline-none py-2 px-5 rounded-full transition duration-500 transform`}>Start Chat</button>
                                <button className={`bg-secondary text-white text-sm outline-none py-2 px-5 rounded-full transition duration-500 transform`}>Start Chat</button>
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <p className='font-semibold text-base'>Experience</p>
                                    <p>{astrologerDetails?.experience} years</p>
                                </div>

                                <div>
                                    <p className='font-semibold text-base'>Language</p>
                                    <p className='text-justify'>{astrologerDetails?.language?.length > 0 && astrologerDetails?.language?.map(value => value?.title)?.join(', ')}</p>
                                </div>
                            </div>

                            <div>
                                <p className='font-semibold text-base'>Skill</p>
                                <p className='text-justify'>{astrologerDetails?.skill?.length > 0 && astrologerDetails?.skill?.map(value => value?.title)?.join(', ')}</p>
                            </div>

                            <div className='space-y-2'>
                                <p className='font-semibold text-base'>Expertise</p>
                                <div className='flex flex-wrap gap-2'>
                                    {astrologerDetails?.expertise?.length > 0 &&
                                        astrologerDetails?.expertise?.map((value, index) => {
                                            const colors = ["bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400", "bg-indigo-400", "bg-teal-400",];
                                            // const randomColor = colors[Math.floor(Math.random() * colors.length)];
                                            const randomColor = colors[index % colors.length];
                                            return (
                                                <span
                                                    key={index}
                                                    className={`bg-gray-300 px-4 pt-1 pb-0.5 rounded-xl text-black`}
                                                // className={`${randomColor} px-4 pt-1 pb-0.5 rounded-xl text-white`}
                                                >
                                                    {value?.title}
                                                </span>
                                            );
                                        })}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <p className='font-semibold text-base'>Concerns I can help with</p>
                                <ul className='list-disc ml-5 space-y-1'>
                                    {astrologerDetails?.remedies?.length > 0 &&
                                        astrologerDetails?.remedies?.map((value, index) => (
                                            <li key={index} className='text-gray-700'>{value?.title}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>

                        <div className='space-y-3 text-center'>
                            <img loading="lazy" src={astrologerDetails?.image ? api_urls + astrologerDetails?.image : 'https://astrosky.blob.core.windows.net/astrosky/vivek.webp'} className="w-60 h-60 rounded-md object-fill" />

                            <button onClick={() => {
                                if (!userCustomerDetails) dispatch(AuthActions.requestToggleCustomerLoginModal())
                                else dispatch(AstrologerActions?.followUnfollowAstrologer({ customerId: userCustomerDetails?._id, astrologerId, action: !astrologerFollowedStatusByCustomer ? 'follow' : 'unfollow' }))
                            }} className=' text-xs bg-[#EF4444] text-white max-lg:hidden px-[30px] py-[7px] rounded-[30px] self-start'>{!astrologerFollowedStatusByCustomer ? 'Follow' : 'Unfollowed'}</button>
                        </div>
                    </div>

                    <div className="text-sm text-gray-700 leading-relaxed">
                        <div
                            className={`space-y-2 text-base leading-relaxed text-justify ${isReadMore ? '' : 'line-clamp-5'} transition-all duration-500`}
                            dangerouslySetInnerHTML={{
                                __html: astrologerDetails?.long_bio?.replace(
                                    /(<ul>)/g,
                                    '<ul class="list-disc pl-6 space-y-2">'
                                ).replace(
                                    /(<li>)/g,
                                    '<li class="text-gray-700 leading-relaxed">'
                                ).replace(
                                    /(<p>)/g,
                                    '<p class="">'
                                ).replace(
                                    /(<strong>)/g,
                                    '<strong class="font-semibold text-black">'
                                )
                            }}
                        />

                        <button onClick={() => setIsReadMore(!isReadMore)} className="flex items-center gap-1 text-green-800 text-sm font-medium mt-1" >
                            {isReadMore ?
                                <>Show less <MinimizeIcon size={14} /></> :
                                <>Read more <ExpandIcon size={14} /></>
                            }
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                    <div className="lg:border rounded-md lg:p-4 space-y-5">
                        <div className='space-y-2'>
                            <h3 className="text-md font-semibold text-gray-800">Photos & Videos</h3>
                            <AstrologerGallerySwiper data={[{}, {}, {}, {}, {}, {}]} />
                        </div>

                        <div className='space-y-2'>
                            <h3 className="text-md font-semibold text-gray-800">What type of session would you like?</h3>
                            <div className="flex gap-3">
                                {[
                                    { title: "Video", value: "videocall", icon: <Video size={18} /> },
                                    { title: "Voice", value: "call", icon: <Phone size={18} /> },
                                    { title: "Chat", value: "chat", icon: <MessageCircle size={18} /> },
                                ]?.map((item) => (
                                    <button
                                        key={item?.value}
                                        onClick={() => { setModalData({ ...modalData, consultation_type: item?.value }) }}
                                        className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-md border transition-all duration-300 ${modalData?.consultation_type === item?.value
                                            ? "bg-gradient-to-r from-primary to-secondary text-white border-none"
                                            : "border-gray-300 text-gray-600 hover:bg-gradient-to-r from-primary to-secondary hover:text-white hover:border-none"
                                            }`}
                                    >
                                        {item?.icon}
                                        <span className="text-[13px] font-medium">{item?.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <h4 className="font-semibold text-gray-800">Session</h4>
                            <div className="flex gap-3">
                                {/* {astrologerDetails?.consultationPrices?.sort((a, b) => a?.duration - b?.duration)?.map((slot, index) => ( */}
                                {[{ price: 2500, duration: 15 }, { price: 4500, duration: 30 }, { price: 5500, duration: 45 }]?.map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => { setModalData({ ...modalData, price: slot?.price, duration_minutes: slot?.duration + "min", }); }}
                                        className={`flex flex-col items-center justify-center w-24 py-1 rounded-md border transition-all duration-300 text-sm ${modalData?.duration_minutes === slot?.duration + 'min'
                                            ? "bg-gradient-to-r from-primary to-secondary text-white border-none"
                                            : "border-gray-300 text-gray-700 hover:bg-gradient-to-r from-primary to-secondary hover:text-white hover:border-none"
                                            }`}
                                    >
                                        <span className='font-semibold'>{slot?.duration} Min</span>
                                        <span className="font-medium">₹{slot?.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800">Available Slots</h4>
                            {/* <AvailableSlotSwiper data={astrologerSlotDateData} astrologerId={astrologerId} duration_minutes={modalData?.duration_minutes} /> */}
                        </div>

                        <div className="space-y-8 pb-3">
                            {/* {astrologerSlotTimeByDateData?.SlotTimeByDuration?.[modalData?.duration_minutes]?.length > 0
                                ?
                                <AvailableSlotTimeSwiper data={astrologerSlotTimeByDateData} selectedSlot={modalData?.selectedSlot} duration_minutes={modalData?.duration_minutes} handleSelect={(slot) => setModalData((prev) => ({ ...prev, selectedSlot: slot }))} />
                                :
                                <p className="text-gray-400 italic">No slots available</p>
                            } */}
                        </div>

                        <div className="mt-5">
                            <button disabled={!modalData?.selectedSlot} className={`w-full shadow-lg ${!!modalData?.selectedSlot ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary hover:brightness-125"} focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded transition duration-500 transform`}>Book Session</button>
                        </div>

                        {/*   

                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800">Available Slots</h4>
                            <AvailableSlotSwiper data={astrologerSlotDateData} astrologerId={astrologerId} duration_minutes={modalData?.duration_minutes} />
                        </div>

                        <div className="space-y-8 pb-3">
                            {astrologerSlotTimeByDateData?.SlotTimeByDuration?.[modalData?.duration_minutes]?.length > 0
                                ?
                                <AvailableSlotTimeSwiper data={astrologerSlotTimeByDateData} selectedSlot={modalData?.selectedSlot} duration_minutes={modalData?.duration_minutes} handleSelect={(slot) => setModalData((prev) => ({ ...prev, selectedSlot: slot }))} />
                                :
                                <p className="text-gray-400 italic">No slots available</p>
                            }
                        </div>

                        <div className="mt-5">
                            <button onClick={handleBookNow} disabled={!modalData?.selectedSlot} className="w-full py-3 rounded-lg bg-[#EF4444] text-white font-semibold disabled:bg-gray-400">Book Consultation</button>
                        </div>*/}
                    </div>
                </div>

                <div className="col-span-9">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h2>

                    <div className="space-y-4">
                        {astrologerReviewsData?.length > 0 ? (
                            astrologerReviewsData?.map((review) => (
                                <div key={review?._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white" >
                                    <div className="flex items-center gap-3 mb-2">
                                        <img loading="lazy" src={api_urls + 'uploads/' + review?.customerImage} alt={review?.customerName} className="w-12 h-12 rounded-full object-contain border" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800 flex items-center gap-1">
                                                {review?.customerName}
                                                {review?.is_verified && (
                                                    <span className="ml-1 px-2 py-0.5 text-[10px] bg-green-100 text-green-700 rounded-full">
                                                        Verified
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(review?.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <svg key={idx} xmlns="http://www.w3.org/2000/svg" fill={idx < review?.rating ? "gold" : "none"} viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-yellow-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.7.664.322.987l-4.19 3.602a.563.563 0 00-.182.557l1.287 5.385c.114.477-.398.85-.81.593l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885c-.412.257-.924-.116-.81-.593l1.287-5.385a.563.563 0 00-.182-.557L2.542 10.384a.563.563 0 01.322-.987l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className="text-gray-700">{review?.reviewText}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleAstrologer;