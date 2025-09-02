import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AstrologyServiceSwiper = ({ slidesPerView, navigation, pagination, data }) => {
    const navigate = useNavigate();

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1, }}
                spaceBetween={15}
                autoplay={{ delay: 3000, disableOnInteraction: false, }}
                loop={true}
                keyboard={{ enabled: true }}
                className="mySwiper"
                pagination={pagination && { clickable: true }}
                navigation={navigation ? true : false}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <div onClick={() => value?.title == 'Astro Shop' ? window.open(value?.path) : navigate(`/${value?.path}`)} className='flex justify-center items-center cursor-pointer'>
                            <div key={index} className='bg-white w-[300px] h-[180px] rounded-md flex flex-col items-center pt-5 gap-3'>
                                <div className='bg-primary text-white h-20 w-20 rounded-full flex items-center justify-center'>{value?.icon}</div>
                                <div className='text-[#2B2B2B] text-[18.53px] font-[500]'>{value?.title}</div>
                                {/* <div className='text-[12px] text-center px-10 text-[#808080]'>{value?.description}</div> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default AstrologyServiceSwiper;