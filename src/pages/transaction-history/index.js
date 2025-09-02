import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as UserActions from '../../redux/actions/userAction';
import { SearchSvg, WhatsappSvg } from '../../assets/svg';
import PageHeading from '../../components/common/PageHeading';
import Logo from '../../assets/images/logo/logo.png';
import { api_urls, web_urls } from '../../utils/api-urls';
import DataNotFound from '../../components/common/DataNotFound';

const TransactionHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userCustomerTransactionHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userCustomerTransactionHistoryData, searchText);

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerTransactionHistory());
    }, [userCustomerDataById]);

    const handleShareToWhatsApp = (value) => {
        const text = `${web_urls}transaction-history/whatsapp-chat-summary?customer_id=${value?.customerId?._id}&astrologer_id=${value?.astrologerId?._id}&duration=${value?.duration}&astrologerName=${value?.astrologerId?.astrologerName?.split(' ')?.join('-')?.toLowerCase()}&astrologerProfileImage=${api_urls + value?.astrologerId?.profileImage}`

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3 rounded-b-[3px]'>
                    <main className='flex justify-between max-md:flex-wrap gap-5'>
                        <PageHeading title={'Transaction History'} />

                        <div className='flex gap-4 flex-wrap'>
                            <div className='rounded-md flex items-center max-sm:w-[90vw]'>
                                <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Let’s find what you’re looking for..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%] md:w-[200px] lg:w-[400px]' />
                                <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                            </div>
                        </div>
                    </main>
                </div>

                <div className='bg-white p-3 rounded-[3px]'>
                    <main className='grid md:grid-cols-3 gap-3 text-[#919191] text-[15px]'>
                        {userCustomerTransactionHistoryData && filteredData?.map((value, index) => (
                            <div key={index} className='rounded-[3px] p-4 capitalize border-b-8 border-secondary' style={{ boxShadow: "0 0 10px #EFEFEF" }}>
                                <div>Order Id : {value?.transactionId}</div>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='text-black font-[500] text-base'>{value?.astrologerId?.astrologerName}</div>
                                        <div>{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</div>
                                        {(value?.type !== 'Wallet Recharge' && value?.type !== 'puja' && value?.type !== 'Astromall') && <>
                                            {/* <div className='text-red-500'>Rate : {value?.chargePerMinutePrice}/min</div> */}
                                            <div>Start Time {value?.type == 'call' || value?.type == 'VideoCall' || value?.type == 'live_video_call' ? moment(value?.startTime).format('hh:mm:ss a') : moment(Number(value?.startTime)).format('hh:mm:ss a')}</div>
                                            <div>End Time {moment(Number(value?.endTime)).format('hh:mm:ss a')}</div>
                                            <div className='text-green-500'>Duration : {SecondToHMS(value?.duration)}</div>
                                        </>}
                                        {value?.type !== 'Wallet Recharge' ? <div className='text-red-500'>Total Deduction : ₹{Number(value?.totalPrice || value?.amount)?.toFixed(2)}</div> : <div className='text-green-500'>Credited Amount: ₹{Number(value?.totalPrice)?.toFixed(2)}</div>}
                                    </div>
                                    <div className='flex flex-col items-end gap-1'>
                                        {(value?.type !== 'Wallet Recharge' && value?.type !== 'puja' && value?.type !== 'Astromall') && <>
                                            <img src={api_urls + value?.astrologerId?.profileImage || Logo} className='h-12 w-12 rounded-full border border-primary' />
                                            {/* <div className='text-sm'>{IndianRupee(Number(value?.astrologerId?.chat_price) + Number(value?.astrologerId?.commission_chat_price))}/min</div> */}
                                        </>}
                                        {value?.type == 'chat' ? <button onClick={() => navigate(`/transaction-history/chat-summary?${value?.astrologerId?.astrologerName?.split(' ')?.join('-')?.toLowerCase()}&${value?.customerId?.customerName?.split(' ')?.join('-')?.toLowerCase()}`, { state: { astrologerId: value?.astrologerId?._id, customerId: value?.customerId?._id, historyData: value } })} className='border border-primary px-3.5 py-0.5 text-sm rounded-md'>Chat</button> : <div className='border border-primary px-3.5 py-0.5 text-sm rounded-md'>{value?.type}</div>}
                                    </div>
                                </div>
                                {value?.type == 'chat' && <div onClick={() => handleShareToWhatsApp(value)} className='border px-3 py-0.5 rounded-md text-black flex items-center self-start gap-3 mt-5 cursor-pointer'><WhatsappSvg w='20' h='20' /> Share with you friends</div>}
                            </div>
                        ))}
                    </main>
                    {filteredData?.length <= 0 && <DataNotFound />}
                </div>
            </section>
        </>
    )
}

export default TransactionHistory;