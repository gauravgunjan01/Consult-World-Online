import { FileText } from 'lucide-react';

//! Landing Page
//* Complimentary Astrology Services Data
import Remedies from '../../assets/images/landing-page/service/Remedies.png';
import FreeKundli from '../../assets/images/landing-page/service/Free-Kundli.png';
import MatchMaking from '../../assets/images/landing-page/service/Match-Making.png';
import TodayHoroscope from '../../assets/images/landing-page/service/Today-Horoscope.png';

//* Services Data
import { BagSvg, CallSvg, ChatSvg, ViewSvg } from '../../assets/svg/index.js';

//! Zodiac Image
import Aries from '../../assets/images/zodiac-image/Frame 44.png';
import Taurus from '../../assets/images/zodiac-image/Frame 45.png';
import Gemini from '../../assets/images/zodiac-image/Frame 46.png';
import Cancer from '../../assets/images/zodiac-image/Frame 47.png';
import Leo from '../../assets/images/zodiac-image/Frame 48.png';
import Virgo from '../../assets/images/zodiac-image/Frame 49.png';
import Libra from '../../assets/images/zodiac-image/Frame 50.png';
import Scorpio from '../../assets/images/zodiac-image/Frame 51.png';
import Sagittarius from '../../assets/images/zodiac-image/Frame 52.png';
import Capricorn from '../../assets/images/zodiac-image/Frame 53.png';
import Aquarius from '../../assets/images/zodiac-image/Frame 54.png';
import Pisces from '../../assets/images/zodiac-image/Frame 55.png';


export const ZodiacImageWithName = [
    { title: 'Aries', zodiacSign: 'Aries', image: Aries },
    { title: 'Taurus', zodiacSign: 'Taurus', image: Taurus },
    { title: 'Gemini', zodiacSign: 'Gemini', image: Gemini },
    { title: 'Cancer', zodiacSign: 'Cancer', image: Cancer },
    { title: 'Leo', zodiacSign: 'Leo', image: Leo },
    { title: 'Virgo', zodiacSign: 'Virgo', image: Virgo },
    { title: 'Libra', zodiacSign: 'Libra', image: Libra },
    { title: 'Scorpio', zodiacSign: 'Scorpio', image: Scorpio },
    { title: 'Sagittarius', zodiacSign: 'Sagittarius', image: Sagittarius },
    { title: 'Capricorn', zodiacSign: 'Capricorn', image: Capricorn },
    { title: 'Aquarius', zodiacSign: 'Aquarius', image: Aquarius },
    { title: 'Pisces', zodiacSign: 'Pisces', image: Pisces },
];

//! Landing Page
export const ServicesData = [
    { path: 'talk-to-astrologer', title: 'Talk To Astrologer', icon: <CallSvg h='40' w='40' />, description: "Connect instantly with expert astrologers for personalized guidance on life's important decisions." },
    { path: 'chat-with-astrologer', title: 'Chat With Astrologer', icon: <ChatSvg h='40' w='40' />, description: 'Get instant answers to your queries through text chat with trusted astrologers anytime, anywhere.' },
    { path: 'astro-mall', title: 'Astro Mall', icon: <BagSvg h='40' w='40' />, description: "Explore a range of authentic astrological products tailored to enhance positivity and well-being." },
    { path: 'blog', title: 'Blog', icon: <FileText className='w-8 h-8' />, description: 'Experience face-to-face consultations with astrologers for in-depth and interactive sessions.' },
];

export const ComplimentaryAstrologyServicesData = [
    { title: `Today's Horoscope`, path: '/horoscope', image: TodayHoroscope },
    { title: 'Free Kundli', path: '/kundli', image: FreeKundli },
    { title: 'Kundli Matching', path: '/kundli-matching', image: MatchMaking },
    { title: 'Remedies', path: '/book-puja', image: Remedies },
];

export const CelebritiesData = [
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

export const TestimonialsData = [
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

export const MediaSpotLightData = [
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
];