import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CrossSvg } from '../../assets/svg';
import AuthBg from '../../assets/images/auth/auth-bg.png';
import LoginImage from '../../assets/images/auth/login-image.png';
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

    const handleLoginAstrolger = async () => {
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

    const [minHeight, setMinHeight] = useState('initial');

    useEffect(() => {
        const handleResize = () => setMinHeight(window.innerHeight * 0.95);

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Modal isOpen={isAstrologerLoginModalOpen} className="modal-content" onRequestClose={handleCloseModal} overlayClassName="modal-overlay" closeTimeoutMS={200} style={{ content: { backgroundColor: 'transparent' } }}>
                <section className="relative flex items-center justify-center max-md:p-5 bg-white rounded-lg">
                    <div onClick={() => handleCloseModal()} className='cursor-pointer absolute text-primary right-5 top-5 z-10' ><CrossSvg strokeWidth='3' /></div>

                    <article className="rounded-lg overflow-hidden max-w-4xl w-full">
                        <main className="rounded-lg max-w-4xl w-full flex bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${AuthBg})` }}>
                            <div className='basis-full md:basis-[55%] flex flex-col p-8 max-md:px-0 pt-16 pb-32'>
                                <div className='flex flex-col items-center gap-5 px-10 text-center'>
                                    <div className='text-black text-[30px] font-[500] text-center'>Continue with email</div>
                                    <div className='flex flex-col gap-4'>
                                        <input name='email' value={astroFieldDetail?.email} onChange={handleInputFieldAstrolger} type='email' placeholder='Email' className='w-full text-sm px-4 py-2 border border-gray-300  focus:border-primary rounded-md focus:outline-none' />

                                        <input name='password' value={astroFieldDetail?.password} onChange={handleInputFieldAstrolger} type='text' placeholder='Password' className='w-full text-sm px-4 py-2 border border-gray-300 focus:border-primary rounded-md focus:outline-none' />

                                        <button onClick={handleLoginAstrolger} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">Login</button>

                                        <div className='text-[14px] font-[500] text-[#0858F7]'>By Signing, you agree to our <Link to={'/terms-conditions'} onClick={() => handleCloseModal()} className='underline'>Terms of Use</Link> and <Link to={'/privacy-policy'} onClick={() => handleCloseModal()} className='underline'>Privacy Policy</Link></div>
                                    </div>
                                </div>
                            </div>

                            <div className='basis-[45%] hidden md:flex justify-center'>
                                <div className='absolute top-10'><img className="object-contain w-[80%] h-[80%]" src={LoginImage} /></div>
                            </div>
                        </main>
                    </article>
                </section>
            </Modal>
        </>
    )
}

export default AstrologerLoginModal;