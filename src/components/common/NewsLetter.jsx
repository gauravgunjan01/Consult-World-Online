import React from 'react';
import { useNavigate } from 'react-router-dom';
import Pandit from '../../assets/images/common/pandit.png'

const NewsLetter = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className='px-[46px] max-md:px-5 pt-20 -mb-[51px]'>
                <article>
                    <main className='relative bg-primary rounded-[75.73px] max-md:rounded-3xl py-10 max-md:py-7 flex items-center justify-center max-lg:flex-col gap-20 max-lg:gap-7 max-md:gap-4'>
                        <img className='w-[250px] h-[250px] max-xl:w-[200px] max-xl:h-[200px] absolute bottom-0 left-10 max-lg:hidden' src={Pandit} />
                        <div className='w-20 max-lg:hidden'></div>
                        <div className='text-[28px] max-xl:text-[26px] max-lg:text-[24px] max-md:text-[20px] text-white text-center font-semibold text-nowrap'>
                            <p>Align Your Life with the Stars: </p>
                            <p>Modern Astrology for Timeless</p>
                            <p>Guidance</p>
                        </div>
                        <button onClick={() => navigate('/astrologer')} className='bg-white rounded-[55px] px-9 py-4 max-lg:py-3 text-[25px] max-xl:text-[22px] max-lg:text-[20px] max-md:text-[16px] font-semibold'>Talk To Astrologer</button>
                    </main>
                </article>
            </section>

            <div className='bg-black h-[51px]'></div>
        </>
    )
}

export default NewsLetter;