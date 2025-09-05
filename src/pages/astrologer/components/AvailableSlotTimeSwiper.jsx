import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AvailableSlotTimeSwiper = ({ data, duration_minutes = '15min', selectedSlot, handleSelect }) => {
    const [slidesPerView, setslidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) setslidesPerView(3);
            else if (window.innerWidth <= 770) setslidesPerView(5);
            else if (window.innerWidth <= 900) setslidesPerView(6);

            else if (window.innerWidth <= 1200) setslidesPerView(3);
            else setslidesPerView(4);
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
                spaceBetween={15}
                // autoplay={{ delay: 3000, disableOnInteraction: false }}
                // loop={true}
                // centeredSlides={true}
                keyboard={{ enabled: true }}
                className="mySwiper slot-swiper"
                pagination={false}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.SlotTimeByDuration[duration_minutes]?.map((slot, idx) => {
                    const isAvailable = slot?.status === "available";
                    const isSelected = selectedSlot?._id === slot?._id;
                    return (
                        <SwiperSlide key={idx}>
                            <div className='flex justify-center items-center cursor-pointer py-1.5'>
                                <div
                                    key={idx}
                                    onClick={() => isAvailable && handleSelect(slot)}
                                    className={`text-nowrap p-4 rounded-md shadow-md text-center font-medium text-sm transition
                                                ${isAvailable
                                            ? isSelected
                                                ? "bg-[#26A040] text-white cursor-pointer"
                                                : "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    {slot?.fromTime} - {slot?.toTime}
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}

export default AvailableSlotTimeSwiper;