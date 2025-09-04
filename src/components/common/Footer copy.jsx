// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { BotSvg, EmailSvg, FacebookSvg, InstagramSvg, LinkedinSvg, SecureSvg, YoutubeSvg } from '../../assets/svg';
// import { current_year, support_email, website_name } from '../../utils/constants';
// import * as AuthActions from '../../redux/actions/authAction';

// const Footer = ({ scrollToSection }) => {
//     const { userCustomerDetails, userAstrologerDetails } = useSelector(state => state?.userReducer);
//     const dispatch = useDispatch();

//     return (
//         <>
//             <footer className='bg-[#363636] text-[#DDDDDD] text-[15px] font-[400] px-4 lg:px-10 py-10'>
//                 <div className='flex flex-col gap-2 border-b border-[#7D7D7D] pb-3 mb-5'>
//                     <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>About {website_name}</span>
//                     <div className='text-justify'><span className='font-[500]'>{website_name}</span> is the best astrology website for online Astrology predictions. Talk to Astrologer on call and get answers to all your worries by seeing the future life through Astrology Kundli Predictions from the best Astrologers from India. Get best future predictions related to Marriage, love life, Career or Health over call, chat, query or report.</div>
//                 </div>
//                 <article className='flex flex-wrap justify-between gap-x-[1%] gap-y-10'>
//                     <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
//                         <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Horoscope</span>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/horoscope'>Horoscope 2025</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='horoscope'>Today's Horoscope</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='horoscope'>Today's Love Horoscope</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='horoscope'>Yesterday's Horoscope</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='horoscope'>Tomorrow's Horoscope</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/horoscope'>Weekly Horoscope</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/horoscope'>Monthly Horoscope</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/horoscope'>Yearly Horoscope</Link>
//                         </main>

//                         <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Shubh Muhurat {current_year}</span>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Annanprashan Muhurat {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Naamkaran Muhurat {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Car/Bike Muhurat {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Marriage Muhurat {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Gold Buying Muhurat {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Bhoomi Pujan Muhurat {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Griha Pravesh Muhurat {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/shubh-muhurat'>Mundan Muhurat {current_year}</Link>
//                         </main>
//                     </main>

//                     <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-3'>
//                         <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Important Links</span>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Today Panchang</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/kundli'>How to read kundli</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/kundli'>Free Kundli</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/kundli-matching'>Kundli Matching</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/astrologer'>Chat with Consultant</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/astrologer'>Talk to Consultant</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>{website_name} Reviews</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Astrology Yoga</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Kaalsarp Doshas</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Child Astrology</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Ascendant Sign Gemstone</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Nakshatras Constellations</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Numerology</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Mantras</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Astrological remedies for job</Link>
//                         <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Promotion</Link>
//                     </main>

//                     <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
//                         <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Important Links</span>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/blog'>Blog</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Planetary Transit {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Collaboration</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Tarot</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Zodiac Signs</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Vastu Shastra</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Solar Eclipse {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Lunar Eclipse {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Festival Calendar {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Vrat Calendar {current_year}</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Mole Astrology</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>Love Calculator</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/important-links'>{website_name} Sitemap</Link>
//                         </main>

//                         {!userCustomerDetails && !userAstrologerDetails && <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Consultant</span>
//                             <Link onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to={'consultant-signup'} className='cursor-pointer'>Consultant Signup</Link>
//                             <div onClick={() => dispatch(AuthActions.requestToggleCustomerLoginModal())} className='cursor-pointer'>Consultant Login</div>
//                             {/* <Link onClick={()=>window?.scrollTo({top:0, behavior:'smooth'})} to=''>Astrologer Registration</Link> */}
//                         </main>}

//                         <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Corporate Info</span>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/'>Refund & Cancellation Policy</Link>
//                         </main>
//                     </main>

//                     <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
//                         <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Corporate Info</span>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/terms-of-use'>Terms & Conditions</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/privacy-policy'>Privacy Policy</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/'>Disclaimer</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/about-us'>About Us</Link>
//                             <Link className='hover:text-primary' onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to='/'>Pricing Policy</Link>
//                         </main>

//                         <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-[#FD6008] inline-block pb-1 self-start'>Contact us</span>
//                             <div className='flex items-center gap-1'><BotSvg /> We are available 24x7 on chat </div>
//                             <a href={`mailto:${support_email}`}>Support, <span className='text-primary'>click to start chat</span></a>
//                             <a href={`mailto:${support_email}`} className='flex items-center gap-1 cursor-pointer hover:text-primary'><EmailSvg /> Email ID: {support_email}</a>
//                         </main>

//                         <div className='flex gap-1.5 items-center justify-between'>
//                             <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
//                                 <FacebookSvg />
//                             </a>
//                             <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
//                                 <InstagramSvg />
//                             </a>
//                             <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
//                                 <LinkedinSvg />
//                             </a>
//                             <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
//                                 <YoutubeSvg />
//                             </a>
//                         </div>

