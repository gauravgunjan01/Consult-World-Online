import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { api_urls } from '../../utils/api-urls/index.js';
import { RightArrowHeadSvg, SearchSvg } from '../../assets/svg/index.js';
import { DeepSearchSpace } from '../../utils/common-function/index.js';
import PageHeading from '../../components/common/PageHeading.jsx';
import DataNotFound from '../../components/common/DataNotFound.jsx';
import TopHeaderSection from '../../components/common/TopHeaderSection.jsx';
import * as UserActions from "../../redux/actions/userAction";
import * as EcommerceActions from "../../redux/actions/ecommerceActions";

const RegisterPuja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state?.commonReducer);
    const { userAstrologerDataById, userAstrologerRegisteredPujaHistoryData } = useSelector(state => state?.userReducer);
    const { pujaData } = useSelector(state => state?.ecommerceReducer);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event?.target?.value);
    const filteredData = DeepSearchSpace(pujaData, searchText);

    useEffect(function () {
        //! Dispatching API for Get Created Puja
        dispatch(EcommerceActions?.getPuja());
    }, []);


    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerRegisteredPujaHistory());
    }, [userAstrologerDataById]);

    return (
        <>
            <TopHeaderSection />

            {isLoading ?
                <section className='px-[100px] max-lg:px-[20px] pt-[50px] pb-[100px]'>
                    <article className='flex flex-col gap-[50px]'>
                        <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                            <main className='flex gap-4 flex-wrap items-center justify-between'>
                                <div className='h-11 w-56'><Skeleton height={'100%'} /></div>
                                <div className='h-11 w-96 max-md:w-full'><Skeleton height={'100%'} /></div>
                            </main>

                            <main className='flex flex-wrap justify-between max-md:flex-col gap-x-5 gap-y-24 rounded-xl'>
                                {Array(6)?.fill('')?.map((value, index) => (
                                    <div key={index} className='flex-grow rounded-xl h-[220px] max-md:h-[250px] max-md:w-full w-[370px]'>
                                        <div className='flex items-center gap-4 mb-5'>
                                            <div className='h-10 w-10'><Skeleton height={'100%'} style={{ borderRadius: '100%' }} /></div>
                                            <div className='flex-1 h-1 mb-4'><Skeleton height={2} width={'100%'} /></div>
                                        </div>

                                        <Skeleton height={'94%'} width={'100%'} />
                                    </div>
                                ))}
                            </main>
                        </SkeletonTheme>
                    </article>
                </section>
                :
                <section className='space-y-3'>
                    <div className='bg-white p-3 rounded-b-[3px]'>
                        <main className='flex justify-between items-center max-md:flex-wrap gap-5'>
                            <PageHeading title={'Register Puja'} />

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
                            {filteredData && filteredData?.map((value, index) => {
                                const matchedRegisteredPuja = userAstrologerRegisteredPujaHistoryData?.find(item => item?.pujaId?._id == value?._id)
                                return (
                                    <div key={index} onClick={() => navigate(`/register-puja/puja-details?name=${value?.pujaName?.toLowerCase()?.split(' ')?.join('-')}`, { state: { pujaData: value } })} className='rounded-[3px] capitalize bg-transparent cursor-pointer'>
                                        <div className='mb-3 flex items-center'>
                                            <div className='text-xs text-center'>
                                                <div className='h-8 w-8 rounded-full border flex items-center justify-center'>{moment(value?.createdAt)?.format('DD')}</div>
                                                <div>{moment(value?.createdAt)?.format('MMM')}</div>
                                            </div>
                                            <div className='w-full h-0.5 bg-primary'></div>
                                        </div>

                                        <div className='relative bg-white rounded-lg' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                            {matchedRegisteredPuja?.pujaId?._id == value?._id && <div className='absolute top-1 right-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded-md'>Registered</div>}

                                            <div className='h-44 w-full bg-cover bg-no-repeat rounded-t-lg flex items-end' style={{ backgroundImage: `url('${api_urls + value?.image}')` }}>
                                                <div className='text-white text-sm px-5 py-3 bg-black bg-opacity-40 w-full'>
                                                    <div>{value?.pujaName}</div>
                                                    <div className='capitalize text-xs line-clamp-1'>{value?.description}</div>
                                                </div>
                                            </div>

                                            <div className='text-gray-600 text-[14px] flex justify-between px-5 py-2 font-[500]'>
                                                <div className=''>{moment(value?.createdAt)?.format('DD MMM YYYY')}</div>
                                                <div className='flex items-center'>Register Now <RightArrowHeadSvg w={20} h={20} /></div>
                                            </div>
                                        </div>
                                    </div>)
                            })}
                        </main>

                        {filteredData?.length <= 0 && (<DataNotFound />)}
                    </div>
                </section>
            }
        </>
    )
}

export default RegisterPuja;