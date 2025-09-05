import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const AstrologerGallerySwiper = ({ data }) => {
    const [slidesPerView, setslidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) setslidesPerView(2);
            else if (window.innerWidth <= 770) setslidesPerView(3);
            else if (window.innerWidth <= 900) setslidesPerView(4);
            else if (window.innerWidth <= 1000) setslidesPerView(2);
            else if (window.innerWidth <= 1200) setslidesPerView(3);
            else setslidesPerView(3);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1 }}
                spaceBetween={5}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                centeredSlides={true}
                keyboard={{ enabled: true }}
                className="mySwiper slot-swiper"
                pagination={false}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex justify-center items-center cursor-pointer'>
                            {value?.type === "image"
                                ?
                                <Zoom>
                                    <img loading="lazy" key={`img-${index}`} src={value?.src} alt={`Gallery-${index}`} className="rounded-md w-48 h-32 object-fill" />
                                </Zoom>
                                :
                                <video key={`vid-${index}`} src={value?.src} controls muted className="rounded-md min-w-48 h-32 object-contain" />
                            }
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default AstrologerGallerySwiper;