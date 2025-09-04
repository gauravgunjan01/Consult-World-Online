import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChatSvg } from '../../../assets/svg';
import { api_urls } from '../../../utils/api-urls';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as UserActions from '../../../redux/actions/userAction';

const Queuelist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAstrologerDetails, userAstrologerPendingQueueListData } = useSelector(state => state?.userReducer);

    useEffect(() => {
        userAstrologerDetails && dispatch(UserActions?.getUserAstrologerPendingQueueList());
    }, [userAstrologerDetails]);

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3 rounded-t-[3px]'>
                    <div className='text-black text-xl font-medium max-md:px-10 font-[500]rounded-full text-nowrap'>Queue List</div>
                </div>

                <div className={`bg-white p-3 rounded-[3px]`}>
                    {userAstrologerPendingQueueListData &&
                        <main className='flex flex-col gap-x-5 gap-y-8'>
                            {userAstrologerPendingQueueListData?.map((value, index) => (
                                <div key={index} className='bg-primary rounded-[3px] px-5 py-2 flex items-center gap-5'>
                                    <div><img src={api_urls + 'uploads/' + value?.customerDetails?.image} className='h-16 w-16 rounded-full' /></div>
                                    <div className='flex-1 flex justify-between items-center'>
                                        <div className='text-white'>
                                            <p className='text-lg'>{value?.customerDetails?.customerName}</p>
                                            <p className='text-sm'>{value?.queues[value?.queues?.length - 1]?.type}</p>
                                        </div>

                                        <div onClick={() => { dispatch(UserActions.updateUserAstrologerPendingQueueListStatus({ queueId: value?.queues[value?.queues?.length - 1]?._id })); navigate(`/astrologer-dashboard/my-message/queue-chat-message?name=${value?.customerDetails?.customerName?.split(' ')?.join('-')?.toLowerCase()}&id=${value?.customerDetails?._id}`) }} className='cursor-pointer p-3'><ChatSvg color='white' /></div>
                                    </div>
                                </div>
                            ))}
                        </main>
                    }

                    {!userAstrologerPendingQueueListData &&
                        <section className={`xl:px-96 lg:px-60 md:px-32 sm:px-10 px-4 py-16 flex items-center justify-center`}>
                            <img src='https://img.freepik.com/premium-vector/no-data-concept-illustration_634196-28497.jpg?semt=ais_hybrid' className='bg-primary p-5 h-80 max-h-80' />
                        </section>}
                </div>
            </section>
        </>
    )
}

export default Queuelist;