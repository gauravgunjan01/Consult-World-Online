import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import LandingImage from '../../../assets/images/landing-page/landing-banner-image.jpg';
import { Sparkles } from 'lucide-react';

const LandingTopSwiper = ({ slidesPerView, navigation, pagination }) => {

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={3000}
                loop={true}
                // slidesPerView={slidesPerView}
                // navigation={navigation}
                // pagination={pagination && { clickable: true }}
                // allowTouchMove={true}
                // keyboard={{ enabled: true }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {[
                    { id: 1, source: LandingImage },
                    { id: 2, source: LandingImage },
                ].map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='grid lg:grid-cols-2 bg-white rounded-b-sm p-4 gap-5'>
                            <img src={item?.source} className='max-h-96'/>

                            <div className='flex flex-col gap-4 justify-center items-start p-4 bg-white rounded-md h-full'>
                                <div>
                                    <h2 className='text-2xl lg:text-3xl font-bold text-black leading-snug uppercase'>Get Best Consults</h2>
                                    <p className='text-md text-red-500 mt-2 mb-4'>From India's Top Consultants</p>
                                </div>

                                <div className="place-self-start bg-white/80 backdrop-blur-md text-2xl border rounded-full flex items-center justify-center gap-5 px-5 pt-2.5 pb-2 border-primary shadow-lg shadow-primary/30 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none rounded-xl" />
                                    <Sparkles className="w-6 h-6 text-red-500 relative z-10" />
                                    <p className="relative z-10">Consult <span className="text-primary font-semibold"> Now</span></p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}

export default LandingTopSwiper;