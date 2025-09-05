import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { toaster } from '../../../utils/services/toast-service';
import * as AstrologerActions from '../../../redux/actions/astrologerAction';

const AvailableSlotSwiper = ({ data, duration_minutes, astrologerId }) => {
    const dispatch = useDispatch();
    const { astrologerSlotTimeByDateData } = useSelector(state => state?.astrologerReducer);
    const [slidesPerView, setslidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) setslidesPerView(5);
            else if (window.innerWidth <= 770) setslidesPerView(8);
            else if (window.innerWidth <= 900) setslidesPerView(10);

            else if (window.innerWidth <= 1000) setslidesPerView(5);
            else if (window.innerWidth <= 1200) setslidesPerView(6);
            else setslidesPerView(7);
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
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                // loop={true}
                // centeredSlides={true}
                keyboard={{ enabled: true }}
                className="mySwiper slot-swiper"
                pagination={false}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((date, idx) => (
                    <SwiperSlide key={idx}>
                        <div className='flex justify-center items-center cursor-pointer py-1.5'>
                            <button key={idx}
                                onClick={() => {
                                    if (duration_minutes) {
                                        dispatch(AstrologerActions.getAstrologerSlotTimeByDate({ astrologerId, date, }))
                                    } else {
                                        toaster.info({ text: 'Please first select session duration' })
                                    }
                                }
                                }
                                className={`flex flex-col items-center py-1 w-16 rounded-md border transition text-xs ${date === astrologerSlotTimeByDateData?.SlotDate
                                    ? "bg-[#26A040] text-white border-[#26A040]"
                                    : "border-gray-400 text-gray-700 hover:bg-[#26A040] hover:text-white hover:border-[#26A040]"
                                    }`}
                            >
                                <span className="text-xs font-medium">{moment(date).format("DD MMM")}</span>
                                <span className="text-[10px] font-semibold uppercase">{moment(date).format("ddd")}</span>
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default AvailableSlotSwiper;