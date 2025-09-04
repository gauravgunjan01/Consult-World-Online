import Modal from 'react-modal';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { CrossSvg, EditSvg, LeftArrowSvg } from '../../assets/svg';
import { toaster } from '../../utils/services/toast-service';
import AuthBg from '../../assets/images/auth/auth-bg.png';
import Logo from '../../assets/images/logo/logo.png';
import * as AuthActions from '../../redux/actions/authAction';

Modal.setAppElement('#root');

const CustomerLoginModal = () => {
    const dispatch = useDispatch();
    const { isCustomerLoginModalOpen, customerLoginInputFieldDetail } = useSelector(state => state?.authReducer);
    const [otpScreen, setOtpScreen] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const handleLoginInputField = (value, country) => dispatch(AuthActions?.customerLoginInputField({ phone_number: value, country_code_length: country?.dialCode?.length })); //* Handle Input Field : Login
    const handleCloseModal = () => dispatch(AuthActions.toggleCustomerLoginModal(false));

    const handleLogin = () => {
        if (customerLoginInputFieldDetail?.phone_number?.length > 5) {
            dispatch(AuthActions.customerLogin({
                data: { phone_number: String(customerLoginInputFieldDetail?.phone_number)?.substring(customerLoginInputFieldDetail?.country_code_length) },
                onComplete: () => (setOtpScreen(true), setResendTimer(30))
            }));
        } else {
            toaster.warning({ text: "Please provide phone number" });
        }
    };

    //! Resend OTP 
    const handleResendOtp = () => {
        setResendTimer(30);
        setCustomerOtp(null);
        dispatch(AuthActions.customerLogin({
            data: { phone_number: String(customerLoginInputFieldDetail?.phone_number)?.substring(customerLoginInputFieldDetail?.country_code_length) },
            onComplete: () => (setOtpScreen(true), setResendTimer(30))
        }));
    };

    const [customerOtp, setCustomerOtp] = useState(); //* Otp Field

    const handleSubmitOtp = () => {
        if (customerOtp && customerOtp?.length == 4) {
            dispatch(AuthActions.customerLoginOtp({
                data: { phone_number: String(customerLoginInputFieldDetail?.phone_number)?.substring(2), webFcmToken: localStorage.getItem('fcm_token'), device_id: 'device_id', otp: customerOtp, },
                onComplete: () => (setOtpScreen(false), handleCloseModal(), setCustomerOtp(''), setResendTimer(30), dispatch(AuthActions?.customerLoginInputField({ phone_number: '', country_code_length: '' })))
            }));
        } else {
            toaster.warning({ text: "Please Enter OTP" });
        }
    };

    useEffect(() => {
        let intervalId;
        if (resendTimer > 0) intervalId = setInterval(() => { setResendTimer(prev => prev - 1); }, 1000);

        return () => clearInterval(intervalId);
    }, [resendTimer]);

    const [minHeight, setMinHeight] = useState('initial');

    useEffect(() => {
        const handleResize = () => setMinHeight(window.innerHeight * 0.95);

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Modal isOpen={isCustomerLoginModalOpen} className="modal-content-small" onRequestClose={handleCloseModal} overlayClassName="modal-overlay" closeTimeoutMS={200} style={{ content: { backgroundColor: 'transparent' } }}>
            <section className="relative flex items-center justify-center max-md:p-5 bg-white rounded-lg">
                <div onClick={() => handleCloseModal()} className='absolute bg-red-600 text-white p-[5px] rounded-full right-5 top-5 cursor-pointer'><CrossSvg h={16} w={16} /></div>

                <article className="rounded-lg overflow-hidden max-w-4xl w-full">
                    <main className="rounded-lg max-w-4xl w-full py-10 flex bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${AuthBg})` }}>
                        <div className='basis-full flex flex-col px-10'>
                            <div className='min-h-[50px] max-h-[50px]'><img className="object-contain h-full w-full" src={Logo} /></div>

                            {otpScreen ?
                                <main className='flex flex-col gap-4 px-10 text-center'>
                                    <h6 className='text-black text-xl font-medium tracking-tight'>OTP Verification</h6>
                                    <div className='text-gray-800 flex flex-col gap-1 text-sm'>
                                        <div className='text-grey line-clamp-1'>A OTP(One Time Password) has been sent to</div>
                                        <div className='text-grey flex items-center justify-center gap-1'>{customerLoginInputFieldDetail?.phone_number?.substring(customerLoginInputFieldDetail?.country_code_length)}.<div onClick={() => setOtpScreen(false)} className='bg-primary text-white rounded-full p-1.5  cursor-pointer'><EditSvg h='12' w='12' /></div></div>
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <div className='flex flex-col items-center justify-center gap-3'>
                                            <OtpInput value={customerOtp} onChange={setCustomerOtp} numInputs={4} renderSeparator={<span>-</span>} renderInput={(props) => (<input {...props} onKeyDown={(e) => e.key === 'Enter' && handleSubmitOtp()} className='border-2 outline-none text-center rounded-md' style={{ height: '40px', width: '40px' }} />)} />
                                        </div>
                                        <div className=' text-green-700 text-[12px] text-right'>
                                            {resendTimer > 0 ?
                                                `Resend OTP in ${resendTimer} seconds`
                                                :
                                                <button onClick={handleResendOtp} className='text-green-700 cursor-pointer hover:text-green-600'>Resend OTP</button>
                                            }
                                        </div>
                                        <button onClick={handleSubmitOtp} className="w-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:brightness-125 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded transition duration-500 transform" type="submit">Login</button>
                                    </div>
                                </main>
                                :
                                <main className='flex flex-col gap-5 py-5'>
                                    <div className='flex items-center gap-3'><div onClick={() => handleCloseModal()} className='pt-0.5 cursor-pointer'><LeftArrowSvg /></div> <h6 className='text-black text-xl font-medium text-center tracking-tight'>Continue with Mobile</h6></div>
                                    <p className='text-grey text-[14px]'>You will receive a 4 digit code for verification</p>

                                    <div className='flex flex-col gap-5'>
                                        <PhoneInput
                                            country={'in'}
                                            placeholder='Enter mobile no'
                                            value={customerLoginInputFieldDetail?.phone_number}
                                            onChange={handleLoginInputField}
                                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                            enableSearch
                                            onlyCountries={['in']}
                                            disableCountryCode={false}
                                            countryCodeEditable={false}
                                            disableDropdown={false}
                                            inputStyle={{ width: '100%', height: '42px', fontSize: "15px", backgroundColor: "#FFF", borderRadius: '4px' }}
                                            containerClass='text-left'
                                            searchClass='w-[100%] text-sm p-2 flex item-center'
                                            searchPlaceholder='Search for country'
                                            searchNotFound='Please search another country.'
                                        />

                                        <button onClick={handleLogin} className="w-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:brightness-125 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded transition duration-500 transform" type="submit">GET OTP</button>
                                    </div>
                                </main>
                            }

                            <div className='text-xs text-center text-[#0858F7] font-medium'>By Signing, you agree to our <Link to={'/terms-of-use'} onClick={() => handleCloseModal()} className=''>Terms of Use</Link> and <Link to={'/privacy-policy'} onClick={() => handleCloseModal()} className=''>Privacy Policy</Link></div>
                        </div>
                    </main>
                </article>
            </section>
        </Modal>
    );
};

export default CustomerLoginModal;