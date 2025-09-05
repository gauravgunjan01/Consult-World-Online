import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { api_urls } from '../../utils/api-urls/index.js';
import { CelebritiesData, ComplimentaryAstrologyServicesData, MediaSpotLightData, ServicesData, TestimonialsData } from '../../utils/static-data/index.js';

import * as AstrologerActions from '../../redux/actions/astrologerAction';

import ReviewSwiper from './components/ReviewSwiper.jsx';
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
            <section className='space-y-20 py-10 px-5'>
                <div className='space-y-10'>
                    <SectionHeading title={'Our Consultant'} paragraph={'Consult Astrologer on Chat, Voice Call & Video Call.'} />

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        {astrologersData?.map((astrologer, index) => <ConsultantCard key={index} astrologer={astrologer} />)}
                    </div>
                </div>

                <div className='space-y-10'>
                    <SectionHeading title={'TRUSTED BY CELEBRITIES'} paragraph={'Hear how top stars found clarity, guidance, and success through astrology.'} />

                    <div className='flex justify-center flex-wrap gap-6 px-6 overflow-x-scroll custom-scrollbar-zero'>
                        <div className='flex items-center gap-6 relative min-h-96'>
                            {CelebritiesData.map((video, idx) => (
                                <div key={idx} className={`relative bg-white rounded-lg min-w-96 shadow-lg overflow-hidden text-center transition transform ${video?.big ?
                                    'z-20 scale-110' :
                                    idx == 2
                                        ? 'z-10 scale-90 -translate-x-10'
                                        : 'z-10 scale-90 translate-x-10'
                                    } `}
                                >
                                    <div className='relative'>
                                        <ReactPlayer src={video.videoId} width='100%' height='250px' controls />
                                    </div>

                                    <div className='p-4'>
                                        <h3 className='text-lg font-semibold text-gray-900'>{video?.title}</h3>
                                        <p className='text-sm text-gray-600 mt-2'>{video?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='space-y-10'>
                    <SectionHeading title={'Client Reviews'} paragraph={'Words from the hearts of thousands who found guidance, clarity, and peace through our astrology platform.'} />

                    <div className='m-auto'>
                        <ReviewSwiper data={TestimonialsData} navigation={true} pagination={false} />
                    </div>
                </div>

                <div className='space-y-10'>
                    <SectionHeading title={'Media Spotlight'} paragraph={'Recognized by trusted media platforms for our impactful spiritual guidance.'} />

                    <div className='flex justify-center flex-wrap gap-6 px-6'>
                        {MediaSpotLightData.map((logo, index) => (
                            <div key={index} className='bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 sm:p-6 w-36 sm:w-48 h-24 sm:h-28 flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300'>
                                <img src={logo.src} alt={logo.alt} className='max-h-full max-w-full object-contain' />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;