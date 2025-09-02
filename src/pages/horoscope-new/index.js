import { useNavigate } from 'react-router-dom';
import { ZodiacImageWithName } from '../../utils/static-data';
import PageHeading from '../../components/common/PageHeading';

const Horoscope = () => {
    const navigate = useNavigate();

    return (
        <section className='space-y-3'>
            <div className='bg-white p-3 rounded-b-[3px]'>
                <main className='flex justify-between items-center max-md:flex-wrap gap-5'>
                    <PageHeading title={'Horoscope'} />
                </main>
            </div>

            <section>
                <div className='p-5 bg-white space-y-5'>
                    <div className='text-center'>Confused about how your day would turn out to be? Find out if today is the day to make big decisions. Read your Daily Horoscope forecast and get insights regarding different aspects of your life to plan your day better.</div>

                    <main className='grid grid-cols-5 gap-4'>
                        {ZodiacImageWithName?.map((value, index) => (
                            <div
                                onClick={() => navigate(value?.zodiacSign, { state: { zodiacImage: value?.image } })}
                                key={index}
                                className='flex flex-col gap-3 items-center justify-center border px-5 py-4 rounded-sm shadow-md cursor-pointer'>
                                <img src={value?.image} className='w-28 h-28' alt={value?.title} />
                                <div className='font-semibold text-primary'>{value?.title}</div>
                            </div>
                        ))}
                    </main>
                </div>

                <div className='flex justify-between items-center bg-primary text-white'>
                    <main className='flex-1 flex items-center justify-center flex-col gap-5 max-lg:gap-2 text-center px-10 max-lg:px-4 py-4'>
                        <div className='text-3xl max-lg:text-xl'>WILL YOU BE RICH AND SUCCESSFUL IN FUTURE?</div>
                        <div>Know what’s written in your stars!</div>
                        <div
                            onClick={() => navigate('/astrologer')}
                            className='cursor-pointer bg-red-900 flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-red-900 transition-all duration-300 ease-in'>
                            Ask An Astrologer Now
                        </div>
                    </main>
                    <img src='https://astroway.diploy.in/public/frontend/astrowaycdn/astroway/web/content/images/ads/success-future.png' className='pr-10 py-4 h-72 max-lg:h-60 max-md:h-52' alt='Success Future' />
                </div>
            </section>
        </section>
    );
};

export default Horoscope;