//                         <main className='flex flex-col gap-3'>
//                             <span className='text-[17px] font-[500] border-b-2 border-primary inline-block pb-1 self-start'>Secure</span>
//                             <div className='flex items-center'><SecureSvg /> Private & Confidential</div>
//                             <div className='flex items-center'><SecureSvg /> Verified Astrologers</div>
//                             <div className='flex items-center'><SecureSvg /> Secure Payments</div>
//                         </main>
//                     </main>
//                 </article>
//             </footer>
//         </>
//     )
// }

// export default Footer;
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BotSvg, EmailSvg, FacebookSvg, InstagramSvg, LinkedinSvg, SecureSvg, YoutubeSvg } from '../../assets/svg';
import { current_year, support_email, website_name } from '../../utils/constants';
import * as AuthActions from '../../redux/actions/authAction';

const Footer = () => {
    const dispatch = useDispatch();
    const { userCustomerDetails, userAstrologerDetails } = useSelector(state => state?.userReducer);

    return (
        <>
            <footer className='bg-[#f5f5f5] text-[#000] text-sm font-[400] px-4 sm:px-10 py-5 space-y-4'>
                {/* <article className='flex flex-wrap justify-between gap-x-[1%] gap-y-10 mb-10'>
                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-secondary inline-block pb-1 self-start'>Horoscope</span>
                            {[
                                { name: 'Today\'s Horoscope', to: '/horoscope' },
                                { name: 'Weekly Horoscope', to: '/horoscope' },
                                { name: 'Monthly Horoscope', to: '/horoscope' },
                                { name: 'Yearly Horoscope', to: '/horoscope' },
                            ]
                                .map((item, i) => <Link key={i} to={item.to} className={`hover:text-secondary`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{item.name}</Link>)
                            }
                        </main>

                    </main>

                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-3'>
                        <span className='text-[17px] font-[500] border-b-2 border-secondary inline-block pb-1 self-start'>Panchang & Muhurat</span>
                        {[
                            { name: 'Today Panchang', to: '/panchang-and-muhurat?active=panchang' },
                            { name: 'Hora Muhurat', to: '/panchang-and-muhurat?active=hora-muhurat' },
                            { name: 'Chaughadiya Details', to: '/panchang-and-muhurat?active=chaughadiya-details' },
                            { name: 'Marriage Muhurat', to: '/panchang-and-muhurat?active=marriage-muhurat' },
                        ]
                            .map((item, i) => <Link key={i} to={item.to} className={`hover:text-secondary`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{item.name}</Link>)
                        }
                    </main>

                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-3'>
                        <span className='text-[17px] font-[500] border-b-2 border-secondary inline-block pb-1 self-start'>Important Links</span>
                        {[
                            { name: 'Free Kundli', to: '/kundli' },
                            { name: 'Kundli Matching', to: '/kundli-matching' },
                            { name: 'Numerology', to: '/numerology' },
                            // { name: 'Zodiac Signs', to: '/important-links' },
                        ]
                            .map((item, i) => <Link key={i} to={item.to} className={`hover:text-secondary`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{item.name}</Link>)
                        }
                    </main>

                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-secondary inline-block pb-1 self-start'>Corporate Info</span>
                            {
                                [{ name: 'Terms & Conditions', to: '/terms-conditions', isBold: true },
                                { name: 'Privacy Policy', to: '/privacy-policy', isBold: true },
                                { name: 'About Us', to: '/about-us', isBold: true },
                                ]
                                    .map((item, i) => <Link key={i} to={item.to} className={`hover:text-secondary`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{item.name}</Link>)
                            }
                            <p>Support: {support_email}</p>
                        </main>
                    </main>
                </article> */}

                {/* Astrologer Section */}
                {!userCustomerDetails && !userAstrologerDetails && <>
                    <div className="text-center text-base font-medium">Astrologer</div>
                    <main className="flex flex-wrap justify-center text-center gap-x-3 gap-y-2 border-b border-gray-300 pb-3">
                        <Link onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })} to={'consultant-signup'} className='hover:text-secondary hover:bg-white bg-secondary text-white px-5 py-0.5 rounded-full cursor-pointer transition-all duration-500'>Astrologer Signup</Link>
                        <div onClick={() => dispatch(AuthActions.requestToggleCustomerLoginModal())} className='hover:text-secondary hover:bg-white bg-secondary text-white px-5 py-0.5 rounded-full cursor-pointer transition-all duration-500'>Astrologer Login</div>
                    </main>
                </>}

                {/* Copyright */}
                <div className="text-center py-3 text-xs text-gray-600">
                    © All copyrights reserved 2025 {website_name}.in.
                </div>
            </footer >
        </>
    )
}

export default Footer;