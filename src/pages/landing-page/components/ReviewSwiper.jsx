import { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ReviewSwiper = ({ navigation, pagination, data }) => {
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setSlidesPerView(1);
            } else if (window.innerWidth <= 1000) {
                setSlidesPerView(2);
            } else if (window.innerWidth <= 1200) {
                setSlidesPerView(3);
            } else {
                setSlidesPerView(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1 }}
                spaceBetween={10}
                autoplay={{ delay: 3000, disableOnInteraction: false, }}
                loop={true}
                centeredSlides={true}
                keyboard={{ enabled: true }}
                className="mySwiper"
                pagination={pagination && { clickable: true }}
                navigation={navigation ? true : false}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <div className='py-10 pt-20'>
                            <div className="flex flex-col border border-primary/30 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-300">
                                <div className="flex justify-center -mt-10">
                                    <img src={value.image} alt={value.name} className="h-20 w-20 rounded-full border-2 border-primary object-cover shadow-md" />
                                </div>

                                <div className="px-5 pb-6 flex flex-col items-center gap-3 mt-4">
                                    <Quote className="text-primary opacity-70" size={28} />

                                    <p className="text-gray-700 text-center text-sm italic leading-relaxed line-clamp-3">{value.feedback}</p>

                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[...Array(value.rating)].map((_, i) => (
                                            <Star key={i} size={16} fill="currentColor" />
                                        ))}
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <h3 className="text-[16px] font-semibold text-primary">{value.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ReviewSwiper;