import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Phone } from 'lucide-react';
import { support_email, website_name } from '../../utils/constants';
import { generateTokenByRequestPermission } from '../../config/firebase-config';
import { FacebookSvg, InstagramSvg, LinkdInSvg, LocationSvg, TwitterSvg, WhatsappSvg } from '../../assets/svg';

import Logo from '../../assets/images/logo/logo.png';
import * as AuthActions from '../../redux/actions/authAction';

const Footer = () => {
    const dispatch = useDispatch();

    // Todo : Astrolger Login Start
    const handleOpenLoginAstrologerModal = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            dispatch(AuthActions.setAstrologerLoginModalOpen(true));
        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
        }
    };

    return (
        <footer className='bg-primary text-white text-sm px-5 md:px-10 lg:px-20 py-20 lg:pb-24 font-light'>
            <article className='space-y-20'>
                <main className='grid grid-cols-1 lg:grid-cols-10 gap-20'>
                    <div className='lg:col-span-6 text-white space-y-8 '>
                        <div className='space-y-5'>
                            <img className='h-16 max-lg:h-10 -ml-5' src={Logo} />
                            <p className='tracking-wide text-justify'>{website_name} connects you with expert consultants worldwide, offering trusted advice, guidance, and solutions anytime you need.</p>
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <h3 className="uppercase text-sm font-semibold mb-2">Astrologers</h3>
                                <div className="w-10 border-t border-gray-600"></div>
                            </div>

                            <div className='flex flex-wrap gap-x-10 gap-y-2'>
                                <Link onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to={'consultant-signup'} className='bg-gradient-to-r from-blue-700 via-primary to-[#9544EB] bg-clip-text hover:text-transparent transition-all duration-500'>Astrologer Signup</Link>
                                <button onClick={handleOpenLoginAstrologerModal} className='bg-gradient-to-r from-blue-700 via-primary to-[#9544EB] bg-clip-text hover:text-transparent transition-all duration-500'>Astrologer login</button>
                            </div>
                        </div>
                    </div>

                    <div className='lg:col-span-4 text-white space-y-8 '>
                        <div className='space-y-4'>
                            <div>
                                <h3 className="uppercase text-sm font-semibold mb-2">Our Social Platform</h3>
                                <div className="w-10 border-t border-gray-600"></div>
                            </div>

                            <div className="flex items-center gap-3">
                                <a href="https://api.whatsapp.com/send?phone=+8974562459" target="_blank" rel="noopener noreferrer" className="rounded-sm transition-all duration-300 ease-linear hover:scale-[1.2] bg-[#86EC56]">
                                    <WhatsappSvg h={32} w={32} />
                                </a>
                                <a href="https://maps.app.goo.gl/" target="_blank" rel="noopener noreferrer" className="rounded-sm transition-all duration-300 ease-linear hover:scale-[1.2] bg-gradient-to-t from-[#F8A581] to-[#6AC63F] text-white">
                                    <LocationSvg h={32} w={32} />
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="rounded-sm transition-all duration-300 ease-linear hover:scale-[1.2] bg-[#3B5998]">
                                    <FacebookSvg h={32} w={32} />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="rounded-sm transition-all duration-300 ease-linear hover:scale-[1.2] bg-gradient-to-t from-[#B64680] to-[#E8A047]">
                                    <InstagramSvg h={32} w={32} />
                                </a>
                                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="rounded-sm transition-all duration-300 ease-linear hover:scale-[1.2] bg-[#1DA1F2]">
                                    <TwitterSvg h={32} w={32} />
                                </a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="rounded-sm transition-all duration-300 ease-linear hover:scale-[1.2] bg-[#0077B5]">
                                    <LinkdInSvg h={32} w={32} />
                                </a>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <h3 className="uppercase text-sm font-semibold mb-2">Contact us on</h3>
                                <div className="w-10 border-t border-gray-600"></div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded">
                                    <Mail strokeWidth={0.5} />
                                </div>

                                <div>
                                    <p className="text-sm">Email us</p>
                                    <a href={`mailto:${support_email}`} className="text-sm text-gray-300">{support_email}</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded">
                                    <Phone strokeWidth={0.5} />
                                </div>

                                <div>
                                    <p className="text-sm">Call us</p>
                                    <a href="tel:+8974562459" className="text-sm text-gray-300">8974562459</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        {[
                            "About Us",
                            "Terms of Use",
                            "Privacy Policy",
                            "Refund & Cancellation Policy",
                        ].map((label, idx, arr) => (
                            <React.Fragment key={label}>
                                <a href="#" className="text-gray-300 text-[13px]" >{label} </a> {idx < arr.length - 1 && (<span className="text-gray-600">|</span>)}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="border-t border-gray-800 my-4"></div>
                    <p className="text-center text-xs text-gray-500">Copyright © 2025 easyrxsol.com - All Rights Reserved.</p>
                </div>
            </article>
        </footer>
    )
}

export default Footer;