import ReactPlayer from "react-player";
import { FileText, Layers3, MessageCircle, Phone, Play, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as BlogActions from "../../redux/actions/blogAction.js";
import * as AstrologerActions from "../../redux/actions/astrologerAction.js";
import { BagSvg, CallSvg, ChatSvg, ViewSvg } from '../../assets/svg/index.js';
import TodayHoroscope from '../../assets/images/landing-page/service/Today-Horoscope.png';
import FreeKundli from '../../assets/images/landing-page/service/Free-Kundli.png';
import MatchMaking from '../../assets/images/landing-page/service/Match-Making.png';
import Remedies from '../../assets/images/landing-page/service/Remedies.png';
import { api_urls } from '../../utils/api-urls/index.js';
import { IndianRupee } from '../../utils/common-function/index.js';
import LandingTopSwiper from './components/LandingTopSwiper.jsx';
import BlogSwiper from './components/BlogSwiper.jsx';

import '../../assets/css/swiper.css';
import SectionHeading from './components/SectionHeading.jsx';
import ReviewSwiper from "./components/ReviewSwiper.jsx";
import ConsultantCard from "../astrologer/components/ConsultantCard.jsx";

const serviceData = [
    { path: 'talk-to-consultant', title: 'Talk To Consultant', icon: <CallSvg h='40' w='40' />, description: "Connect instantly with expert astrologers for personalized guidance on life's important decisions." },
    { path: 'chat-with-consultant', title: 'Chat With Consultant', icon: <ChatSvg h='40' w='40' />, description: 'Get instant answers to your queries through text chat with trusted astrologers anytime, anywhere.' },
    // { path: 'chat-with-consultant', title: 'Video Call With Consultant', icon: <VideoIcon size={40} />, description: 'Get instant answers to your queries through text chat with trusted astrologers anytime, anywhere.' },
    { path: 'book-puja', title: 'Book Puja', icon: <BagSvg h='40' w='40' />, description: "Explore a range of authentic astrological products tailored to enhance positivity and well-being." },
    { path: 'blog', title: 'Blog', icon: <FileText className='w-8 h-8' />, description: 'Experience face-to-face consultations with astrologers for in-depth and interactive sessions.' },
];

const complimentryAstrologyService = [
    { title: `Today's Horoscope`, path: '/horoscope', image: TodayHoroscope },
    { title: 'Free Kundli', path: '/kundli', image: FreeKundli },
    { title: 'Kundli Matching', path: '/kundli-matching', image: MatchMaking },
    { title: 'Remedies', path: '/book-puja', image: Remedies },
]

const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { astroBlogData } = useSelector(state => state?.blogreducer);
    const { astrologerData } = useSelector(state => state?.astrologerReducer);

    //! For Swiper Slider 
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [astrologyServiceSlidesPerView, setAstrologyServiceSlidesPerView] = useState(3);
    const [astrologyServiceSlideNavigation, setAstrologyServiceSlideNavigation] = useState(false);
    const [blogSlidesPerView, setBlogSlidesPerView] = useState(3);

    const handleViewBlog = (data) => {
        dispatch(BlogActions?.incrementAstroBlogViewCount({ blogId: data?._id }))
        navigate(`/blog/blog-details?title=${data?.title?.split(' ')?.join('-')?.toLowerCase()}&id=${data?._id}`)
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setSlidesPerView(1);
                setAstrologyServiceSlideNavigation(true);
                setAstrologyServiceSlidesPerView(1);
                setBlogSlidesPerView(1);
            } else if (window.innerWidth <= 1000) {
                setSlidesPerView(2);
                setAstrologyServiceSlideNavigation(true);
                setAstrologyServiceSlidesPerView(2);
                setBlogSlidesPerView(2);
            } else if (window.innerWidth <= 1200) {
                setSlidesPerView(4);
                setAstrologyServiceSlidesPerView(2);
                setBlogSlidesPerView(3);
                setAstrologyServiceSlideNavigation(false);
            } else {
                setSlidesPerView(5);
                setAstrologyServiceSlideNavigation(false);
                setAstrologyServiceSlidesPerView(4);
                setBlogSlidesPerView(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //! Dispatching API for Get Blogs
        // dispatch(BlogActions.getAstroblog({ page: 1, limit: 3, search: '', categoryId: '' }));
        dispatch(BlogActions.getAstroblog({ limit: 9 }));

        //! Dispatching API for Get Astrologers
        dispatch(AstrologerActions.getAstrologer());
    }, [dispatch]);

    return (
        <>
            <section className='flex gap-3 flex-col'>
                <section className='flex-1'>
                    <LandingTopSwiper astrologerSlidesPerView={1} navigation={false} pagination={false} />

                    <div className="mt-16 px-2 pb-2.5 max-md:pt-5 space-y-4 bg-white">
                        <div className="flex items-center flex-wrap justify-center gap-5 md:-translate-y-[50%]">
                            {/* <Link to={'/talk-to-consultant'} className="bg-white/80 backdrop-blur-md text-2xl border rounded-xl p-5 flex items-center justify-center gap-5 border-primary max-w-sm shadow-lg shadow-primary/30 relative z-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none rounded-xl" />
                                <Phone className="w-8 h-8 text-primary relative z-10" />
                                <p className="relative z-10">Talk to <span className="text-primary font-semibold">Consultation</span></p>
                            </Link> */}
                            <Link to={'/video-call-with-consultant'} className="bg-white/80 backdrop-blur-md text-2xl border rounded-xl p-5 flex items-center justify-center gap-5 border-primary max-w-sm shadow-lg shadow-primary/30 relative z-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none rounded-xl" />
                                <Video className="w-8 h-8 text-primary relative z-10" />
                                <p className="relative z-10 text-nowrap">Videocall with <span className="text-primary font-semibold">Consultation</span></p>
                            </Link>

                            <Link to={'/chat-with-consultant'} className="bg-white/80 backdrop-blur-md text-2xl border rounded-xl p-5 flex items-center justify-center gap-5 border-primary max-w-sm shadow-lg shadow-primary/30 relative z-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none rounded-xl" />
                                <MessageCircle className="w-8 h-8 text-primary relative z-10" />
                                <p className="relative z-10">Chat with <span className="text-primary font-semibold">Consultation</span></p>
                            </Link>
                        </div>

                        <SectionHeading title={'Our Consultant'} paragraph={'Get expert advice instantly through call or chat, tailored to your needs and questions.'} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {astrologerData?.map((astrologer, index) => <ConsultantCard key={index} astrologer={astrologer} />)}
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-br from-primary via-pink-100/10 to-red-100/5 py-14 space-y-10">
                    <SectionHeading title={'TRUSTED BY CELEBRITIES'} paragraph={'Hear how top stars found clarity, guidance, and success through astrology.'} />

                    <div className="flex justify-center flex-wrap gap-6 px-6 overflow-x-scroll custom-scrollbar-zero">
                        <div className="flex items-center gap-6 relative min-h-96">
                            {videos.map((video, idx) => (
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
                        <ReviewSwiper data={testimonialsData} slidesPerView={blogSlidesPerView} navigation={true} pagination={false} />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary via-pink-100/10 to-red-100/5 py-14 space-y-10">
                    <SectionHeading title={'Media Spotlight'} paragraph={'Recognized by trusted media platforms for our impactful spiritual guidance.'} />

                    <div className="flex justify-center flex-wrap gap-6 px-6">
                        {[
                            {
                                src: 'https://lifechangingastro.com/cdn/shop/files/Untitled_design_1-removebg-preview_c1f309e8-0d86-4e50-85c8-d5587c8950f5.png?v=1748352241&width=400',
                                alt: 'Life Changing Astro'
                            },
                            {
                                src: 'https://lifechangingastro.com/cdn/shop/files/Dainik_Bhaskar_Logo-removebg-preview.png?v=1748348240&width=400',
                                alt: 'Dainik Bhaskar'
                            },
                            {
                                src: 'https://lifechangingastro.com/cdn/shop/files/Rajasthan-patrika-logo-removebg-preview.png?v=1748348281&width=400',
                                alt: 'Rajasthan Patrika'
                            },
                            {
                                src: 'https://lifechangingastro.com/cdn/shop/files/news18-logo-vector-removebg-preview.png?v=1748348645&width=400',
                                alt: 'News 18'
                            },
                            {
                                src: 'https://lifechangingastro.com/cdn/shop/files/images-removebg-preview.png?v=1748348670&width=312',
                                alt: 'Jagran'
                            },
                        ].map((logo, index) => (
                            <div
                                key={index}
                                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 sm:p-6 w-36 sm:w-48 h-24 sm:h-28 flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='px-2 py-3 space-y-3 bg-white'>
                    <SectionHeading title={'Latest From Blog'} paragraph={'Top Astrologers. 24 * 7 customer support. Happy to help'} />

                    <div className='m-auto'>
                        <BlogSwiper data={astroBlogData?.results} slidesPerView={blogSlidesPerView} navigation={true} pagination={false} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;

const videos = [
    {
        videoId: 'https://www.youtube.com/watch?v=jh2LJVDtGIY&list=RDjh2LJVDtGIY&start_radio=1',
        title: "Rashmi Desai's Secret to Success!",
        description: "Exclusive talk and insights.",
    },
    {
        videoId: 'https://www.youtube.com/watch?v=jh2LJVDtGIY&list=RDjh2LJVDtGIY&start_radio=1',
        title: "Priya Singh - From Village to the World!",
        description: "Recommends Consult World Online",
        big: true,
    },
    {
        videoId: 'https://www.youtube.com/watch?v=jh2LJVDtGIY&list=RDjh2LJVDtGIY&start_radio=1',
        title: "Falak Naaz has a message for you!",
        description: "Special inspiration.",
    },
];

const testimonialsData = [
    {
        name: "Rashmi Kapoor",
        title: "Entrepreneur",
        image: 'https://api.myfuturetalk.com/uploads/profileImage/7c66c7bd-6860-457b-bc61-b2f27b9a1654.jpeg',
        rating: 5,
        feedback:
            "Career decisions lete waqt Consult World Online ke expert se consult kiya. Unke practical guidance ne mujhe sahi direction dikhayi. Ab main confidently apna business expand kar pa rahi hoon."
    },
    {
        name: "Priya Sharma",
        title: "Working Professional",
        image: 'https://api.myfuturetalk.com/uploads/profileImage/7c66c7bd-6860-457b-bc61-b2f27b9a1654.jpeg',
        rating: 5,
        feedback:
            "Life ke mushkil samay mein Consult World Online ka consultation meri madad bana. Health aur personal issues par jo clarity mili wo priceless thi. Har tarah ke experts yaha available hai."
    },
    {
        name: "Amit Verma",
        title: "Student",
        image: 'https://api.myfuturetalk.com/uploads/profileImage/7c66c7bd-6860-457b-bc61-b2f27b9a1654.jpeg',
        rating: 5,
        feedback:
            "Education aur career ke liye confusion tha, par Consult World Online ke mentors ne mujhe correct path suggest kiya. Ab mujhe future ke liye clear vision hai. Highly recommended!"
    },
    {
        name: "Neha Singh",
        title: "Homemaker",
        image: 'https://api.myfuturetalk.com/uploads/profileImage/7c66c7bd-6860-457b-bc61-b2f27b9a1654.jpeg',
        rating: 5,
        feedback:
            "Relationship aur family issues par consultation liya tha. Jo solutions aur remedies bataye gaye usne meri life ko easy bana diya. Yaha ke experts bohot experienced hain."
    },
    {
        name: "Rohit Mehra",
        title: "IT Professional",
        image: 'https://api.myfuturetalk.com/uploads/profileImage/7c66c7bd-6860-457b-bc61-b2f27b9a1654.jpeg',
        rating: 5,
        feedback:
            "Stress aur work-life balance ke liye guidance chahiye thi. Consult World Online ke wellness experts ne bohot practical advice di. Ab main apni life ko better handle kar pa raha hoon."
    }
];