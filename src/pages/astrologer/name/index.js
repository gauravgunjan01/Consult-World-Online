import { Expand, Shrink } from 'lucide-react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Color } from '../../../assets/colors';
import { api_urls } from '../../../utils/api-urls';
import { CallSvg, ChatSvg } from '../../../assets/svg';
import { IndianRupee } from '../../../utils/common-function';

import OnlinePing from '../../../components/features/OnlinePing';
import OfflinePing from '../../../components/features/OfflinePing';
import DataNotFound from '../../../components/common/DataNotFound';

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
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const { astrologerDataById, astrologerReviewDataById, astrologerFollowedStatusByCustomer } = useSelector(state => state?.astrologerReducer);

    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 100);
        setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 0);
    }, [location]);

    useEffect(() => {
        if (!astrologerId) navigate(-1);

        //! Dispatching API For Getting Single Astrologer
        dispatch(AstrologerActions.getAstrologerById({ astrologerId }));

        //! Dispatching API For Getting Single Astrologer Review
        dispatch(AstrologerActions.getAstrologerReviewById({ astrologerId: astrologerId }));

        dispatch(AstrologerActions?.getAstrologerFollowedStatusByCustomer({ customerId: userCustomerDataById?._id, astrologerId }));

    }, []);

    return (
        <>
            {isLoading ?
                <section className='space-y-3'>
                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                        {/* Top Section: Profile Info */}
                        <main className='flex gap-5 max-md:flex-col justify-between rounded-b-[3px] bg-[#F6F6F6] p-3 flex-1'>
                            <div className='flex max-md:flex-col gap-[20px]'>
                                <div className='rounded-md h-[300px] max-md:w-full w-[300px] border-2'><Skeleton height={'100%'} width={'100%'} /></div>

                                <main className='flex flex-col justify-center gap-4 text-lg rounded-[3px] p-[15px] w-full'>
                                    <div className='h-7 w-60'><Skeleton /></div>
                                    <div className='h-6 w-52'><Skeleton /></div>
                                    <div className='h-6 w-44'><Skeleton /></div>
                                    <div className='h-6 w-32'><Skeleton /></div>

                                    <div className='flex items-center gap-5 my-3'>
                                        <div className='h-6 w-40'><Skeleton /></div>
                                        <div className='h-6 w-40'><Skeleton /></div>
                                    </div>

                                    <div className='flex max-lg:flex-wrap gap-[20px]'>
                                        <div className='h-12 w-[280px] rounded-full'><Skeleton height="100%" /></div>
                                        <div className='h-12 w-[280px] rounded-full'><Skeleton height="100%" /></div>
                                    </div>
                                </main>
                            </div>

                            <div className='h-10 w-[160px] max-md:hidden self-start rounded-[30px]'><Skeleton height="100%" /></div>
                        </main>

                        {/* About Section */}
                        <div className='bg-[#F6F6F6] p-3 space-y-3 rounded-[3px]'>
                            <div className='h-7 w-32'><Skeleton /></div>
                            <div className='h-16 w-full'><Skeleton /></div>
                            <div className='h-5 w-24'><Skeleton /></div>
                        </div>

                        {/* Review Section */}
                        <div className='bg-[#F6F6F6] p-3 space-y-3 rounded-[3px]'>
                            <div className='h-7 w-32'><Skeleton /></div>
                            <main className='flex flex-col gap-3'>
                                {Array(3).fill('').map((_, index) => (
                                    <div key={index} className='bg-white rounded-[3px] p-5 flex flex-col gap-3'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex gap-4 items-center'>
                                                <div className='h-12 w-12 rounded-full'><Skeleton circle height="100%" width="100%" /></div>
                                                <div className='h-6 w-40'><Skeleton /></div>
                                            </div>
                                            <div className='h-5 w-24'><Skeleton /></div>
                                        </div>
                                        <div className='h-6 w-full'><Skeleton /></div>
                                    </div>
                                ))}
                            </main>
                        </div>
                    </SkeletonTheme>
                </section>
                :
                <section className='text-[15px] space-y-3'>
                    <div className='flex gap-5 max-md:flex-col justify-between rounded-b-[3px] bg-[#F6F6F6] p-3 flex-1'>
                        <div className='flex max-md:flex-col gap-[20px]'>
                            <img className='max-md:rounded-[3px] rounded-md h-[300px] max-md:h-[300px] max-md:w-full w-[300px] border-2 border-primary_text_dark' src={api_urls + astrologerDataById?.profileImage} />

                            <main className='flex flex-col justify-center gap-1.5 text-lg rounded-[3px] p-[15px]'>
                                <div className='line-clamp-1 font-semibold text-2xl capitalize'>{astrologerDataById?.astrologerName}</div>
                                <div className='line-clamp-1'>{astrologerDataById?.skill?.length > 0 && astrologerDataById?.skill?.map(value => value?.skill)?.join(' , ')}</div>
                                <div className='line-clamp-1'>{astrologerDataById?.language?.length > 0 ? astrologerDataById?.language?.join(' , ') : "Hindi"}</div>
                                <div>Exp : {astrologerDataById?.experience} Years</div>

                                <div className='flex items-center gap-5 my-3'>
                                    <div className='flex items-center gap-2'><ChatSvg color={Color?.black} /> {(astrologerDataById?.totalChatDuration / 6000)?.toFixed(1)}k mins</div>
                                    <div className='flex items-center gap-2'><CallSvg color={Color?.black} /> {(astrologerDataById?.totalCallDuration / 6000)?.toFixed(1)}k mins</div>
                                </div>

                                <div className='flex max-lg:flex-wrap gap-[20px]'>
                                    <button onClick={async () => {
                                        if (Number(userCustomerDataById?.wallet_balance) < (Number(astrologerDataById?.call_price) + Number(astrologerDataById?.commission_call_price)) * 5) {
                                            const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey });
                                            if (result.isConfirmed) navigate('/recharge');
                                        } else {
                                            if (userCustomerDataById) navigate(`/astrologer/intake-form/${astrologerDataById?._id}?type=call`);
                                            else dispatch(AuthActions.requestToggleCustomerLoginModal());
                                        }
                                    }} className={`flex items-center gap-2 bg-primary text-black px-2 py-[7px] rounded-full w-[280px]`}>
                                        <div className='bg-white p-2 rounded-full'><CallSvg h='25' w='25' color={Color?.black} /></div>
                                        <div className='flex justify-center items-center flex-1'>
                                            <div className='flex flex-col text-white'>
                                                <div className='line-clamp-1 text-center pr-5 text-white'>Start Call</div>
                                                <div className='pr-5'><span className='font-semibold'>{IndianRupee(Number(astrologerDataById?.call_price) + Number(astrologerDataById?.commission_call_price))}</span>/min</div>
                                            </div>
                                            {astrologerDataById?.call_status == 'online' ? <OnlinePing /> : <OfflinePing />}
                                        </div>
                                    </button>

                                    <button onClick={async () => {
                                        if (Number(userCustomerDataById?.wallet_balance) < (Number(astrologerDataById?.chat_price) + Number(astrologerDataById?.commission_chat_price)) * 5) {
                                            const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey });
                                            if (result.isConfirmed) navigate('/recharge');
                                        } else {
                                            if (userCustomerDataById) navigate(`/astrologer/intake-form/${astrologerDataById?._id}?type=chat`);
                                            else dispatch(AuthActions.requestToggleCustomerLoginModal());
                                        }
                                    }} className={`flex items-center gap-2 bg-primary text-black px-2 py-[7px] rounded-full w-[280px]`}>
                                        <div className='bg-white p-2 rounded-full'><ChatSvg h='25' w='25' color={Color?.black} /></div>
                                        <div className='flex justify-center items-center flex-1'>
                                            <div className='flex flex-col text-white'>
                                                <div className='line-clamp-1 text-center pr-5 text-white'>Start Chat</div>
                                                <div className='pr-5'><span className='font-semibold'>{IndianRupee(Number(astrologerDataById?.chat_price) + Number(astrologerDataById?.commission_chat_price))}</span>/min</div>
                                            </div>
                                            {astrologerDataById?.chat_status == 'online' ? <OnlinePing /> : <OfflinePing />}
                                        </div>
                                    </button>
                                </div>
                            </main>
                        </div>

                        <button onClick={() => {
                            if (!userCustomerDataById) dispatch(AuthActions.requestToggleCustomerLoginModal())
                            else dispatch(AstrologerActions?.followUnfollowAstrologer({ customerId: userCustomerDataById?._id, astrologerId, action: !astrologerFollowedStatusByCustomer ? 'follow' : 'unfollow' }))
                        }} className='bg-primary text-white max-md:hidden px-[50px] py-[7px] rounded-[30px] self-start'>{!astrologerFollowedStatusByCustomer ? 'Follow' : 'Unfollowed'}</button>
                    </div>

                    {/* About Section */}
                    <div className='bg-[#F6F6F6] p-3 space-y-3 rounded-[3px]'>
                        <h5 className='font-medium text-2xl'>About</h5>
                        <div className={`text-grey tracking-wide ${showMore ? '' : 'line-clamp-2'} transition-all duration-500`}>{astrologerDataById?.long_bio}</div>

                        <button onClick={() => setShowMore(!showMore)} className="text-blue-600 flex items-center gap-1 text-sm font-medium" >
                            {showMore ? (<><Shrink size={14} /> Show Less</>) : (<><Expand size={14} /> Show More</>)}
                        </button>
                    </div>

                    {/* Review Section */}
                    <div className='bg-[#F6F6F6] p-3 space-y-3 rounded-t-[3px]'>
                        <h6 className='font-medium text-xl'>User Review</h6>
                        <main className='flex flex-col gap-3'>
                            {astrologerReviewDataById.length > 0 ? astrologerReviewDataById.map((value, index) => (
                                <main key={index} className='bg-white rounded-[3px] p-5 flex flex-col gap-2'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-4 items-center'>
                                            <div><img src={api_urls + 'uploads/' + value?.customer?.image} className='h-12 w-12 rounded-[50%]' /></div>
                                            <div className='text-lg'>{value?.customer?.customerName}</div>
                                        </div>
                                        <div className='flex gap-0 text-gray-600'><ReactStars count={5} edit={false} value={value?.ratings} size={24} color2={'#ffd700'} /></div>
                                    </div>
                                    <div className='capitalize'>{value?.comments?.toLowerCase()}</div>
                                </main>
                            )) : <DataNotFound />}
                        </main>
                    </div>
                </section>
            }
        </>
    )
}

export default SingleAstrologer;