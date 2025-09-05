import { useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    return (
        <main className='flex items-center justify-center w-full h-screen bg-white text-gray-900 select-none'>
            <div className='flex flex-col items-center w-full gap-10 px-6 text-center'>
                <h1 className='text-9xl md:text-[130px] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-sorts-mill-goudy font-bold select-none'>404</h1>
                <p className='text-xl md:text-2xl font-semibold'>You have discovered a secret place</p>
                <p className='text-base md:text-lg text-gray-600'>Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.</p>
                <div className='flex flex-col md:flex-row gap-6 w-full justify-center'>
                    <button onClick={() => navigate(-1)} className='flex items-center justify-center gap-3 px-6 py-3 w-full md:w-auto border-2 border-secondary text-secondary font-semibold rounded-lg transition hover:bg-gradient-to-r from-primary to-secondary hover:text-white hover:border-none hover:scale-105 active:scale-95' >
                        <ArrowLeft size={20} />
                        Go back to Previous Page
                    </button>
                    <Link to='/' className='flex items-center justify-center gap-3 px-6 py-3 w-full md:w-auto border-2 border-green-500 text-green-600 font-semibold rounded-lg transition hover:bg-green-500 hover:text-white hover:border-none hover:scale-105 active:scale-95'>
                        <Home size={20} />
                        Go back to Home Page
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;