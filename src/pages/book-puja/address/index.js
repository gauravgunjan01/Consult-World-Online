import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteSvg } from '../../../assets/svg';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as UserActions from '../../../redux/actions/userAction';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';
import DataNotFound from '../../../components/common/DataNotFound';

const Address = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const totalPrice = location?.state?.totalPrice;
    const cartId = location?.state?.cartId;

    const { userCustomerDetails, userCustomerAddressData } = useSelector(state => state?.userReducer);

    const [inputfieldDetail, setInputfieldDetail] = useState({ name: '', phone: '', pincode: '', house: '', state: '', city: '', area: '' });

    const handleInputfieldDetail = (event) => setInputfieldDetail({ ...inputfieldDetail, [event?.target?.name]: event?.target?.value })

    const handleValidation = () => {
        const { name, phone, pincode, house, state, city, area } = inputfieldDetail;
        // name, mobile, houseNo, landmark, city, pincode, state,
        let isValid = true;

        if (!name) {
            toast.info('Please enter name.')
            return isValid = false
        }
        if (!phone) {
            toast.info('Please enter phone number.')
            return isValid = false
        }
        if (!pincode) {
            toast.info('Please enter pincode.')
            return isValid = false
        }
        if (!house) {
            toast.info('Please enter house number.')
            return isValid = false
        }
        if (!state) {
            toast.info('Please enter state.')
            return isValid = false
        }
        if (!city) {
            toast.info('Please enter city.')
            return isValid = false
        }
        if (!area) {
            toast.info('Please enter area.')
            return isValid = false
        }

        return isValid;
    };

    const handleAddress = () => {
        const { name, phone: mobile, pincode, house: houseNo, state, city, area: landmark } = inputfieldDetail;

        const payload = {
            data: { name, mobile, houseNo, landmark, city, pincode, state, customerId: userCustomerDetails?._id },
            onComplete: () => setInputfieldDetail({ name: '', phone: '', pincode: '', house: '', state: '', city: '', area: '' })
        };

        handleValidation() && dispatch(UserActions?.createUserCustomerAddress(payload));
    };

    const handleOrderCart = async (addressId) => {
        const payload = {
            amount: totalPrice,
            data: { customerId: userCustomerDetails?._id, addressId, cartId },
            user: userCustomerDetails,
            onComplete: () => navigate('/my-order/puja')
        }

        //! Dispatching API For Payment 
        dispatch(EcommerceActions.orderCart(payload));
    }

    useEffect(() => {
        userCustomerDetails && dispatch(UserActions?.getUserCustomerAddress());
    }, [userCustomerDetails]);

    return (
        <>
            <section className='space-y-2'>
                <main className='bg-white p-3'>
                    <main className='grid md:grid-cols-3'>
                        {userCustomerAddressData && userCustomerAddressData?.map((value, index) => (
                            <div key={index} className='space-y-3 rounded-[3px] p-3 capitalize border border-b-[5px] border-r-[5px] border-primary text-gray-800 text-[15px] relative'>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Name:</strong> <p> {value?.name}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Phone:</strong> <p> {value?.mobile}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>House No.:</strong> <p> {value?.houseNo}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Landmark:</strong> <p> {value?.landmark}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>City:</strong> <p> {value?.city}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>State:</strong> <p> {value?.state}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Postal Code:</strong> <p> {value?.pincode}</p></div>
                                <button onClick={() => handleOrderCart(value?._id)} className="w-full py-2 px-6 bg-primary text-white rounded-[3px]" >Deliver to this address</button>
                                <div onClick={() => dispatch(UserActions?.deleteUserCustomerAddress({ addressId: value?._id }))} className='absolute bg-red-600 text-white rounded-full p-1.5 right-2 top-2 cursor-pointer'><DeleteSvg w='15' h='15' /></div>
                            </div>
                        ))}
                    </main>

                    {userCustomerAddressData?.length <= 0 && (<DataNotFound />)}
                </main>

                <main className='bg-gray-200 p-3 rounded-[3px] text-[14px] text-[#666373] space-y-8'>
                    <div className='space-y-3'>
                        <div className='flex flex-col items-center justify-end h-full'>
                            <div className='font-[500] text-3xl text-black'>Address<span className='text-primary_text_dark'> Detail</span></div>
                            <div className='flex items-center'><div className='w-[50px] h-[2px] bg-primary'></div><div className='w-[30px] h-[4px] bg-primary'></div><div className='w-[50px] h-[2px] bg-primary'></div></div>
                        </div>
                    </div>
                    <div className='flex max-lg:flex-col gap-[20px] max-lg:gap-[15px]'>
                        <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                            <input name='name' value={inputfieldDetail?.name} onChange={(e) => handleInputfieldDetail(e)} placeholder='Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                            <input name='phone' value={inputfieldDetail?.phone} onChange={(e) => handleInputfieldDetail(e)} type='number' placeholder='Phone' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                            <input name='pincode' value={inputfieldDetail?.pincode} onChange={(e) => handleInputfieldDetail(e)} type='number' placeholder='Pincode' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                            <input name='house' value={inputfieldDetail?.house} onChange={(e) => handleInputfieldDetail(e)} placeholder='House No.' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                        </div>
                        <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                            <input name='state' value={inputfieldDetail?.state} onChange={(e) => handleInputfieldDetail(e)} placeholder='State' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                            <input name='city' value={inputfieldDetail?.city} onChange={(e) => handleInputfieldDetail(e)} placeholder='City' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                            <input name='area' value={inputfieldDetail?.area} onChange={(e) => handleInputfieldDetail(e)} placeholder='Landmark' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                        </div>
                    </div>
                    <div onClick={handleAddress} className='cursor-pointer bg-primary border border-primary hover:border-secondary hover:bg-secondary text-center text-white font-semibold rounded-sm px-5 py-2 transition-all duration-500'>Add Address</div>
                </main>
            </section>
        </>
    )
}

export default Address;