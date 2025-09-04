import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { SearchSvg, SwitchOffSvg, SwitchOnSvg, WalletSvg } from '../../../assets/svg';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../../utils/common-function';
// import UserAstrologerWithdrawalRequest from '../../../components/modal/UserAstrologerWithdrawalRequest';
import * as UserActions from '../../../redux/actions/userAction';
import DataNotFound from '../../../components/common/DataNotFound';

const MyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAstrologerDetails, userAstrologerTransactionHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userAstrologerTransactionHistoryData, searchText);
    const [withdrawalModelOpen, setWithdrawalModelOpen] = useState(false);

    useEffect(() => {
        // userAstrologerDetails && dispatch(UserActions?.getUserAstrologerTransactionHistory({ count: 5 }));
    }, [userAstrologerDetails]);

    return (
        <section className='space-y-3'>
            <div className='py-5 px-5 bg-[#E5D18E90] border border-primary rounded-[3px] flex items-center justify-between flex-wrap gap-10'>
                <div className='flex gap-10 items-end justify-between flex-wrap'>
                    <img src={api_urls + userAstrologerDetails?.profileImage} className='h-40 w-40 object-contain border border-white rounded-md' />

                    <div className='text-[15px] pb-2'>
                        <div className='font-semibold text-lg text-primary'>{userAstrologerDetails?.astrologerName}</div>
                        <div>{userAstrologerDetails?.email}</div>
                        <div>{userAstrologerDetails?.phoneNumber}</div>
                        <div>{userAstrologerDetails?.gender}, {moment(userAstrologerDetails?.dateOfBirth)?.format('DD-MMM-YYYY')}</div>
                        <div>{userAstrologerDetails?.city + ','} {userAstrologerDetails?.state + ','} {userAstrologerDetails?.country + '-'} {userAstrologerDetails?.zipCode}</div>
                    </div>
                </div>

                <div className='flex flex-col gap-2 min-w-64'>
                    {/* <div className='flex items-center gap-2 cursor-pointer'><div className='basis-[75%] text-nowrap'>Change Chat Status: </div> <div onClick={() => dispatch(UserActions?.changeUserAstrologerChatStatus({ data: { astrologerId: userAstrologerDetails?._id, chat_status: userAstrologerDetails?.chat_status == "online" ? "offline" : "online" }, }))} className='basis-[20%]'>{userAstrologerDetails?.chat_status == "online" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div> </div>
                    <div className='flex items-center gap-2 cursor-pointer'><div className='basis-[75%] text-nowrap'>Change Call Status: </div> <div onClick={() => dispatch(UserActions?.changeUserAstrologerCallStatus({ data: { astrologerId: userAstrologerDetails?._id, call_status: userAstrologerDetails?.call_status == "online" ? "offline" : "online" }, }))} className='basis-[20%]'>{userAstrologerDetails?.call_status == "online" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div> </div>
                    <div className='flex items-center gap-2 cursor-pointer'><div className='basis-[75%] text-nowrap'>Change Video Call Status: </div> <div onClick={() => dispatch(UserActions?.changeUserAstrologerVideoCallStatus({ data: { astrologerId: userAstrologerDetails?._id, video_call_status: userAstrologerDetails?.video_call_status == "online" ? "offline" : "online" }, }))} className='basis-[20%]'>{userAstrologerDetails?.video_call_status == "online" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div> </div> */}
                </div>
            </div>

            <div className='border border-primary rounded-[3px] p-5 flex items-center justify-between flex-wrap gap-5 bg-[#E5D18E90]'>
                <div className='flex gap-5 items-center flex-wrap text-nowrap'>
                    <div className='flex items-center gap-3'><WalletSvg /> Today's Earning : {IndianRupee(userAstrologerDetails?.today_earnings?.earnings)}</div>
                    <div className='flex items-center gap-3'><WalletSvg /> Total Earning : {IndianRupee(userAstrologerDetails?.wallet_balance)}</div>
                </div>
            </div>

            <section className='bg-white p-3 rounded-[3px] space-y-3'>
                <div className='flex max-md:flex-col justify-between gap-5'>
                    <PageHeading title={'Transaction History'} />
                    <button onClick={() => navigate('/astrologer-dashboard/transaction-history')} className='border border-primary px-8 max-md:px-5 py-1.5 rounded-[3px] text-primary hover:bg-primary hover:text-black bg-white text-sm transition-all duration-500 ease-in text-nowrap'>See more</button>
                </div>

                <main>
                    <div className="border w-full border-gray-100 flex items-start rounded-md overflow-x-scroll custom-scrollbar">
                        <table className="w-full text-left border-separate text-nowrap">
                            <thead>
                                <tr className="text-sm shadow-sm text-nowrap bg-primary text-white">
                                    <th className="p-[12px_9px] font-[600]">Customer Name</th>
                                    <th className="p-[12px_9px] font-[600]">Service Type</th>
                                    <th className="p-[12px_9px] font-[600]">Total Amount</th>
                                    <th className="p-[12px_9px] font-[600]">Duration</th>
                                    <th className="p-[12px_9px] font-[600]">Date</th>
                                    <th className="p-[12px_9px] font-[600]">Start Time</th>
                                    <th className="p-[12px_9px] font-[600]">End Time</th>
                                    <th className="p-[12px_9px] font-[600]">Platform Charges</th>
                                    <th className="p-[12px_9px] font-[600]">Astrologer Earning</th>
                                </tr>
                            </thead>
                            <tbody className='text-gray-800'>
                                {userAstrologerTransactionHistoryData && userAstrologerTransactionHistoryData?.map((value, index) => (
                                    <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                        <td className="w-[400px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.customerId?.customerName}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.type?.split('_')?.join(' ')}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{IndianRupee(value?.totalPrice)}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{SecondToHMS(value?.duration)}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.type == 'call' || value?.type == 'VideoCall' || value?.type == 'live_video_call' ? moment(value?.startTime).format('hh:mm:ss a') : moment(Number(value?.startTime)).format('hh:mm:ss a')}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(Number(value?.endTime)).format('hh:mm:ss a')}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{IndianRupee(value?.adminPrice)}</td>
                                        <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{IndianRupee(value?.partnerPrice)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {userAstrologerTransactionHistoryData && userAstrologerTransactionHistoryData?.length <= 0 && <DataNotFound />}
                </main>
            </section>

            {/* <UserAstrologerWithdrawalRequest isOpen={withdrawalModelOpen} handleClose={() => setWithdrawalModelOpen(false)} /> */}
        </section>
    )
}

export default MyAccount;