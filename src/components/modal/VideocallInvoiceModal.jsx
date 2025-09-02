import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { IndianRupee } from '../../utils/common-function';
import { CrossSvg } from '../../assets/svg';
import Logo from '../../assets/images/logo/logo.png';
import * as ConsultationActions from '../../redux/actions/consultationAction';

const secondsToHMS = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${m}:${s}`;
};

const showNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

const VideocallInvoiceModal = () => {
    const dispatch = useDispatch();
    const { videocallInvoiceData, videocallInvoiceVisibility } = useSelector(state => state?.consultationReducer);

    const handleCloseInvoice = () => {
        const payload = {
            data: { _id: videocallInvoiceData?.astrologerId },
            ratingVisible: true,
            type: 'VIDEO_CALL',
            serviceId: videocallInvoiceData?.videoCallId
        }
        dispatch(ConsultationActions.setAstrologerRatingVisibility(payload));
        dispatch(ConsultationActions.setVideocallInvoiceVisibility(false));
        dispatch(ConsultationActions.setVideocallInvoiceData(null));
    };

    return (
        <>
            {videocallInvoiceVisibility && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
                    <div className="bg-white rounded-lg max-md:w-[90vw] p-2 animate-slideInFromTop">
                        <div className="p-5 flex flex-col gap-5">
                            <div className="flex justify-between items-center gap-40">
                                <img src={Logo} className="h-10" />
                                <div onClick={handleCloseInvoice} className="bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-md cursor-pointer">
                                    <CrossSvg h="16" w="16" />
                                </div>
                            </div>

                            <div className="border-b-2 border-primary"></div>

                            <div>
                                <div className="flex flex-row items-center justify-between mb-4">
                                    <span className="text-lg font-semibold">Invoice ID: </span>
                                    <span className="text-base text-gray-500 font-400 uppercase">{videocallInvoiceData?.invoice_id}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between mb-4">
                                    <span className="text-lg font-semibold">Order Date: </span>
                                    <span className="text-base text-gray-500 font-400">{moment(videocallInvoiceData?.startDate, 'DD/MM/YYYY').format('DD MMM YYYY')}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between mb-4">
                                    <span className="text-lg font-semibold">Order Time: </span>
                                    <span className="text-base text-gray-500 font-400">{moment(videocallInvoiceData?.startTime, 'hh:mm:ss a').format('hh:mm:ss A')}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between mb-4">
                                    <span className="text-lg font-semibold">Duration</span>
                                    <span className="text-base text-gray-500 font-400">{secondsToHMS(videocallInvoiceData?.duration ?? 0)}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between mb-4">
                                    <span className="text-lg font-semibold">Video Call Price</span>
                                    <span className="text-base text-gray-500 font-400">{IndianRupee(Number(videocallInvoiceData?.chatPrice) + Number(videocallInvoiceData?.commissionPrice))}</span>
                                </div>
                                {localStorage.getItem('user_type') == 'astrologer'
                                    ?
                                    <div className="flex flex-row items-center justify-between mb-4">
                                        <span className="text-lg font-semibold">Your Charge</span>
                                        <span className="text-base text-gray-500 font-400">{IndianRupee(showNumber(videocallInvoiceData?.VideoCallAstrologerPrice))}</span>
                                    </div>
                                    :
                                    <div className="flex flex-row items-center justify-between mb-4">
                                        <span className="text-lg font-semibold">Total Charge</span>
                                        <span className="text-base text-gray-500 font-400">{IndianRupee(showNumber(videocallInvoiceData?.totalPrice))}</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="text-nowrap px-5 max-md:px-1 pb-3">
                            <p className="text-center text-xs text-gray-600">If you have any concerns, please connect with our Customer</p>
                            <p className="text-center text-xs text-gray-600">Support via Website or Mobile Application. We will be</p>
                            <p className="text-center text-xs text-gray-600">glad to assist you!</p>
                            <p className="text-center text-xs text-primary">Thank You!</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideocallInvoiceModal;