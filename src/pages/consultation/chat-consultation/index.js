import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { database, ref, push, onValue, serverTimestamp, set } from '../../../config/firebase-config';
import { api_urls, web_urls } from '../../../utils/api-urls';
import ChatBg from '../../../assets/images/chat/chat-bg.png';
import { AttachmentBtnSvg, ChatCloseSvg, CrossSvg, DownArrowHeadSvg, PujaSvg, RightArrowHeadSvg, SendBtnSvg } from '../../../assets/svg';
import { generateRandomNumber, GroupMessagesByDate } from '../../../utils/common-function';
import ChatInvoiceModal from '../../../components/modal/ChatInvoiceModal';
import { useDispatch, useSelector } from 'react-redux';
import ChatRating from '../../../components/features/ChatRating';
import ChatInvoiceAstrologerModal from '../../../components/modal/ChatInvoiceAstrologerModal';
import SocketService from '../../../utils/services/socket-service';
import * as ConsultationActions from '../../../redux/actions/consultationAction';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Color } from '../../../assets/colors';
import { toaster } from '../../../utils/services/toast-service';
import RecordNotFound from '../../../components/features/RecordNotFound';
import * as UserActions from '../../../redux/actions/userAction';
import CurrentRequestTimerCountDown from '../components/CurrentRequestTimerCountDown';

