import { useEffect, useState } from 'react';
import { Minus, Share2 } from 'lucide-react';
import { FacebookSvg, InstagramSvg, LinkedinSvg, YoutubeSvg } from '../../assets/svg';

const SocialMedia = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleVisibility = () => {
            const scrollY = window.scrollY;
            const width = window.innerWidth;

            if (scrollY > 500 || width < 600) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleVisibility);
        window.addEventListener('resize', handleVisibility);

        handleVisibility();

        return () => {
            window.removeEventListener('scroll', handleVisibility);
            window.removeEventListener('resize', handleVisibility);
        };
    }, []);

    return (
        <div className="fixed right-0 top-[40%] z-[100] flex flex-col items-end gap-2 text-white">
            <button onClick={() => setIsVisible(!isVisible)} className="bg-primary w-10 h-8 flex items-center justify-center rounded-l-md hover:bg-secondary transition">
                {isVisible ? <Minus size={20} /> : <Share2 size={20} />}
            </button>

            {/* Social Icons */}
            {isVisible && (
                <div className="flex flex-col gap-2 items-end pr-1">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FacebookSvg w={35} h={35} />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <InstagramSvg w={35} h={35} />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <LinkedinSvg w={35} h={35} />
                    </a>
                    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                        <YoutubeSvg w={35} h={35} />
                    </a>
                </div>
            )}
        </div>
    );
};

export default SocialMedia;