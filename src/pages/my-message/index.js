import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls';
import DataNotFound from '../../components/common/DataNotFound';
import { database, ref, onValue } from '../../config/firebase-config';
import * as UserActions from '../../redux/actions/userAction';

const MyMessage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDetails, userCustomerCompletedQueueListData } = useSelector(state => state?.userReducer);

    const [lastMessages, setLastMessages] = useState({});
    const [messageCounts, setMessageCounts] = useState({});

    // console.log("Last Messages :::", lastMessages);
    // console.log("Message Counts :::", messageCounts);

    const fetchLastMessage = (queue_chat_id) => {
        const messagesRef = ref(database, `ChatQueueMessages/${queue_chat_id}`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = [];

            for (let key in data) {
                const message = data[key];
                loadedMessages.push({ ...message, createdAt: new Date(message.createdAt), user: { id: message?.user?._id, name: message?.user?.name, image: message?.user?.image }, });
            }

            loadedMessages.sort((a, b) => b.createdAt - a.createdAt);
            if (loadedMessages.length > 0) {
                setLastMessages(prevState => ({ ...prevState, [queue_chat_id]: loadedMessages[0]?.message, }));

                // Update the message count
                setMessageCounts((prevState) => ({
                    ...prevState,
                    [queue_chat_id]: loadedMessages.length,
                }));
            }
        });
    };

    useEffect(() => {
        userCustomerDetails && dispatch(UserActions?.getUserCustomerCompletedQueueList());
    }, [userCustomerDetails]);

    useEffect(() => {
        if (userCustomerCompletedQueueListData) {
            userCustomerCompletedQueueListData.forEach(value => {
                const queue_chat_id = `customer_${value?.customerId}_astrologer_${value?.astrologerId?._id}`;
                fetchLastMessage(queue_chat_id);
            });
        }
    }, [userCustomerCompletedQueueListData]);

    console.log((userCustomerCompletedQueueListData?.filter(value => !value?.customerRead))?.length)

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3 rounded-t-[3px]'>
                    <div className='text-black text-xl font-medium max-md:px-10 font-[500]rounded-full text-nowrap'>My Message</div>
                </div>

                <section className={`bg-white p-3 rounded-[3px]`}>
                    <main className='flex flex-col gap-x-5 gap-y-8'>
                        {userCustomerCompletedQueueListData && userCustomerCompletedQueueListData?.map((value, index) => {
                            let queue_chat_id = `customer_${value?.customerId}_astrologer_${value?.astrologerId?._id}`;
                            let lastMessage = lastMessages[queue_chat_id];
                            let messageCount = messageCounts[queue_chat_id] || 0;
                            return (
                                <div key={index} className={`${value?.customerRead ? 'bg-[#F4C56B]' : 'bg-gray-200'} rounded-md px-5 py-2 flex gap-5`}>
                                    <div><img src={api_urls + value?.profileImage} className='h-16 w-16 rounded-full' /></div>
                                    <div className='flex-1 cursor-pointer' onClick={() => { dispatch(UserActions.updateUserCustomerCompletedQueueListReadStatus({ queueId: value?.queues[value?.queues?.length - 1]?._id })); navigate(`/my-message/chat-message?name=${value?.astrologerName?.split(' ')?.join('-')?.toLowerCase()}&id=${value?.queues[value?.queues?.length - 1]?.astrologerId}`) }}>
                                        <p className='text-lg'>{value?.astrologerName}</p>
                                        {/* <p>{lastMessage || "No messages yet"}</p> */}
                                        <p>{value?.queues[value?.queues?.length - 1]?.type}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </main>

                    {!userCustomerCompletedQueueListData && <DataNotFound />}
                </section>
            </section>
        </>
    );
}

export default MyMessage;