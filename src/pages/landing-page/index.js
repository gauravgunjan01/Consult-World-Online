import { useEffect } from 'react';
import ReactPlayer from "react-player";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { api_urls } from '../../utils/api-urls/index.js';
import { CelebritiesData, ComplimentaryAstrologyServicesData, MediaSpotLightData, ServicesData, TestimonialsData } from '../../utils/static-data/index.js';

import * as AstrologerActions from "../../redux/actions/astrologerAction";

import ReviewSwiper from "./components/ReviewSwiper.jsx";
import SectionHeading from './components/SectionHeading.jsx';
import LandingBanner from '../../assets/images/landing-page/landing-banner.jpg';
import LandingBannerSmall from '../../assets/images/landing-page/landing-banner-small.jpg';

import '../../assets/css/swiper.css';
import ConsultantCard from '../astrologer/components/ConsultantCard.jsx';

const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { astrologersData } = useSelector(state => state?.astrologerReducer);
    console.log({ astrologersData });

    useEffect(() => {
        //! Dispatching API
        dispatch(AstrologerActions.getAstrologers());
    }, [dispatch]);

    return (
        <>
            <section className='flex gap-3 max-lg:flex-col'>
                <section className='flex-1 lg:flex-[0.75] space-y-3'>
                    <div className=''>
                        <img onDoubleClick={() => navigate('/astrologer')} src={LandingBanner} className='max-md:hidden w-full h-full cursor-pointer object-cover object-center' />
                        <img onDoubleClick={() => navigate('/astrologer')} src={LandingBannerSmall} className='md:hidden w-full' />
                    </div>

                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
                        {ServicesData?.map((value, index) => (
                            <div key={index} onClick={() => value?.title == 'Astro Shop' ? window.open(value?.path) : navigate(`/${value?.path}`)} className='flex justify-center items-center cursor-pointer'>
                                <div key={index} className='bg-white w-full h-[150px] rounded-sm flex flex-col items-center pt-5 gap-3'>
                                    <div className='bg-primary text-white h-20 w-20 rounded-full flex items-center justify-center'>{value?.icon}</div>
                                    <div className='text-primary font-[500]'>{value?.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-2 pt-4 pb-2.5 space-y-8 bg-cream">
                        <h2 className="text-2xl font-medium text-secondary">Consult Astrologer on Call & Chat</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {astrologersData?.map((astrologer, index) => <ConsultantCard key={index} astrologer={astrologer} />)}
                        </div>
                    </div>
                </section>

                <aside className='flex-1 space-y-3 lg:flex-[0.25]'>
                    <div className='px-2 py-3 space-y-3 bg-cream'>
                        <div className='text-lg lg:text-xl font-medium text-center tracking-tight uppercase'>Complimentary astrology services</div>

                        <div className='grid grid-cols-2 gap-3'>
                            {ComplimentaryAstrologyServicesData?.map((value, index) => (
                                <Link to={value?.path} key={index} className='bg-white rounded-md flex flex-col items-center pt-5 gap-3'>
                                    <img src={value?.image} className='h-20' />
                                    <div className={`text-primary font-medium w-full h-full text-center ${(index == 1 || index == 2) && 'bg-primary text-white'}`}>
                                        <div>{value?.title?.split(' ')[0]}</div>
                                        <div>{value?.title?.split(' ')[1]}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* <div className='px-2 py-3 space-y-3 bg-cream'>
                        <div className='space-y-1'>
                            <div className='text-lg lg:text-xl font-medium text-center tracking-tight uppercase'>Latest From Blog</div>
                            <div className='text-[13px] lg:text-sm font-medium text-center'>Top Astrologers. 24 * 7 customer support. Happy to help</div>
                        </div>

                        <main className='space-y-2'>
                            {astroBlogData?.results?.map((value, index) => (
                                <div key={index} onClick={() => handleViewBlog(value)} className='relative bg-white flex flex-col border border-secondary rounded-md cursor-pointer'>
                                    <img src={api_urls + 'uploads/' + value?.image} className='h-[150px] rounded-t-md object-center' />
                                    <div className='absolute top-[10px] right-[10px] flex items-center justify-between px-4 w-[95px] h-[23px] rounded-[18px] text-sm bg-white text-[#C9C9C9]'><Eye /> <span className='text-black'>{value?.viewsCount}</span></div>

                                    <div className="px-3 pt-2.5 pb-4 text-[#545353] flex flex-col gap-2">
                                        <h2 className="text-primary font-medium line-clamp-2">{value?.title}</h2>
                                        <div className="flex items-center justify-between text-[14px]">
                                            <p>{value?.created_by}</p>
                                            <p>{moment(value?.createdAt)?.format('MMMM DD, YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </main>
                    </div> */}
                </aside>
            </section>

            <section className="space-y-3">
                <div className="bg-gradient-to-br from-primary via-pink-100/10 to-red-100/5 py-14 space-y-10">
                    <SectionHeading title={'TRUSTED BY CELEBRITIES'} paragraph={'Hear how top stars found clarity, guidance, and success through astrology.'} />

                    <div className="flex justify-center flex-wrap gap-6 px-6 overflow-x-scroll custom-scrollbar-zero">
                        <div className="flex items-center gap-6 relative min-h-96">
                            {CelebritiesData.map((video, idx) => (
                                <div key={idx} className={`relative bg-white rounded-lg min-w-96 shadow-lg overflow-hidden text-center transition transform ${video?.big ?
                                    "z-20 scale-110" :
                                    idx == 2
                                        ? "z-10 scale-90 -translate-x-10"
                                        : "z-10 scale-90 translate-x-10"
                                    } `}
                                >
                                    <div className="relative">
                                        <ReactPlayer src={video.videoId} width="100%" height="250px" controls />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{video?.title}</h3>
                                        <p className="text-sm text-gray-600 mt-2">{video?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='px-2 py-3 space-y-3 bg-white'>
                    <SectionHeading title={'Client Reviews'} paragraph={'Words from the hearts of thousands who found guidance, clarity, and peace through our astrology platform.'} />

                    <div className='m-auto'>
                        <ReviewSwiper data={TestimonialsData} navigation={true} pagination={false} />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary via-pink-100/10 to-red-100/5 py-14 space-y-10">
                    <SectionHeading title={'Media Spotlight'} paragraph={'Recognized by trusted media platforms for our impactful spiritual guidance.'} />

                    <div className="flex justify-center flex-wrap gap-6 px-6">
                        {MediaSpotLightData.map((logo, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 sm:p-6 w-36 sm:w-48 h-24 sm:h-28 flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300">
                                <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;