import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls';
import { IndianRupee } from '../../utils/common-function';
import { toaster } from '../../utils/services/toast-service';
import * as ConsultationActions from '../../redux/actions/consultationAction';
import * as AstrologerActions from '../../redux/actions/astrologerAction';

const PageBlock = () => {
    const dispatch = useDispatch();
    const { requestInitiatedByCustomer } = useSelector(state => state?.consultationReducer);

    useEffect(() => {
        let timerInterval;
        if (requestInitiatedByCustomer.initiated && requestInitiatedByCustomer.timer > 0) {
            timerInterval = setInterval(() => {
                dispatch(ConsultationActions?.requestInitiatedByCustomer({ initiated: localStorage.getItem('requestInitiatedByCustomerInitiated'), timer: localStorage.getItem('requestInitiatedByCustomerTimer') - 1, astrologerData: JSON.parse(localStorage.getItem('requestInitiatedByCustomerData')) }));
                localStorage?.setItem('requestInitiatedByCustomerTimer', localStorage?.getItem('requestInitiatedByCustomerTimer') - 1);

            }, 1000);

        } else if (requestInitiatedByCustomer.timer === 0) {
            dispatch(ConsultationActions?.requestInitiatedByCustomer({ initiated: false, timer: 60 }));
            localStorage?.removeItem('requestInitiatedByCustomerTimer');
            localStorage?.removeItem('requestInitiatedByCustomerInitiated');
            localStorage.removeItem('requestInitiatedByCustomerData');
            toaster.info({ text: 'Astrologer is busy, please try again later!' });
            setTimeout(() => {
                dispatch(AstrologerActions?.getAstrologer({ page: 1, search: '' }));
            }, 2000);
        }

        return () => clearInterval(timerInterval); // Cleanup the interval when component unmounts or timer reaches 0
    }, [requestInitiatedByCustomer.initiated, requestInitiatedByCustomer.timer, dispatch]);

    console.log(requestInitiatedByCustomer?.astrologerData?.image)

    return (
        <>
            <div className='fixed inset-0 z-[1000] bg-transparent flex justify-center items-end pb-5'>
                <div className='bg-[#FFFFE0] rounded-md px-5 py-2 flex items-center gap-5'>
                    <div>
                        <img src={api_urls + requestInitiatedByCustomer?.astrologerData?.image} className='h-16 w-16 rounded-full' />
                        <p className='text-red-500 uppercase text-[13px] font-semibold'>{requestInitiatedByCustomer?.astrologerData?.type}</p>
                    </div>
                    <div className='flex gap-5 justify-between items-center'>
                        <div className='max-w-60'>
                            <p className='font-semibold capitalize'>{requestInitiatedByCustomer?.astrologerData?.name}</p>
                            <p className='text-sm'>{IndianRupee(requestInitiatedByCustomer?.astrologerData?.price)}/min</p>
                            <p className='text-sm text-green-500 font-[500]'>{requestInitiatedByCustomer?.astrologerData?.type} initiated. Consultant gets {requestInitiatedByCustomer?.timer} sec to accept.</p>
                        </div>

                        <p className='text-red-500 font-semibold rounded-md text-sm bg-white border border-red-500 px-3 py-1'>Waiting</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageBlock;