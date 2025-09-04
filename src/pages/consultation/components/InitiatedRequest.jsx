import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import { toaster } from '../../../utils/services/toast-service';
import * as ConsultationActions from '../../../redux/actions/consultationAction';
import * as AstrologerActions from '../../../redux/actions/astrologerAction';

const InitiatedRequest = () => {
    const dispatch = useDispatch();
    const { initiatedRequestData } = useSelector(state => state?.consultationReducer);

    useEffect(() => {
        let timerInterval;
        if (initiatedRequestData.initiated && initiatedRequestData.timer > 0) {

            timerInterval = setInterval(() => {
                dispatch(ConsultationActions?.initiatedRequestData({ initiated: localStorage.getItem('requestInitiated'), timer: localStorage.getItem('initiatedRequestTimer') - 1, astrologer_data: JSON.parse(localStorage.getItem('initiatedRequestAstrologerData')) }));
                localStorage?.setItem('initiatedRequestTimer', localStorage?.getItem('initiatedRequestTimer') - 1);
            }, 1000);

        } else if (initiatedRequestData.timer === 0) {
            dispatch(ConsultationActions?.initiatedRequestData({ initiated: false, timer: 60, astrologer_data: null }));
            localStorage?.removeItem('requestInitiated');
            localStorage?.removeItem('initiatedRequestTimer');
            localStorage.removeItem('initiatedRequestAstrologerData');
            toaster.info({ text: 'Astrologer is busy, please try again later!' });

            setTimeout(() => {
                dispatch(AstrologerActions?.getAstrologers({ page: 1, search: '' }));
            }, 2000);
        }

        return () => clearInterval(timerInterval);
    }, [initiatedRequestData.initiated, initiatedRequestData.timer]);

    return (
        <>
            <div className='fixed inset-0 z-[1000] bg-transparent flex justify-center items-end pb-5'>
                <div className='bg-white rounded-md overflow-hidden'>
                    <div className='bg-gradient-to-tr from-primary via-pink-100/10 to-red-100/5 rounded-md px-5 py-4 flex items-center gap-5'>
                        <div className='space-y-2'>
                            {/* <img src={api_urls + initiatedRequestData?.astrologer_data?.image} className='h-16 w-16 rounded-full' /> */}
                            <div className="flex justify-center">
                                <div className="relative w-16 h-16 rounded-full ring-2 ring-primary bg-white">
                                    <img src={api_urls + initiatedRequestData?.astrologer_data?.image} alt="Profile" className="w-full h-full rounded-full object-contain object-center" />
                                    <div className="absolute inset-0 rounded-full border-[6px] border-green-500 animate-ping" />
                                </div>
                            </div>
                            <p className='bg-primary text-white rounded-md text-[13px] self-start px-2'>{initiatedRequestData?.astrologer_data?.type}</p>
                        </div>
                        <div className='flex gap-5 justify-between items-center'>
                            <div className='max-w-60'>
                                <p className='font-semibold capitalize'>{initiatedRequestData?.astrologer_data?.name}</p>
                                <p className='text-sm'>{IndianRupee(initiatedRequestData?.astrologer_data?.price)}/min</p>
                                <p className='text-sm text-black'>{initiatedRequestData?.astrologer_data?.type} initiated. Consultant gets <span className='text-red-500 font-medium'>{initiatedRequestData?.timer} sec</span> to accept.</p>
                            </div>

                            <p className='text-yellow-500 font-semibold rounded-md text-sm bg-white border border-yellow-500 px-3 py-1'>Waiting</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InitiatedRequest;