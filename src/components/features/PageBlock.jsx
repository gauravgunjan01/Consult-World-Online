import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls';
import { IndianRupee } from '../../utils/common-function';
import { toaster } from '../../utils/services/toast-service';
import * as ConsultationActions from '../../redux/actions/consultationAction';
import * as AstrologerActions from '../../redux/actions/astrologerAction';

const PageBlock = () => {
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
                dispatch(AstrologerActions?.getAstrologer({ page: 1, search: '' }));
            }, 2000);
        }

        return () => clearInterval(timerInterval);
    }, [initiatedRequestData.initiated, initiatedRequestData.timer]);

    return (
        <>
            <div className='fixed inset-0 z-[1000] bg-transparent flex justify-center items-end pb-5'>
                <div className='bg-[#FFFFE0] rounded-md px-5 py-2 flex items-center gap-5'>
                    <div>
                        <img src={api_urls + initiatedRequestData?.astrologer_data?.image} className='h-16 w-16 rounded-full' />
                        <p className='text-red-500 uppercase text-[13px] font-semibold'>{initiatedRequestData?.astrologer_data?.type}</p>
                    </div>
                    <div className='flex gap-5 justify-between items-center'>
                        <div className='max-w-60'>
                            <p className='font-semibold capitalize'>{initiatedRequestData?.astrologer_data?.name}</p>
                            <p className='text-sm'>{IndianRupee(initiatedRequestData?.astrologer_data?.price)}/min</p>
                            <p className='text-sm text-green-500 font-[500]'>{initiatedRequestData?.astrologer_data?.type} initiated. Consultant gets {initiatedRequestData?.timer} sec to accept.</p>
                        </div>

                        <p className='text-red-500 font-semibold rounded-md text-sm bg-white border border-red-500 px-3 py-1'>Waiting</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageBlock;