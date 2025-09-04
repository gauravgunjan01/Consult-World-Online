import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchSvg } from '../../../assets/svg';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../../utils/common-function';
import * as UserActions from '../../../redux/actions/userAction';
import DataNotFound from '../../../components/common/DataNotFound';

const TransactionHistory = () => {
    const dispatch = useDispatch();
    const { userAstrologerDetails, userAstrologerTransactionHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userAstrologerTransactionHistoryData, searchText);

    useEffect(() => {
        userAstrologerDetails && dispatch(UserActions?.getUserAstrologerTransactionHistory());
    }, [userAstrologerDetails]);

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
                                {userAstrologerTransactionHistoryData && filteredData?.map((value, index) => (
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
                    {filteredData?.length <= 0 && <DataNotFound />}
                </div>
            </section>
        </>
    )
}

export default TransactionHistory;