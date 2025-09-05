import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MessageCircleMore, PhoneCall, Video } from 'lucide-react';

import { api_urls } from '../../utils/api-urls';
import { CrossSvg, HamburgerSvg, PersonSvg, ProfileSvg } from '../../assets/svg';

import Logo from '../../assets/images/logo/logo.png';
import * as AuthActions from '../../redux/actions/authAction';
import * as CommonActions from '../../redux/actions/commonAction';

Modal.setAppElement('#root');

const Header = () => {
    const navRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const { webLanguageData, isHamburgerMenuOpen } = useSelector(state => state?.commonReducer);
    const { userCustomerDetails, userAstrologerDetails } = useSelector(state => state?.userReducer);
    const [screenScroll, setScreenScroll] = useState(false);

    //! Handle Resize and Scroll Event Listener 
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                dispatch(CommonActions.toggleHamburgerMenu(false));
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 60) setScreenScroll(true);
            else setScreenScroll(false);
        }

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                dispatch(CommonActions.toggleHamburgerMenu(false));;
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll);

        if (isHamburgerMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isHamburgerMenuOpen]);

    return (
        <>
            <header className={`bg-white text-black fixed w-full max-w-[1700px] z-[1000] top-0 transition-all duration-300 text-[16px] font-normal shadow-md`}>
                <article>
                    <main className='flex flex-wrap justify-between items-center gap-5 relative z-10 px-4 lg:px-10 py-1'>
                        <Link to={'/'} className='flex items-center gap-2'>
                            <img className='h-16 max-lg:h-10' src={Logo} />
                        </Link>

                        <nav className='flex gap-5 items-center max-lg:hidden'>
                            <NavLink to="/video-call-with-consultant" className={`max-xl:hidden`}>
                                {({ isActive, isPending }) => (
                                    <div className={isPending ? "pending" : isActive ? "bg-gradient-to-r from-primary to-secondary text-white px-7 py-2.5 rounded-md border border-secondary" : "bg-white text-secondary px-7 py-2.5 border border-secondary rounded-md hover:text-secondary"} >
                                        <div className="flex items-center gap-3">
                                            <Video size={20} />
                                            <p>Videocall with Consultant</p>
                                        </div>
                                    </div>
                                )}
                            </NavLink>

                            <NavLink to="/talk-to-consultant">
                                {({ isActive, isPending }) => (
                                    <div className={isPending ? "pending" : isActive ? "bg-gradient-to-r from-primary to-secondary text-white px-7 py-2.5 rounded-md border border-secondary" : "bg-white text-secondary px-7 py-2.5 border border-secondary rounded-md hover:text-secondary"} >
                                        <div className="flex items-center gap-3">
                                            <PhoneCall size={19} />
                                            <p>Talk to Consultant</p>
                                        </div>
                                    </div>
                                )}
                            </NavLink>

                            <NavLink to="/chat-with-consultant" className={`max-xl:hidden`}>
                                {({ isActive, isPending }) => (
                                    <div className={isPending ? "pending" : isActive ? "bg-gradient-to-r from-primary to-secondary text-white px-7 py-2.5 rounded-md border border-secondary" : "bg-white text-secondary px-7 py-2.5 border border-secondary rounded-md hover:text-secondary"} >
                                        <div className="flex items-center gap-3">
                                            <MessageCircleMore size={22} />
                                            <p>Chat with Consultant</p>
                                        </div>
                                    </div>
                                )}
                            </NavLink>

                            {!userCustomerDetails && !userAstrologerDetails && <div onClick={() => dispatch(AuthActions.requestToggleCustomerLoginModal())} className='flex items-center gap-1.5 cursor-pointer text-black py-2.5 rounded-full'><div className='-mt-1'><div className='h-9 w-9 border border-primary rounded-full flex items-center justify-center bg-primary text-white'><PersonSvg h='20' w='20' /></div></div><div>Sign In</div></div>}

                            {userAstrologerDetails && <Link to={'/astrologer-dashboard/my-account'} className='flex items-center gap-1 cursor-pointer'>{userAstrologerDetails?.image ? <img src={api_urls + userAstrologerDetails?.image} className='h-9 w-9 rounded-full' /> : <ProfileSvg h='40' w='40' />}</Link>}

                            {userCustomerDetails &&
                                <div className='group relative text-black max-lg:hidden'>
                                    <div className='flex items-center gap-1 cursor-pointer text-black'>{userCustomerDetails?.image ? <img src={api_urls + 'uploads/' + userCustomerDetails?.image} className='h-14 w-14 object-contain rounded-full bg-primary shadow-md' /> : <ProfileSvg h='40' w='40' />}</div>

                                    <div className='font-normal absolute overflow-hidden top-[55px] right-0 bg-white w-56 h-0 rounded-lg group-hover:h-[350px] overflow-y-scroll custom-zero-scrollbar transition-all duration-500 ease-in group-hover:border-b-[5px] group-hover:border-t border-primary shadow-2xl'>
                                        <div className='flex flex-col items-center gap-1.5 py-5'>
                                            {userCustomerDetails?.image ? <img src={api_urls + 'uploads/' + userCustomerDetails?.image} className='h-11 w-11 object-contain rounded-full bg-gray-100' /> : <ProfileSvg h='40' w='40' />}
                                            <div className='text-[16px]'>{userCustomerDetails?.name}</div>
                                            <div className='text-sm'>XXXXXX{userCustomerDetails?.phoneNumber?.toString()?.substring(6, 10)}</div>
                                        </div>
                                        <div onClick={() => navigate('/my-account?active-tab=update-profile')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer hover:text-primary'><div>Account</div></div>
                                        <div onClick={() => navigate('/wallet-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer hover:text-primary'><div>Wallet History</div></div>
                                        <div onClick={() => navigate('/transaction-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer hover:text-primary'><div>Transaction History</div></div>
                                        <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer hover:text-primary'><div>Logout</div></div>
                                    </div>
                                </div>
                            }
                        </nav>
                        <div onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} className={`cursor-pointer lg:hidden ${isHamburgerMenuOpen == true && 'invisible'}`}><HamburgerSvg h={'30'} w={'30'} /></div>
                    </main>


                    <main ref={navRef} className={`pb-40 flex flex-col gap-5 p-5 absolute h-full bg-white text-black border-r border-primary shadow-lg top-0 z-50 min-h-[100vh] w-[80vw] transition-all duration-500 overflow-y-scroll ${isHamburgerMenuOpen ? 'left-0' : 'left-[-200vw]'}`}>
                        <div onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} className='flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer'>CLOSE <CrossSvg w={'20'} /></div>
                        <div className='text-center font-semibold text-sm'>WHAT ARE YOU LOOKING FOR?</div>

                        <div className='flex flex-col'>
                            {userCustomerDetails && <>
                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} to="/my-account?active-tab=update-profile" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Account</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} to="/talk-to-consultant" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Talk To Astrologer</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} to="/chat-with-consultant" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Chat With Astrologer</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} to="/wallet-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Wallet History</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} to="/transaction-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Transaction History</NavLink>
                                </div>
                            </>}

                            {userAstrologerDetails && <>
                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} to="/astrologer-dashboard/my-account" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Account</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => dispatch(CommonActions.toggleHamburgerMenu(!isHamburgerMenuOpen))} to="/astrologer-dashboard/transaction-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Transaction History</NavLink>
                                </div>
                            </>}

                            {userAstrologerDetails || userCustomerDetails ?
                                <>
                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'></div><div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='cursor-pointer'>Logout</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'></div><div onClick={() => dispatch(AuthActions.requestToggleCustomerLoginModal())} className='cursor-pointer'>Login as Customer</div>
                                    </div>
                                    <div className='flex items-center gap-1 border-b py-4'>
                                        <div className='border-b-2 border-white'></div><div onClick={() => dispatch(AuthActions.requestToggleAstrologerLoginModal())} className='cursor-pointer'>Login as Astrologer</div>
                                    </div>
                                </>
                            }
                        </div>
                    </main>
                </article>
            </header>

            {isHamburgerMenuOpen && (<div className="fixed top-0 left-0 w-full h-full transition-all ease-in duration-300 bg-black bg-opacity-50 z-40" />)}
        </>
    )
}

export default Header;