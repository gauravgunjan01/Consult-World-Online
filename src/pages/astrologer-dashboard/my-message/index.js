import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import DataNotFound from '../../../components/common/DataNotFound';
import * as UserActions from '../../../redux/actions/userAction';

const MyMessage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAstrologerDetails, userAstrologerCompletedQueueListData } = useSelector(state => state?.userReducer);

    useEffect(() => {
        userAstrologerDetails && dispatch(UserActions?.getUserAstrologerCompletedQueueList());
    }, [userAstrologerDetails]);

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3 rounded-t-[3px]'>
                    <div className='text-black text-xl font-medium max-md:px-10 font-[500]rounded-full text-nowrap'>My Message</div>
                </div>

                <section className={`bg-white p-3 rounded-[3px]`}>
                    <main className='flex flex-col gap-x-5 gap-y-8'>
                        {userAstrologerCompletedQueueListData && userAstrologerCompletedQueueListData?.map((value, index) => (
                            <div key={index} className='bg-[#E5E7EB] rounded-md px-5 py-2 flex items-center gap-5'>
                                <div><img src={api_urls + 'uploads/' + value?.image} className='h-16 w-16 rounded-full' /></div>
                                <div className='flex-1 cursor-pointer' onClick={() => navigate(`/astrologer-dashboard/my-message/queue-chat-message?name=${value?.customerName?.split(' ')?.join('-')?.toLowerCase()}&id=${value?.records[value?.records?.length - 1]?.customerId}`)}>
                                    <p className='text-lg'>{value?.customerName}</p>
                                    <p className='text-sm'>{value?.records[value?.records?.length - 1]?.type}</p>
                                </div>
                            </div>
                        ))}
                    </main>

                    {!userAstrologerCompletedQueueListData && <DataNotFound />}
                </section>
            </section>
        </>
    )
}

export default MyMessage;