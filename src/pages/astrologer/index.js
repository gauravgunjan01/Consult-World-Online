import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SearchSvg } from '../../assets/svg';
import { IndianRupee } from '../../utils/common-function';

import Logo from '../../assets/images/logo/logo.png';
import ConsultantCard from './components/ConsultantCard';
import * as AstrologerActions from '../../redux/actions/astrologerAction';

Modal.setAppElement('#root');

export const sortByData = [{ id: 1, name: 'Popularity' }, { id: 2, name: 'Experience', type: 'High to Low' }, { id: 3, name: 'Experience', type: 'Low to High' }, { id: 4, name: 'Total orders', type: 'High to Low' }, { id: 5, name: 'Total orders', type: 'Low to High' }, { id: 6, name: 'Price', type: 'High to Low' }, { id: 7, name: 'Price', type: 'Low to High' }, { id: 8, name: 'Rating', type: 'High to Low' },];
export const skillData = [{ name: 'Face Reading' }, { name: 'Life Coach' }, { name: 'Nadi' }, { name: 'Palmistry' }, { name: 'Vedic' }, { name: 'Vastu' }];
export const languageData = [{ name: 'Hindi' }, { name: 'English' }, { name: 'Sanskrit' }];
export const genderData = [{ name: 'Male' }, { name: 'Female' }, { name: 'Other' }];
export const countryData = [{ name: 'India' }, { name: 'Outside India' }];
export const offerData = [{ name: 'Active' }, { name: 'Inactive' }];

const Astrologer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDetails } = useSelector(state => state?.userReducer);
    const { astrologersData, astrologerSkillData, astrologerexpertiseData } = useSelector(state => state?.astrologerReducer);

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(AstrologerActions.getAstrologers());
        dispatch(AstrologerActions.getAstrologerSkills());
        dispatch(AstrologerActions.getAstrologerExpertises());
    }, [dispatch]);

    return (
        <>
            <section className='p-5 bg-white flex max-lg:flex-col gap-3 justify-between min-h-screen'>
                <div className='flex-1 space-y-3'>
                    <div className='flex gap-4 max-md:flex-col justify-between'>
                        <div className='flex-1 rounded-md flex items-center'>
                            <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Search here..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%] md:w-[200px] lg:w-[300px]' />
                            <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                        </div>

                        <div className='flex flex-wrap gap-3'>
                            {userCustomerDetails && <p className='max-md:basis-full text-nowrap self-center px-1'>Available balance: {IndianRupee(userCustomerDetails?.wallet_balance)}</p>}
                            <button onClick={() => navigate('/recharge')} className='border border-green-500 text-green-500 px-5 rounded-[3px] flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</button>
                        </div>
                    </div>

                    <main className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {astrologersData?.map((astrologer, index) => <ConsultantCard key={index} astrologer={astrologer} />)}
                    </main>
                </div>
            </section>
        </>
    )
}

export default Astrologer;