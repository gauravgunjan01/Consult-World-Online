import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import { toaster } from '../../../utils/services/toast-service';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';

const PujaDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const puja = location.state && location?.state?.pujaData;
    const mode = location.state && location?.state?.mode;
    console.log("Puja Data ::: ", puja);

    const { userAstrologerDataById } = useSelector(state => state?.userReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ pujaDateTime: '', duration: '' });
    const handleInputFieldDetail = (event) => setInputFieldDetail({ ...inputFieldDetail, [event?.target?.name]: event?.target?.value });

    const handleRegisterPuja = () => {
        if (!userAstrologerDataById) {
            toaster.info({ text: 'Please login as a astrologer' })
        } else {
            const payload = {
                data: { astrologerId: userAstrologerDataById?._id, pujaId: puja?._id },
                onComplete: () => navigate('/astrologer-dashboard/register-puja-history')
            };

            console.log("Register Puja Payload: ", payload);

            //! Dispatch API for Register Puja
            dispatch(EcommerceActions?.registerCreatedPuja(payload));
        }
    };

    useEffect(() => {
        !puja && navigate('/register-puja')
    }, []);

    return (
        <>
            <section className='space-y-3'>
                <main className='flex flex-wrap gap-3'>
                    <img src={api_urls + puja?.image} alt="puja" className='basis-[30%] md:max-w-[400px] rounded-[3px] w-full h-auto sm:h-96 border border-secondary bg-white' />

                    <div className='flex-1 flex flex-col items-start bg-white p-3 rounded-[3px] space-y-3'>
                        <h4 className='text-lg sm:text-2xl font-bold capitalize'> {puja?.pujaName} </h4>
                        <h4 className='text-lg sm:text-xl font-[500]'>Price : <span className='text-[#009E43] text-base'>{IndianRupee(puja?.price)}</span></h4>
                        <h4 className='font-[500]'>Admin Commission : <span className='text-[#009E43] text-base'>{puja?.adminCommission}%</span></h4>
                        {mode != 'View' && <button onClick={() => handleRegisterPuja()} className='bg-black hover:bg-primary text-white text-sm font-[500] py-3.5 text-center transition-all duration-300 ease-in w-36'>Register Puja</button>}
                    </div>
                </main>

                <div className='bg-white p-3 rounded-[3px]'>
                    <main className='flex flex-wrap gap-[5%] gap-y-7'>
                        {puja?.about?.map((value, index) => (
                            <div key={index} className={`basis-[47.5%] max-md:basis-full ${index % 2 !== 0 && 'md:border-l border-black md:pl-5'}`}>
                                <div className='text-lg font-[500] mb-2.5'>{value?.heading}</div>
                                <ul className='px-8'>{value?.bulletPoint?.map((bullet, index) => (
                                    <li key={index} className='list-disc'>{bullet}</li>
                                ))}</ul>
                            </div>
                        ))}
                    </main>
                </div>
            </section>
        </>
    )
}

export default PujaDetails;