import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { database, ref, push, onValue, serverTimestamp, set } from '../../../../config/firebase-config';
import { AttachmentBtnSvg, SendBtnSvg } from '../../../../assets/svg';
import { api_urls } from '../../../../utils/api-urls';
import ChatBg from '../../../../assets/images/chat/chat-bg.png';
import { GroupMessagesByDate } from '../../../../utils/common-function';
import TopHeaderSection from '../../../../components/common/TopHeaderSection';
import * as UserActions from '../../../../redux/actions/userAction';

const QueueChatMessage = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const customerId = searchParams.get('id');
    const customer_name = searchParams.get('name');
    const { userAstrologerDataById, userQueuePredefinedMessageData } = useSelector(state => state?.userReducer);
    const userQueuePredefinedMessageDataFilter = userQueuePredefinedMessageData && userQueuePredefinedMessageData?.filter(value => value?.type == "Astrologer")

    const [isOpenPredefinedMessage, setIsOpenPredefinedMessage] = useState(false);
    const [inputField, setInputField] = useState('');
    const [messages, setMessages] = useState([]);
    const groupedMessages = GroupMessagesByDate(messages);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const currentUser = {
        _id: userAstrologerDataById?._id,
        name: userAstrologerDataById?.astrologerName,
        image: userAstrologerDataById?.profileImage,
    };
    const queue_chat_id = `customer_${customerId}_astrologer_${userAstrologerDataById?._id}`;

    // Todo : Get Message From Database 
    useEffect(() => {
        const messagesRef = ref(database, `ChatQueueMessages/${queue_chat_id}`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Data :::", data)
            const loadedMessages = [];

            for (let key in data) {
                const message = data[key];
                loadedMessages.push({
                    ...message,
                    createdAt: new Date(message.createdAt),
                    user: { id: message?.user?._id, name: message?.user?.name, image: message?.user?.image },
                });
            }
            setMessages(loadedMessages);
        });
    }, [queue_chat_id]);

    //! Handle Send : Text
    const handleSend = async (text) => {
        if (!text.trim()) return;

        const message = {
            _id: Math.random().toString(36).substr(2, 9),
            message: text,
            // user: currentUser,
            createdAt: new Date().getTime(),
            addedAt: serverTimestamp(),
        };

        const chatNode = push(ref(database, `ChatQueueMessages/${queue_chat_id}`));
        const newKey = chatNode.key;
        const chatRef = ref(database, `ChatQueueMessages/${queue_chat_id}/${newKey}`);
        await set(chatRef, { ...message, pending: false, sent: true, received: false });

        setInputField('');
    };

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserQueuePredefinedMessage());
    }, [userAstrologerDataById]);

    //! Scroll Down the Chat 
    useEffect(() => {
        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        };

        scrollToBottom();
    }, [messages]);

    return (
        <>
            <TopHeaderSection />

            <section className="flex flex-col max-md:h-[calc(100vh-70.5px)] h-[calc(100vh-94.5px)]">
                <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4" style={{ backgroundImage: `url(${ChatBg})` }}>
                    {Object.keys(groupedMessages).map((date, index) => (
                        <div key={index}>
                            <div className="text-center my-4 text-gray-500">{moment(date).format('MMMM Do, YYYY')}</div>

                            {groupedMessages[date].map((message, index) => (
                                <div key={index} className={`flex ${message.user.name != 'Customer' ? 'justify-end' : 'justify-start'} my-2`}>
                                    {/* <div key={index} className={`flex ${message.user.id === currentUser._id ? 'justify-end' : 'justify-start'} my-2`}> */}
                                    <div>
                                        <div className='flex gap-1'>
                                            {/* {message.user.id !== currentUser._id && <img src={message?.user?.image} className='h-4 w-4 rounded-full' />} */}
                                            <div className='flex'>
                                                {message.user.id !== currentUser._id && <div className='p-1 bg-white border-l-2 border-t border-primary self-start rounded-bl-full'></div>}
                                                <div className={`relative max-w-xs p-3 shadow-md ${message.user.name != 'Customer' ? 'bg-[#6f6d4f] text-white rounded-lg' : 'bg-white text-black rounded-lg rounded-tl-none'} break-words`}>
                                                    {/* {message.user.id !== currentUser._id && <div className='text-xs text-primary'>{message?.user?.name}</div>} */}
                                                    <div className='text-[14px]'>{message.message}</div>
                                                    <div className={`text-xs text-end mt-1`}>{moment(message.createdAt).format('h:mm A')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="relative flex-shrink-0 p-4 bg-white border-t flex items-center">
                    <button onClick={() => setIsOpenPredefinedMessage(!isOpenPredefinedMessage)} className="p-2 text-primary rounded-lg"><AttachmentBtnSvg /></button>
                    <input type="text" disabled value={inputField} placeholder="Type a message" className="flex-grow p-2 mx-2 border border-gray-300 rounded-lg outline-none" onChange={(e) => setInputField(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSend(e.target.value); e.target.value = ''; setInputField('') } }} />
                    <button onClick={() => handleSend(inputField)} className="p-2 text-primary rounded-lg"><SendBtnSvg /></button>

                    <section className={`bg-[#F5C770] rounded-md absolute left-[10px] bottom-[90px] overflow-y-scroll custom-scrollbar flex flex-col gap-3 ${isOpenPredefinedMessage ? 'h-60 w-80 p-3' : 'h-0 w-0'} transition-all duration-500`}>
                        {userQueuePredefinedMessageDataFilter && userQueuePredefinedMessageDataFilter?.map((value, index) => (
                            <div key={index} onClick={() => { handleSend(value?.message); setIsOpenPredefinedMessage(false) }} className='border border-primary px-2 py-1 cursor-pointer'>{value?.message}</div>
                        ))}
                    </section>
                </div >

            </section >
        </>
    )
}

export default QueueChatMessage;