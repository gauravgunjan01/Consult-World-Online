import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RightArrowHeadSvg, SearchSvg } from '../../../assets/svg';
import { api_urls } from '../../../utils/api-urls';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../../utils/common-function';
import * as UserActions from '../../../redux/actions/userAction';
import RecordNotFound from '../../../components/features/RecordNotFound';
import { Section } from 'lucide-react';

const RegisterPujaHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAstrologerDataById, userAstrologerRegisteredPujaHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event?.target?.value);
    const filteredData = DeepSearchSpace(userAstrologerRegisteredPujaHistoryData, searchText);

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerRegisteredPujaHistory());
    }, [userAstrologerDataById]);

    return (
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
                        return (<div key={index} onClick={() => navigate(`/register-puja/puja-details?name=${value?.pujaId?.pujaName?.toLowerCase()?.split(' ')?.join('-')}`, { state: { pujaData: value?.pujaId, mode: 'View' } })} className='rounded-[3px] capitalize bg-transparent cursor-pointer'>
                            <div className='mb-3 flex items-center'>
                                <div className='text-xs text-center'>
                                    <div className='h-8 w-8 rounded-full border flex items-center justify-center'>{moment(value?.createdAt)?.format('DD')}</div>
                                    <div>{moment(value?.createdAt)?.format('MMM')}</div>
                                </div>
                                <div className='w-full h-0.5 bg-primary'></div>
                            </div>

                            <div className='relative bg-white rounded-lg' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                <div className='h-44 w-full bg-cover bg-no-repeat rounded-t-lg flex items-end' style={{ backgroundImage: `url('${api_urls + value?.pujaId?.image}')` }}>
                                    <div className='text-white text-sm px-5 py-3 bg-black bg-opacity-40 w-full'>
                                        <div>{value?.pujaId?.pujaName}</div>
                                        <div className='capitalize text-xs line-clamp-1'>{value?.description}</div>
                                    </div>
                                </div>

                                <div className='text-gray-600 text-[14px] flex justify-between px-5 py-2 font-[500]'>
                                    <div className=''>{moment(value?.createdAt)?.format('DD MMM YYYY')}</div>
                                    <div className='flex items-center'>View <RightArrowHeadSvg w={20} h={20} /></div>
                                </div>
                            </div>
                        </div>)
                    })}
                </main>

                {filteredData?.length <= 0 && (<RecordNotFound />)}
            </div>
        </section>
    )
}

export default RegisterPujaHistory;