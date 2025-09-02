import { BookText, HeartHandshake, Package, Award, Gift, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeadSign = () => {

    const serviceItems = [
        // { id: 1, name: "Today's Panchang", icon: BookText, isNew: false, path: '/' },
        { id: 2, name: "Free Daily Horoscope", icon: Award, isNew: false, path: '/horoscope' },
        { id: 3, name: "Free Kundli", icon: Gift, isNew: false, path: '/kundli' },
        { id: 4, name: "Kundli Matching", icon: HeartHandshake, isNew: false, path: '/kundli-matching' },
        { id: 5, name: "Premium Service", icon: Package, isNew: true, path: '/premium-service' },
        { id: 6, name: "Astrology Blog", icon: FileText, isNew: false, path: '/blog' },
    ];

    return (
        <>
            <div className="bg-pink-50 flex items-center justify-center p-4 px-10 max-md:px-5">
                <div className="flex gap-20 max-md:gap-10 overflow-x-scroll custom-scrollbar-zero">
                    {serviceItems.map((item) => (
                        <Link to={item?.path} key={item.id} className="flex flex-col items-center text-center group cursor-pointer">
                            <div className="relative w-20 h-20 sm:w-35 sm:h-35 rounded-full bg-white border-2 border-pink-200 flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-xl">
                                <item.icon className="w-12 h-12 sm:w-14 sm:h-14 text-[rgb(240_203_136)] transition-colors duration-300 group-hover:text-pink-600" />
                                {/* {item.isNew && (<span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">        New    </span>)} */}
                            </div>

                            <p className="mt-2 text-xs font-medium text-gray-900 group-hover:text-pink-700 transition-colors duration-300 text-center text-nowrap">{item.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HeadSign;