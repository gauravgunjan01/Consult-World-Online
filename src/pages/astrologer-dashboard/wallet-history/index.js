import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchSvg } from '../../../assets/svg';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { DeepSearchSpace, IndianRupee } from '../../../utils/common-function';
import * as UserActions from '../../../redux/actions/userAction';

const WalletHistory = () => {
    const dispatch = useDispatch();
    const { userAstrologerDetails, userAstrologerWalletHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userAstrologerWalletHistoryData, searchText);

    useEffect(() => {
        userAstrologerDetails && dispatch(UserActions?.getUserAstrologerWalletHistory());
    }, [userAstrologerDetails]);

    return (
        <>
            <section className='bg-white p-3 rounded-b-[3px]'>
                <main className='flex justify-between max-md:flex-wrap gap-5'>
                    <PageHeading title={'Wallet History'} />

                    <div className='flex gap-4 flex-wrap'>
                        <div className='rounded-md flex items-center max-sm:w-[90vw]'>
                            <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Let’s find what you’re looking for..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%] md:w-[200px] lg:w-[400px]' />
                            <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                        </div>
                    </div>
                </main>
            </section>

            <section className='bg-white p-3 rounded-[3px] mt-3'>
                <article>
                    <main>
                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate text-nowrap">
                                <thead>
                                    <tr className="text-sm shadow-sm text-white text-nowrap bg-primary">
                                        <th className="p-[12px_10px] font-[600]">Total Amount</th>
                                        <th className="p-[12px_10px] font-[600]">Created Date</th>
                                        <th className="p-[12px_10px] font-[600]">Reason</th>
                                        <th className="p-[12px_10px] font-[600]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userAstrologerWalletHistoryData && userAstrologerWalletHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none">{IndianRupee(value?.amount)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none">{moment(value?.createdAt)?.format("DD-MMM-YYYY")}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.reason || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </article>
            </section>
        </>
    )
}

export default WalletHistory;