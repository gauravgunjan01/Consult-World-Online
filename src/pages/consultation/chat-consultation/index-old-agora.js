import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import AgoraChat from 'agora-chat';
import Zoom from 'react-medium-image-zoom';
import { useEffect, useRef, useState, useCallback } from 'react';

import { Color } from '../../../assets/colors';
import { api_urls } from '../../../utils/api-urls';
import { toaster } from '../../../utils/services/toast-service';
import { AttachmentBtnSvg, ChatCloseSvg, CrossSvg, DownArrowHeadSvg, SendBtnSvg } from '../../../assets/svg';

import ChatBg from '../../../assets/images/chat/chat-bg.png';
import 'react-medium-image-zoom/dist/styles.css';
import Timer from '../../chat/features/Timer';
import SocketService from '../../../utils/services/socket-service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatInvoiceModal from '../../../components/modal/ChatInvoiceModal';
import ChatInvoiceAstrologerModal from '../../../components/modal/ChatInvoiceAstrologerModal';
import ChatRating from '../../../components/features/ChatRating';

const ChatConsultation = () => {
    const appKey = '611379913#1591245';
    const navigate = useNavigate();
    const { socketConnectionStatus } = useSelector(state => state?.commonReducer);
    const { astrologerRatingVisibility } = useSelector(state => state?.consultationReducer)

    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [peerId, setPeerId] = useState('');
    const [inputField, setInputField] = useState('');
    const [messages, setMessages] = useState([]);
    const [replyMessages, setReplyMessages] = useState(null);
    let [bulkImage, setBulkImage] = useState([]);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const chatClient = useRef(null);

    const handleAddMessage = useCallback((payload) => { setMessages((prev) => [...prev, payload]) }, []);
    useEffect(() => {
        if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const formatSDKMsg = useCallback(
        (m) => {
            console.log('Conversation History Result :::', m);

            return {
                id: m.id || `${m.time || Date.now()}_${Math.random()}`,
                text: m.msg || m.customExts?.url || '',
                type: m.type === 'custom' ? 'img' : m.type,
                fromSelf: m.from === userId,
                time: m.time || Date.now(),
                user: m.user || {},
            };
        },
        [userId]
    );

    //! Load history
    const loadHistory = useCallback(async (peer) => {
        if (!chatClient.current || !peer) return;
        try {
            let formatted = [];
            try {
                const conversation = await chatClient.current.getConversation(peer, "singleChat");
                const result = await conversation.getMessages({ pageSize: 50 });
                formatted = (result?.list || []).map(formatSDKMsg);
            } catch { }

            if (!formatted.length) {
                const res = await chatClient.current.getHistoryMessages({ targetId: peer, chatType: 'singleChat', pageSize: 50 });
                formatted = (res?.messages || []).map(formatSDKMsg);
            }
            setMessages(formatted.sort((a, b) => a.time - b.time));
        } catch {
            handleAddMessage({ id: `err_${Date.now()}`, text: 'Failed to load history', type: 'txt', fromSelf: false, time: Date.now(), });
        }
    }, [handleAddMessage, formatSDKMsg]);

    //! Handle Send
    const handleSend = async (text) => {
        if (!text.trim() || !peerId) return;
        try {
            const msgText = replyMessages ? `Replying to: '${replyMessages}'\n\n${text}` : text;
            const options = { chatType: 'singleChat', type: 'txt', to: peerId, msg: msgText };
            console.log("Message Option ::: ", options);

            const msgObj = AgoraChat.message.create(options);
            await chatClient.current.send(msgObj);

            handleAddMessage({ id: msgObj?.id, text: msgText, type: 'txt', fromSelf: true, time: Date.now(), });
            setInputField('');
            setReplyMessages(null);
        } catch (error) {
            handleAddMessage({ id: `send_err_${Date.now()}`, text: `Failed: ${error?.message || 'Unknown error'}`, type: 'txt', fromSelf: false, time: Date.now(), });
        }
    };

    //! Handle Send Files
    const handleSendFile = async () => {
        if (!peerId || bulkImage.length === 0) return;
        try {
            const uploadedImages = [];

            for (let i = 0; i < bulkImage.length; i++) {
                const formData = new FormData();
                formData.append('fileType', 'image');
                formData.append('filePath', bulkImage[i].bytes);

                try {
                    const { data } = await axios.post(api_urls + 'api/customers/store-file', formData, { headers: { 'Content-Type': 'multipart/form-data' }, });
                    if (data?.success) uploadedImages.push(api_urls + data.data.filePath);
                } catch (error) { }
            }

            for (let imgUrl of uploadedImages) {
                const options = { chatType: 'singleChat', type: 'custom', to: peerId, customEvent: 'image', customExts: { url: imgUrl, }, };

                const msgObj = AgoraChat.message.create(options);
                await chatClient.current.send(msgObj);

                handleAddMessage({ id: msgObj.id, text: imgUrl, type: 'img', fromSelf: true, time: Date.now() });
            }
            setBulkImage([]);

        } catch (error) {
            toaster.error({ text: 'Failed to send image' });
        }
    };

    const handleFileChange = async (event) => {
        if (event?.target?.files?.length < 5 && bulkImage?.length + 1 < 5) {
            const newImages = Array.from(event?.target?.files).map((file) => ({
                file: URL.createObjectURL(file),
                bytes: file,
            }));
            setBulkImage([...bulkImage, ...newImages]);
            event.target.value = null;
        } else {
            toaster.info({ text: 'Please upload <= 4 images' });
        }
    };

    //! Handle End Chat
    const handleEndChat = async () => {
        const result = await Swal.fire({ icon: 'warning', text: 'Do you want to end this chat ?', showConfirmButton: true, confirmButtonText: 'Yes', confirmButtonColor: Color.primary, cancelButtonText: 'No', showCancelButton: true, cancelButtonColor: Color.darkgrey });
        if (result.isConfirmed) {
            chatClient.current?.close();
            setIsLoggedIn(false);
        }
    };

    // TODO :- Agora init
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const peer = query.get('peer-id');
        if (peer) setPeerId(peer);

        const client = new AgoraChat.connection({ appKey });
        chatClient.current = client;

        client.addEventHandler('connection&message', {
            onConnected: () => {
                setIsLoggedIn(true);
                handleAddMessage({ id: `sys_${Date.now()}`, text: `✅ Logged in as ${userId}`, type: 'txt', fromSelf: false, time: Date.now() });
                if (peer || peerId) loadHistory(peer || peerId);
            },
            onDisconnected: () => {
                setIsLoggedIn(false);
                handleAddMessage({ id: `sys_disc_${Date.now()}`, text: '⚠️ Disconnected. Reconnecting…', type: 'txt', fromSelf: false, time: Date.now() });
            },
            onTextMessage: (msg) => handleAddMessage(formatSDKMsg(msg)),
            onImageMessage: (msg) => handleAddMessage(formatSDKMsg(msg)),
            onError: (error) => handleAddMessage({ id: `err_${Date.now()}`, text: `⚠️ Error: ${error?.message}`, type: 'txt', fromSelf: false, time: Date.now() })
        });

        client.addEventHandler('CUSTOM_HANDLER', {
            onCustomMessage: (msg) => {
                if (msg.customEvent === 'image') {
                    const imageUrl = msg.customExts.url;
                    setMessages((prev) => [...prev, { type: 'img', text: imageUrl, fromSelf: msg.from === userId },]);
                }
            },
        });

        if (userId) {
            client.open({
                user: userId, accessToken: localStorage.getItem('user_type') == 'astrologer' ?
                    '007eJxTYKh9v6uX94SSzZ6Q/RLyNtJ9C7PCJ+rLljd89Zx+0cKzVVaBITUt1SLFLMnQ0MTAxMQw0cAiKTUp2dTU0jTZ0MjAwtLo1LNlGQ2BjAyFkSUsjAysDIxACOKrMBgamVmmGBkb6JonJxvpGhqmGehamBma6aZYmqemGZoaJRolmQAAvlwlRQ==' :
                    '006efe8d6b1140441a08bebc5595c120892IAAR2TEH+NMhqxv4rKirFeOWxPQb6rh1dy39XntZM91igxppJVAAAAAAEADX9hL5ulGoaAEA6ANKDqdo'
            });
        } else {
            handleAddMessage({ id: `sys_nocreds_${Date.now()}`, text: 'No userId/token found', type: 'txt', fromSelf: false, time: Date.now() });
        }

        return () => {
            client.removeEventHandler('connection&message');
            client.close();
        };
    }, [userId, token, loadHistory, formatSDKMsg, handleAddMessage]);

    // useEffect(() => {
    //     if (!userId || !token) return;

    //     const client = new AgoraChat.connection({ appKey });
    //     chatClient.current = client;

    //     client.addEventHandler('connection&message', { ... });
    //     client.open({ user: userId, accessToken: token });

    //     if (peerId) loadHistory(peerId);

    //     return () => client.close();
    // }, [userId, token, peerId]);

    useEffect(() => {
        const id = localStorage.getItem('current_user_id');
        // const tkn = localStorage.getItem('agora-token');
        if (id) {
            setUserId(id);
            // setToken(tkn);
        }
    }, []);


    // Todo : Emitting 'join-room' Event On Page Mount or Page Relaoding
    useEffect(() => {
        const local_chatId = localStorage.getItem('chatId');
        if (local_chatId) SocketService?.emit('joinChatRoom', local_chatId);
        else navigate('/');
    }, [socketConnectionStatus]);


    return (
        <>
            <div className='relative flex flex-col max-md:h-[calc(100vh-90px)] h-[calc(100vh-112px)]'>
                <Timer currentUser={{}} messageChatId={''} />

                {/* Chat Messages */}
                <div ref={chatContainerRef} className='flex-grow overflow-y-auto p-4' style={{ backgroundImage: `url(${ChatBg})` }}>
                    {messages.length === 0 && <div className='text-center text-gray-500'>No messages yet</div>}
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.fromSelf ? 'justify-end' : 'justify-start'} my-2`}>
                            <div>
                                {message.type != 'img' ?
                                    message?.text?.match(/Replying to:\s*'([^']+)'/) ?
                                        <div className='flex gap-1 relative group/item'>
                                            <div onClick={() => { setReplyMessages(message?.text?.split('\n').pop().trim()) }} className={`cursor-pointer ${message.fromSelf ? 'text-black' : 'text-black'} absolute z-10 right-2 top-2 invisible group-hover/item:visible`}><DownArrowHeadSvg /></div>
                                            {!message.fromSelf && <img src={message?.user?.image} className='h-4 w-4 rounded-full' />}
                                            <div className='flex'>
                                                {!message.fromSelf && <div className='p-1 bg-white border-l-2 border-t border-primary self-start rounded-bl-full'></div>}
                                                <div className={`relative max-w-xs p-1 shadow-md ${message.fromSelf ? 'bg-[#6f6d4f] text-white rounded-lg' : 'bg-white text-black rounded-lg rounded-tl-none'} break-words`}>
                                                    <div className='bg-[#EFEFEF] rounded-md p-2 border-l-4 border-primary text-sm text-[#555]'>{message?.text?.match(/Replying to:\s*'([^']+)'/)[1]}</div>
                                                    <div className='p-2'>
                                                        <div className='text-[14px]'>{message?.text?.split('\n').pop().trim()}</div>
                                                        <div className={`text-xs text-end mt-1`}>{moment(message.time).format('h:mm A')}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='flex gap-1 relative group/item'>
                                            {!message.fromSelf && <img src={message?.user?.image} className='h-4 w-4 rounded-full' />}
                                            <div onClick={() => setReplyMessages(message?.text)} className={`cursor-pointer ${message.fromSelf ? 'text-white bg-[#6F6D4F] opacity-70' : 'text-black'} absolute z-10 right-2 top-2 invisible group-hover/item:visible`}><DownArrowHeadSvg /></div>
                                            <div className='flex'>
                                                {!message.fromSelf && <div className='p-1 bg-white border-l-2 border-t border-primary self-start rounded-bl-full'></div>}
                                                <div className={`relative max-w-xs p-3 shadow-md ${message.fromSelf ? 'bg-[#6f6d4f] text-white rounded-lg' : 'bg-white text-black rounded-lg rounded-tl-none'} break-words`}>
                                                    {!message.fromSelf && <div className='text-xs text-primary'>{message?.user?.name}</div>}
                                                    <div className='text-[14px]'>{message.text?.split('\n')?.map((line, index) => <p key={index}>{line?.trim()}</p>)}</div>
                                                    <div className={`text-xs text-end mt-1`}>{moment(message.time).format('h:mm A')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                    <div className='flex gap-1 mt-2'>
                                        {!message.fromSelf && <img src={message?.user?.image} className='h-4 w-4 rounded-full' />}
                                        <div className='flex'>
                                            {!message.fromSelf && <div className='p-1 bg-white border-l-2 border-t border-primary self-start rounded-bl-full'></div>}
                                            <div className='relative max-w-80 cursor-pointer flex flex-col bg-white rounded-lg'>
                                                {!message.fromSelf && <div className='text-xs text-primary bg-white px-3 pt-2 rounded-tr-lg'>{message?.user?.name}</div>}
                                                <div className='p-2 flex flex-wrap gap-2'>
                                                    <Zoom>
                                                        <img src={message?.text} alt='attachment' className='min-w-36 max-w-36 min-h-36 max-h-36 rounded-lg basis-[50%]' />
                                                    </Zoom>
                                                </div>
                                                <div className='text-xs text-white absolute z-10 right-2 bottom-2'>{moment(message.time).format('h:mm A')}</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reply preview */}
                {replyMessages && <div className='bg-white py-5 p-4 flex items-center justify-between'>
                    <div>{replyMessages}</div>
                    <button onClick={() => setReplyMessages(null)} className='p-2 bg-primary text-white rounded-lg'><CrossSvg /></button>
                </div>}

                {/* Image preview */}
                {bulkImage?.length > 0 && (
                    <div className='bg-white p-5 flex items-center justify-between absolute bottom-0 w-full z-10'>
                        <div className='flex-1 flex flex-wrap gap-4 items-center'>
                            {bulkImage.map((value, index) => (
                                <div key={index} className='relative w-[120px] h-[120px] border rounded-md p-1'>
                                    <img src={value.file} className='w-full h-full object-contain' />
                                    <div onClick={() => setBulkImage(bulkImage.filter((_, i) => i !== index))} className='absolute top-[-10px] right-[-10px] cursor-pointer p-1 bg-red-600 rounded-full text-white'><CrossSvg /></div>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <button onClick={() => fileInputRef.current.click()} className='p-2 text-white bg-primary rounded-lg'><AttachmentBtnSvg /></button>
                            <button onClick={() => handleSendFile()} className='p-2 bg-primary text-white rounded-lg'><SendBtnSvg /></button>
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className='flex-shrink-0 p-4 bg-white border-t flex items-center gap-2'>
                    <span onClick={() => handleEndChat()} className='bg-red-600 p-2 rounded-full cursor-pointer m-1 md:hidden'><ChatCloseSvg color={Color?.white} /></span>
                    <input type='file' multiple accept='image/*' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current.click()} className='p-2 text-primary rounded-lg'><AttachmentBtnSvg /></button>

                    <input type='text' value={inputField} placeholder='Type a message…' className='flex-grow p-2 mx-2 border rounded-lg outline-none'
                        onChange={(e) => setInputField(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(inputField)} />
                    <button onClick={() => handleSend(inputField)} className='p-2 text-primary rounded-lg'><SendBtnSvg /></button>
                </div>
            </div>

            <ChatInvoiceModal />
            <ChatInvoiceAstrologerModal />
            {astrologerRatingVisibility?.ratingVisible && <ChatRating />}
        </>
    );
};

export default ChatConsultation;