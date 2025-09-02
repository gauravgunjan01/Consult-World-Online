import moment from 'moment';
import Zoom from 'react-medium-image-zoom';
import React, { useEffect, useState } from 'react';
import { api_urls } from '../../../utils/api-urls';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatBg from '../../../assets/images/chat/chat-bg.png';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { GroupMessagesByDate, IndianRupee, SecondToHMS } from '../../../utils/common-function';
import { database, ref, push, onValue, serverTimestamp, set } from '../../../config/firebase-config';
import 'react-medium-image-zoom/dist/styles.css';

const ChatSummary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const customerId = location?.state?.customerId;
    const astrologerId = location?.state?.astrologerId;
    const historyData = location?.state?.historyData;

    const [messages, setMessages] = useState([]);
    const groupedMessages = GroupMessagesByDate(messages);

    const current_user_id = localStorage.getItem('current_user_id');
    const current_user_data = JSON.parse(localStorage.getItem('current_user_data'));

    const currentUser = {
        _id: localStorage.getItem('user_type') === 'astrologer' ? `astro_${current_user_id}` : `customer_${current_user_id}`,
        name: current_user_data?.astrologerName || current_user_data?.customerName,
        image: localStorage.getItem('user_type') === 'astrologer' ? api_urls + current_user_data?.profileImage : api_urls + 'uploads/' + current_user_data?.image,
    };

    const chat_id = `customer_${customerId}_astro_${astrologerId}`;

    // Todo : Get Message From Database 
    useEffect(() => {
        const messagesRef = ref(database, `ChatMessages/${chat_id}`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
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
    }, [chat_id]);

    useEffect(() => {
        if (!historyData) navigate('/');
    }, []);

    return (
        <>
            <TopHeaderSection />

            <div className="flex flex-col max-md:h-[calc(100vh-70.5px)] h-[calc(100vh-94.5px)]">
                <div className='bg-primary px-5 py-2'>
                    <div className='flex items-center gap-3'>
                        <div><img src={api_urls + historyData?.astrologerId?.profileImage} className='h-16 w-16 rounded-full' /></div >
                        <div>
                            <div className='capitalize'>{historyData?.astrologerId?.astrologerName}</div>
                            {/* <div className='text-xs'>{IndianRupee(Number(historyData?.astrologerId?.chat_price) + Number(historyData?.astrologerId?.commission_chat_price))}/min</div> */}
                            <div className='text-xs text-green-600'>{SecondToHMS(historyData?.duration)}</div>
                            <div className='text-xs font-semibold text-red-500'>Chat has ended</div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4" style={{ backgroundImage: `url(${ChatBg})` }}>
                    {Object.keys(groupedMessages).map((date, index) => (
                        <div key={index}>
                            <div className="text-center my-4 text-gray-500">{moment(date).format('MMMM Do, YYYY')}</div>

                            {groupedMessages[date].map((message, index) => (
                                <div key={index} className={`flex ${message.user.id === currentUser._id ? 'justify-end' : 'justify-start'} my-2`}>
                                    <div>
                                        {!message.images ?
                                            message?.text?.match(/Replying to:\s*"([^"]+)"/) ?
                                                <div className='flex gap-1 relative group/item'>
                                                    {/* <div className={`cursor-pointer ${message.user.id === currentUser._id ? 'text-black' : 'text-black'} absolute z-10 right-2 top-2 invisible group-hover/item:visible`}><DownArrowHeadSvg /></div> */}
                                                    {message.user.id !== currentUser._id && <img src={message?.user?.image} className='h-4 w-4 rounded-full' />}
                                                    <div className='flex'>
                                                        {message.user.id !== currentUser._id && <div className='p-1 bg-white border-l-2 border-t border-primary self-start rounded-bl-full'></div>}
                                                        <div className={`relative max-w-xs p-1 shadow-md ${message.user.id === currentUser._id ? 'bg-[#6f6d4f] text-white rounded-lg' : 'bg-white text-black rounded-lg rounded-tl-none'} break-words`}>
                                                            <div className='bg-[#EFEFEF] rounded-md p-2 border-l-4 border-primary text-sm text-[#555]'>{message?.text?.match(/Replying to:\s*"([^"]+)"/)[1]}</div>
                                                            <div className='p-2'>
                                                                <div className='text-[14px]'>{message?.text?.split('\n').pop().trim()}</div>
                                                                <div className={`text-xs text-end mt-1`}>{moment(message.createdAt).format('h:mm A')}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className='flex gap-1 relative group/item'>
                                                    {message.user.id !== currentUser._id && <img src={message?.user?.image} className='h-4 w-4 rounded-full' />}
                                                    {/* <div className={`cursor-pointer ${message.user.id === currentUser._id ? 'text-white bg-[#6F6D4F] opacity-70' : 'text-black'} absolute z-10 right-2 top-2 invisible group-hover/item:visible`}><DownArrowHeadSvg /></div> */}
                                                    <div className='flex'>
                                                        {message.user.id !== currentUser._id && <div className='p-1 bg-white border-l-2 border-t border-primary self-start rounded-bl-full'></div>}
                                                        <div className={`relative max-w-xs p-3 shadow-md ${message.user.id === currentUser._id ? 'bg-[#6f6d4f] text-white rounded-lg' : 'bg-white text-black rounded-lg rounded-tl-none'} break-words`}>
                                                            {message.user.id !== currentUser._id && <div className='text-xs text-primary'>{message?.user?.name}</div>}
                                                            <div className='text-[14px]'>{message.text?.split('\n')?.map((line, index) => <p key={index}>{line?.trim()}</p>)}</div>
                                                            <div className={`text-xs text-end mt-1`}>{moment(message.createdAt).format('h:mm A')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            :
                                            <div className='flex gap-1 mt-2'>
                                                {message.user.id !== currentUser._id && <img src={message?.user?.image} className='h-4 w-4 rounded-full' />}
                                                <div className='flex'>
                                                    {message.user.id !== currentUser._id && <div className='p-1 bg-white border-l-2 border-t border-primary self-start rounded-bl-full'></div>}
                                                    <div className='relative max-w-80 cursor-pointer flex flex-col bg-white rounded-lg'>
                                                        {message.user.id !== currentUser._id && <div className='text-xs text-primary bg-white px-3 pt-2 rounded-tr-lg'>{message?.user?.name}</div>}
                                                        <div className='p-2 flex  flex-wrap gap-2'>
                                                            {message?.images?.map((image, index) => (
                                                                <Zoom>
                                                                    <img key={index} src={image} alt="attachment" className="min-w-36 max-w-36 min-h-36 max-h-36 rounded-lg basis-[50%]" />
                                                                </Zoom>
                                                            ))}
                                                        </div>
                                                        <div className="text-xs text-white absolute z-10 right-2 bottom-2">{moment(message.createdAt).format('h:mm A')}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default ChatSummary;