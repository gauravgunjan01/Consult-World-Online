import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import { toaster } from '../../../utils/services/toast-service';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';

const PujaDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const pujaData = location.state && location?.state?.pujaData;
    const astrologerId = location.state && location?.state?.astrologerId;

    const { userCustomerDetails } = useSelector(state => state?.userReducer);
    const [inputFieldDetail, setInputFieldDetail] = useState({ pujaDateTime: '', duration: '' });
    const handleInputFieldDetail = (event) => setInputFieldDetail({ ...inputFieldDetail, [event?.target?.name]: event?.target?.value });


    const handleBookPuja = () => {
        if (!userCustomerDetails) {
            toaster.info({ text: 'Please login as a customer' })
        } else {
            const { pujaDateTime, duration } = inputFieldDetail;
            if (!pujaDateTime) {
                toaster?.info({ text: 'Please enter date and time' })
                return
            };

            const payload = {
                data: {
                    customerId: userCustomerDetails?._id, astrologerId: astrologerId || '', quantity: 1, pujaId: pujaData?._id, pujaDate: moment(pujaDateTime).format(), pujaTime: moment(pujaDateTime).format()
                },
                onComplete: () => {
                    navigate('/cart')
                }
            };

            console.log("Add Cart Payload: ", payload);

            //! Dispatch API for adding puja in cart
            dispatch(EcommerceActions?.addToCart(payload));
        }
    };

    useEffect(() => {
        !pujaData && navigate('/book-puja')
    }, []);

    return (
        <>
            <section className='space-y-3'>
                <main className='flex flex-wrap gap-3'>
                    {/* <img src={api_urls + pujaData?.image} alt="puja" className='rounded-md h-auto sm:h-60 border-2 border-gray-500' /> */}
                    <img src={api_urls + pujaData?.image} alt="puja" className='basis-[30%] md:max-w-[400px] rounded-[3px] w-full h-auto sm:h-96 border border-secondary bg-white' />

                    <div className='flex-1 flex flex-col items-start bg-white p-3 rounded-[3px] space-y-3'>
                        <h4 className='text-lg sm:text-2xl font-bold capitalize'> {pujaData?.pujaName} </h4>
                        <h4 className='text-lg sm:text-xl font-[500]'>Price : <span className='text-[#009E43] text-base'>{IndianRupee(pujaData?.price)}</span></h4>

                        <div className='flex flex-col gap-3'>
                            <input name='pujaDateTime' onChange={handleInputFieldDetail} type='datetime-local' className='outline-none border border-black px-5 py-1.5 w-60' />
                        </div>
                        <button onClick={() => handleBookPuja()} className='bg-black hover:bg-primary text-white text-sm font-[500] py-3.5 px-14 transition-all duration-300 ease-in'>Buy Now</button>
                    </div>
                </main>

                <div className='bg-white p-3 rounded-[3px]'>
                    <main className='flex flex-wrap gap-[5%] gap-y-7'>
                        {pujaData?.about?.map((value, index) => (
                            <div key={index} className={`basis-[47.5%] max-md:basis-full ${index % 2 == 0 && 'md:border-l border-black md:pl-5'}`}>
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