const Chat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const customer_id = searchParams.get('customer');
    const astrologer_id = searchParams.get('astrologer');
    const profileId = searchParams.get('profileId');
    const chatId = searchParams.get('chatId');
    const { currentRequestData } = useSelector(state => state?.consultationReducer);
    const { socketConnectionStatus } = useSelector(state => state?.commonReducer);
    const { hideChatMessageInputField, astrologerRatingVisibility } = useSelector(state => state?.consultationReducer)
    const { userAstrologerDataById, userAstrologerRegisteredPujaHistoryData } = useSelector(state => state?.userReducer);

    const [inputField, setInputField] = useState('');

    const current_user_id = localStorage.getItem('current_user_id');
    const current_user_data = JSON.parse(localStorage.getItem('current_user_data'));
    // console.log("Current User Data: " + current_user_data?.customerName);
    // console.log("Current User Data: " + current_user_data?.image);
    // console.log("Current User Data: " + api_urls + 'uploads/' + current_user_data?.image);
    // console.log(localStorage.getItem('user_type') === 'astrologer' ? api_urls + current_user_data?.profileImage : api_urls + 'uploads/' + current_user_data?.image)

    const currentUser = {
        _id: localStorage.getItem('user_type') === 'astrologer' ? `astro_${current_user_id}` : `customer_${current_user_id}`,
        name: current_user_data?.astrologerName || current_user_data?.customerName,
        image: localStorage.getItem('user_type') === 'astrologer' ? api_urls + current_user_data?.profileImage : api_urls + 'uploads/' + current_user_data?.image,
    };

    const [replyMessages, setReplyMessages] = useState(null);
    const [messages, setMessages] = useState([]);
    const groupedMessages = GroupMessagesByDate(messages);
    // console.log("messages", messages);
    // console.log("Group messages", groupedMessages)'
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const chat_id = `customer_${customer_id}_astro_${astrologer_id}`;

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

    //! Handle Send : Text
    const handleSend = async (text) => {
        if (!text.trim()) return;
        let message;

        if (replyMessages) {
            message = {
                _id: Math.random().toString(36).substr(2, 9),
                text: `Replying to: "${replyMessages}"\n\n${text}`,
                user: currentUser,
                createdAt: new Date().getTime(),
                addedAt: serverTimestamp(),
            };
        } else {
            message = {
                _id: Math.random().toString(36).substr(2, 9),
                text,
                user: currentUser,
                createdAt: new Date().getTime(),
                addedAt: serverTimestamp(),
            };
        }

        console.log(message);

        const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
        const newKey = chatNode.key;
        const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
        await set(chatRef, { ...message, pending: false, sent: true, received: false });

        setInputField('');
        setReplyMessages(null);
    };

    let [bulkImage, setBulkImage] = useState([]);

    //! Handle Send : Image
    const handleSendFile = async () => {
        const uploadedImages = [];

        for (let i = 0; i < bulkImage?.length; i++) {
            const formData = new FormData();
            formData.append('fileType', 'image');
            formData.append('filePath', bulkImage[i]?.bytes);

            const { data } = await axios.post(api_urls + 'api/customers/store-file', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log("API Data ::: ", data);

            if (data?.success) {
                uploadedImages.push(api_urls + data?.data?.filePath);
            }
        };

        if (uploadedImages?.length > 0) {
            const message = { _id: generateRandomNumber(), text: '', images: uploadedImages, user: currentUser, createdAt: new Date().getTime(), addedAt: serverTimestamp(), };
            console.log('message', message);
            const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
            const newKey = chatNode.key;
            const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);

            await set(chatRef, { ...message, pending: false, sent: true, received: false });

            setBulkImage([]);
        };
    };

    const handleFileChange = async (event) => {
        console.log("Event :::", event?.target?.files);
        console.log("Event Length :::", event?.target?.files?.length);

        if (event?.target?.files?.length < 5 && bulkImage?.length + 1 < 5) {
            const newImages = Array.from(event?.target?.files).map((file) => ({
                file: URL.createObjectURL(file),
                bytes: file,
            }));
            console.log("New Images ::: ", newImages);

            setBulkImage([...bulkImage, ...newImages]);

        } else {
            toaster.info({ text: 'Please upload less than or equal to 4 images' });
        }
    };

    //! Handle End : Chat
    const handleEndChat = async () => {
        const result = await Swal.fire({
            icon: "warning", text: "Do you want to end this chat ?", showConfirmButton: true, timer: 20000,
            confirmButtonText: "Yes", confirmButtonColor: Color.primary, cancelButtonText: "No", showCancelButton: true, cancelButtonColor: Color.darkgrey
        });
        console.log('result', result);

        if (result.isConfirmed) {
            const message = {
                _id: Math.random().toString(36).substr(2, 9),
                text: `Chat has been ended by ${currentUser?.name}`,
                user: currentUser,
                createdAt: new Date().getTime(),
                addedAt: serverTimestamp(),
            };

            const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
            const newKey = chatNode.key;
            const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
            await set(chatRef, { ...message, pending: false, sent: true, received: false });

            dispatch(ConsultationActions.endChatMessage({ chatId }));
        }
    };

    //! Handle Reload Screen
    useEffect(() => {
        // const handleBeforeUnload = (event) => {
        //     event.preventDefault();
        //     event.returnValue = ''; // Required for modern browsers
        // };

        // window.addEventListener('beforeunload', handleBeforeUnload);

        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        // };
    }, []);

    let [showRegisterPuja, setShowRegisterPuja] = useState(false);

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerRegisteredPujaHistory());
    }, [userAstrologerDataById]);

    // !Scroll Down the Chat
    useEffect(() => {
        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        };

        scrollToBottom();
    }, [messages]);

    // Todo : Emitting 'join-room' Event On Page Mount or Page Relaoding
    useEffect(() => {
        const local_chatId = localStorage.getItem('chatId');
        if (local_chatId) SocketService?.emit('joinChatRoom', local_chatId);
        else navigate('/');
    }, [socketConnectionStatus]);

    useEffect(() => {
        const user_type = localStorage.getItem('user_type');

        if (user_type == 'customer') dispatch(ConsultationActions.currentRequestData(JSON.parse(localStorage.getItem('initiatedRequestData'))))
        else dispatch(ConsultationActions.currentRequestData(JSON.parse(localStorage.getItem('incomingRequestData'))))
    }, []);

    return (
        <>
            <div className="relative flex flex-col max-md:h-[calc(100vh-70.5px)] h-[calc(100vh-94.5px)]">
                {/* <Timer currentUser={currentUser} messageChatId={chat_id} /> */}
                <div className="absolute bg-primary py-1 px-5 z-10 w-full flex justify-between items-center flex-wrap gap-5">
                    <div className="flex items-center gap-2">
                        <span className="text-white">{currentRequestData?.customerName || currentRequestData?.astrologerName}</span>
                        <span className="bg-white rounded-full pt-0.5 px-3 text-sm"><CurrentRequestTimerCountDown /></span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => dispatch(ConsultationActions.endCurrentRequest({ roomId: localStorage.getItem('chatId'), currentUser, chat_id, type: 'chat' }))} className="bg-red-600 p-2 rounded-full cursor-pointer">
                            <ChatCloseSvg color={Color?.white} />
                        </button>
                    </div>
                </div>

                <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4" style={{ backgroundImage: `url(${ChatBg})` }}>
                    {Object.keys(groupedMessages).map((date, index) => (
                        <div key={index}>
                            <div className='text-center text-green-600'>You are now connected! Please start the conversation.</div>
                            <div className="text-center my-4 text-gray-500">{moment(date).format('MMMM Do, YYYY')}</div>

                            {groupedMessages[date].map((message, index) => (
                                <div key={index} className={`flex ${message.user.id === currentUser._id ? 'justify-end' : 'justify-start'} my-2`}>
                                    <div>
                                        {!message.images ?
                                            message?.text?.match(/Replying to:\s*"([^"]+)"/) ?
                                                <div className='flex gap-1 relative group/item'>
                                                    <div onClick={() => { setReplyMessages(message?.text?.split('\n').pop().trim()) }} className={`cursor-pointer ${message.user.id === currentUser._id ? 'text-black' : 'text-black'} absolute z-10 right-2 top-2 invisible group-hover/item:visible`}><DownArrowHeadSvg /></div>
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
                                                    <div onClick={() => setReplyMessages(message?.text)} className={`cursor-pointer ${message.user.id === currentUser._id ? 'text-white bg-[#6F6D4F] opacity-70' : 'text-black'} absolute z-10 right-2 top-2 invisible group-hover/item:visible`}><DownArrowHeadSvg /></div>
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

                {replyMessages && <div className='bg-white py-5 p-4 pl-[80px] flex items-center justify-between'>
                    <div>{replyMessages}</div>
                    <button onClick={() => setReplyMessages(null)} className="p-2 bg-primary text-white rounded-lg"><CrossSvg /></button>
                </div>}

                {bulkImage?.length > 0 && <div className='bg-white py-10 p-5 flex items-center justify-between absolute bottom-0 w-full z-10'>
                    <div className='flex-1 flex flex-wrap gap-10 items-center '>
                        {bulkImage.length > 0 && bulkImage?.map((value, index) => (
                            <div key={index} className='relative w-[170px] h-[170px] border-2 rounded-md p-1'>
                                <img src={value.file} style={{ height: '100%', width: '100%', borderRadius: "initial", objectFit: 'contain' }} />
                                <div onClick={() => setBulkImage(bulkImage?.filter((curr, currIndex) => currIndex !== index))} className='absolute top-[-13px] right-[-15px] cursor-pointer p-1 bg-red-600 rounded-full text-white'><CrossSvg /></div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col items-center gap-5'>
                        <button onClick={() => fileInputRef.current.click()} className="p-2 text-white bg-primary rounded-lg"><AttachmentBtnSvg h={20} w={20} /></button>
                        <button onClick={() => setBulkImage([])} className="p-2 bg-primary text-white rounded-lg"><CrossSvg /></button>
                        <button onClick={() => handleSendFile()} className="p-2 bg-primary text-white rounded-lg"><SendBtnSvg h={20} w={20} /></button>
                    </div>
                </div>}

                {showRegisterPuja && <div className='bg-white p-5 absolute bottom-0 w-full z-10 flex flex-col gap-10 max-h-[400px] overflow-y-scroll'>
                    <div className='flex items-center justify-between border-b-2 border-primary pb-3'>
                        <p className='text-xl font-semibold text-primary'>Suggest Remedies</p>
                        <button onClick={() => setShowRegisterPuja(false)} className="p-1.5 bg-primary text-white rounded-lg"><CrossSvg /></button>
                    </div>

                    <section className='px-[80px] max-md:px-[20px] pb-10'>
                        <main className='flex flex-wrap gap-[2%] gap-y-[40px]'>
                            {userAstrologerRegisteredPujaHistoryData && userAstrologerRegisteredPujaHistoryData?.map((value, index) =>
                            (<div key={index} className='xl:basis-[18.4%] lg:basis-[23%] md:basis-[32%] sm:basis-[49%] max-sm:basis-full rounded-xl capitalize bg-transparent'>
                                <div className='relative bg-white rounded-lg' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                    <div className='h-44 w-full bg-cover bg-no-repeat rounded-t-lg flex items-end' style={{ backgroundImage: `url('${api_urls + value?.pujaId?.image}')` }}>
                                        <div className='text-white text-sm px-5 py-3 bg-black bg-opacity-40 w-full'>
                                            <div className='line-clamp-1'>{value?.pujaId?.pujaName}</div>
                                        </div>
                                    </div>

                                    <div className='text-gray-600 text-[14px] flex justify-between px-5 py-2 font-[500]'>
                                        <div className=''>{moment(value?.createdAt)?.format('DD MMM YYYY')}</div>
                                        <div onClick={() => {
                                            const message = `Book ${value.pujaId.pujaName} instantly for ₹${value?.pujaId?.price} and get relief from all your problems and issues.`;

                                            const payload = {
                                                data: { astrologerId: astrologer_id, customerId: customer_id, pujaId: value?.pujaId?._id, link: web_urls + `name=${value?.pujaId?.pujaName?.toLowerCase()?.split(' ')?.join('-')}&id=${value?.pujaId?._id}`, price: value?.pujaId?.price, Id: value?._id },
                                                onComplete: () => {
                                                    handleSend(message)
                                                    setShowRegisterPuja(false)
                                                }
                                            }
                                            dispatch(ConsultationActions?.suggestRemediesDuringChat(payload))
                                        }} className='flex items-center cursor-pointer'>Send <RightArrowHeadSvg w={20} h={20} /></div>
                                    </div>
                                </div>
                            </div>)
                            )}
                        </main>

                        {userAstrologerRegisteredPujaHistoryData?.length <= 0 && (<RecordNotFound />)}
                    </section>
                </div>}

                {!hideChatMessageInputField && <div className="flex-shrink-0 p-4 bg-white border-t flex items-center gap-2">
                    <span onClick={() => dispatch(ConsultationActions.endCurrentRequest({ roomId: localStorage.getItem('chatId'), currentUser, chat_id, type: 'chat' }))} className="bg-red-600 p-2 rounded-full cursor-pointer m-1 md:hidden"><ChatCloseSvg color={Color?.white} /></span>
                    <input type="file" multiple accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current.click()} className="p-2 text-primary rounded-lg"><AttachmentBtnSvg /></button>
                    {/* {userAstrologerDataById && <button onClick={() => setShowRegisterPuja(true)} className="p-2 text-primary rounded-lg"><PujaSvg /></button>} */}

                    <input type="text" value={inputField} placeholder="Type a message" className="flex-grow p-2 mx-2 border border-gray-300 rounded-lg outline-none" onChange={(e) => setInputField(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSend(e.target.value); e.target.value = ''; setInputField('') } }} />
                    <button onClick={() => handleSend(inputField)} className="p-2 text-primary rounded-lg"><SendBtnSvg /></button>
                </div>}
            </div>

            <ChatInvoiceModal />
            <ChatInvoiceAstrologerModal />
            {/* {astrologerRatingVisibility?.ratingVisible && <ChatRating />} */}
        </>
    );
};

export default Chat;