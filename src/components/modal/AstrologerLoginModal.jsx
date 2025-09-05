import Modal from 'react-modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CrossSvg, LeftArrowSvg } from '../../assets/svg';

import Logo from '../../assets/images/logo/logo.png';
import AuthBg from '../../assets/images/auth/auth-bg.png';
import * as AuthActions from '../../redux/actions/authAction';

Modal.setAppElement('#root');

const AstrologerLoginModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAstrologerLoginModalOpen } = useSelector(state => state?.authReducer);

    const [astroFieldDetail, setAstroFieldDetail] = useState({ email: '', password: '' });
    const handleInputFieldAstrolger = (e) => {
        const { name, value } = e.target;
        setAstroFieldDetail({ ...astroFieldDetail, [name]: value })
    };

    const handleCloseModal = () => dispatch(AuthActions.toggleAstrologerLoginModal(false));

    const handleLogin = async () => {
        console.log(astroFieldDetail);
        const { email, password } = astroFieldDetail;

        const payload = {
            data: { email, password, webFcmToken: localStorage.getItem('fcm_token') },
            onComplete: () => {
                handleCloseModal()
                setAstroFieldDetail({ email: '', password: '' })
                navigate('/astrologer-dashboard/my-account')
            }
        }
        dispatch(AuthActions.astrologerLogin(payload));
    };

    return (
        <>
            <Modal isOpen={isAstrologerLoginModalOpen} className="modal-content-small" onRequestClose={handleCloseModal} overlayClassName="modal-overlay" closeTimeoutMS={200} style={{ content: { backgroundColor: 'transparent' } }}>
                <section className="relative flex items-center justify-center bg-white rounded-lg">
                    <div onClick={() => handleCloseModal()} className='absolute bg-red-600 text-white p-[5px] rounded-full right-5 top-5 cursor-pointer'><CrossSvg h={16} w={16} /></div>

                    <main className="rounded-lg max-w-4xl w-full px-10 py-10 space-y-2.5 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${AuthBg})` }}>
                        <div className='h-12'><img className="object-contain h-full w-full" src={Logo} /></div>

                        <main className='space-y-4 py-5'>
                            <div className='space-y-1.5'>
                                <h2 className='flex items-center gap-3'><div onClick={() => handleCloseModal()} className='pt-0.5 cursor-pointer'><LeftArrowSvg /></div> <h6 className='text-black text-xl font-medium text-center tracking-tight'>Continue with Email</h6></h2>
                                <p className='text-grey text-[14px]'>Enter your credentials to manage consultations</p>
                            </div>

                            <div className='space-y-3'>
                                <input name='email' value={astroFieldDetail?.email} onChange={handleInputFieldAstrolger} type='email' placeholder='Email' className='w-full text-sm px-4 py-2 border border-gray-300  focus:border-primary rounded focus:outline-none' />
                                <input name='password' value={astroFieldDetail?.password} onChange={handleInputFieldAstrolger} type='text' placeholder='Password' className='w-full text-sm px-4 py-2 border border-gray-300 focus:border-primary rounded focus:outline-none' />

                                <button onClick={handleLogin} className="w-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:brightness-125 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded transition duration-500 transform" type="submit">GET OTP</button>
                            </div>
                        </main>

                        <div className='text-xs text-center text-[#0858F7] font-medium'>By Signing, you agree to our <Link to={'/terms-of-use'} onClick={() => handleCloseModal()} className=''>Terms of Use</Link> and <Link to={'/privacy-policy'} onClick={() => handleCloseModal()} className=''>Privacy Policy</Link></div>
                    </main>
                </section>
            </Modal>
        </>
    )
}

export default AstrologerLoginModal;