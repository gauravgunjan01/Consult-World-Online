import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { api_urls } from '../../utils/api-urls/index.js';
import { website_name } from '../../utils/constants/index.js';
import { RightArrowHeadSvg, SearchSvg } from '../../assets/svg';
import { DeepSearchSpace } from '../../utils/common-function/index.js';
import PageHeading from '../../components/common/PageHeading.jsx';
import DataNotFound from '../../components/common/DataNotFound.jsx';
import * as EcommerceAction from "../../redux/actions/ecommerceActions.js"

const BookPuja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pujaData } = useSelector(state => state?.ecommerceReducer);
    const { isLoading } = useSelector(state => state?.commonReducer);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event?.target?.value);
    const filteredData = DeepSearchSpace(pujaData, searchText);

    useEffect(function () {
        //! Dispatching API for Get Puja
        dispatch(EcommerceAction.getPuja());
    }, []);

    return (
        <>
            {isLoading ?
                <section className='px-[100px] max-lg:px-[20px] pt-[50px] pb-[100px]'>
                    <article className='flex flex-col gap-[50px]'>
                        <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                            <main className='flex gap-4 flex-wrap items-center justify-between'>
                                <div className='h-11 w-56'><Skeleton height={'100%'} /></div>
                                <div className='h-11 w-96 max-md:w-full'><Skeleton height={'100%'} /></div>
                            </main>

                            <main className='flex flex-wrap justify-between max-md:flex-col gap-x-5 gap-y-24 rounded-xl'>
                                {Array(6)?.fill('')?.map((value, index) => (<div key={index} className='flex-grow rounded-xl h-[220px] max-md:h-[250px] max-md:w-full w-[370px]'>
                                    <div className='flex items-center gap-4 mb-5'>
                                        <div className='h-10 w-10'><Skeleton height={'100%'} style={{ borderRadius: '100%' }} /></div>
                                        <div className='flex-1 h-1 mb-4'><Skeleton height={2} width={'100%'} /></div>
                                    </div>

                                    <Skeleton height={'94%'} width={'100%'} />
                                </div>))}
                            </main>
                        </SkeletonTheme>
                    </article>
                </section>
                :
                <section className='space-y-3'>
                    <div className='bg-white p-3 rounded-b-[3px]'>
                        <main className='flex justify-between items-center max-md:flex-wrap gap-5'>
                            <PageHeading title={'Book a Puja'} />

                            <div className='flex gap-4 flex-wrap'>
                                <div className='rounded-md flex items-center max-sm:w-[90vw]'>
                                    <input onChange={handleSearch} type='search' placeholder='Let’s find what you’re looking for..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%] md:w-[200px] lg:w-[400px]' />
                                    <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                                </div>
                            </div>
                        </main>
                    </div>

                    <div className='bg-white p-3 rounded-[3px]'>
                        <main className='grid md:grid-cols-3 gap-3'>
                            {filteredData && filteredData?.map((value, index) => (
                                <div key={index} onClick={() => navigate(`/book-puja/puja-details?name=${value?.pujaName?.toLowerCase()?.split(' ')?.join('-')}`, { state: { pujaData: value } })} className='rounded-[3px] capitalize bg-transparent cursor-pointer'>
                                    <div className='mb-3 flex items-center'>
                                        <div className='text-xs text-center'>
                                            <div className='h-8 w-8 rounded-full border flex items-center justify-center'>{moment(value?.createdAt)?.format('DD')}</div>
                                            <div>{moment(value?.createdAt)?.format('MMM')}</div>
                                        </div>
                                        <div className='w-full h-0.5 bg-primary'></div>
                                    </div>

                                    <div className='bg-white rounded-[3px]' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                        <div className='h-44 w-full bg-cover bg-no-repeat rounded-t-lg flex items-end' style={{ backgroundImage: `url('${api_urls + value?.image}')` }}>
                                            <div className='text-white text-sm px-5 py-3 bg-black bg-opacity-40 w-full'>
                                                <div>{value?.pujaName}</div>
                                                <div className='capitalize text-xs line-clamp-1'>{value?.description}</div>
                                            </div>
                                        </div>

                                        <div className='text-gray-600 text-[14px] flex justify-between px-5 py-2 font-[500]'>
                                            <div className=''>{moment(value?.createdAt)?.format('DD MMM YYYY')}</div>
                                            <div className='flex items-center'>Book Now <RightArrowHeadSvg w={20} h={20} /></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </main>

                        {filteredData?.length <= 0 && (<DataNotFound />)}
                    </div>

                    <div className='bg-white p-3 rounded-[3px]'>
                        <main className="flex flex-col gap-5 text-justify">
                            <p className="text-lg text-gray-700">
                                <strong>Experience Divine Blessings with {website_name}'s Online Puja Services</strong>
                            </p>

                            <p className="text-base text-gray-600">
                                Puja is an ancient Hindu ritual and a sacred act of connecting with the divine. It serves as a medium to seek blessings, express gratitude, and offer prayers, fostering a spiritual connection with divine energies. At {website_name}, we are committed to bringing you closer to spirituality and divine harmony through our exclusive online puja services, performed by experienced pandits and astrologers.
                            </p>

                            <p className="text-base text-gray-600">
                                Whether you are seeking remedies for challenges, enhanced relationships, financial prosperity, good fortune, or a blissful marriage, our thoughtfully curated puja services address various aspects of life to support your overall well-being.
                            </p>

                            <p className="text-lg text-gray-700">
                                <strong>Seamless Spiritual Connection from the Comfort of Your Home</strong>
                            </p>

                            <p className="text-base text-gray-600">
                                With {website_name}, embracing spirituality has never been easier. Our user-friendly platform makes booking an online puja session simple and hassle-free. Guided by our team of learned pandits and astrologers, each ritual is performed with the utmost sincerity and precision, adhering to traditional practices. We ensure that every puja becomes a meaningful and transformative experience for you.
                            </p>

                            <p className="text-lg text-gray-700">
                                <strong>How to Book an Online Puja Session with {website_name}</strong>
                            </p>

                            <p className="text-base text-gray-600">
                                Booking an online puja with {website_name} is just a few clicks away. Visit our website, explore our comprehensive range of puja services, select the one that aligns with your requirements, and immerse yourself in the divine vibrations of a sacred ritual.
                            </p>

                            <p className="text-base text-gray-600">
                                Let {website_name} help you embark on a journey of spiritual fulfillment and divine blessings, bringing peace, prosperity, and harmony into your life.
                            </p>
                        </main>
                    </div>
                </section>
            }
        </>
    )
}

export default BookPuja;