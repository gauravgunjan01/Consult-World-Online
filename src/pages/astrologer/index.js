import axios from 'axios';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ConsultantCard from './components/ConsultantCard';

import { api_urls } from '../../utils/api-urls';
import { SearchSvg } from '../../assets/svg';
import { IndianRupee } from '../../utils/common-function';
import DataNotFound from '../../components/common/DataNotFound';
import CheckBoxActive from '../../components/button/CheckBoxActive';
import CheckBoxInactive from '../../components/button/CheckBoxInactive';
import AstrologerSkeletonCard from '../../components/cards/AstrologerSkeletonCard';
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
    const { astrologerSkillData, astrologerMainExpertiseData } = useSelector(state => state?.astrologerReducer);
    const [showFilter, setShowFilter] = useState(false);

    const [astrologerData, setAstrologerData] = useState([]);
    const [selectedOption, setSelectedOption] = useState({ skill: [], main_expertise: [], language: [], gender: [], country: [], offer: [], });
    const [sortBy, setSortBy] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchAstrologers = async (pageNum = 1, reset = false) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pageNum,
                astrologerName: searchText,
                limit: 10,
                mainExpertise: selectedOption.main_expertise.join(","),
                skill: selectedOption.skill.join(","),
                language: selectedOption.language.join(","),
                gender: selectedOption.gender.join(","),
            });
            const { data } = await axios.get(`${api_urls}api/astrologer/astrologer_filter`, { params });

            setAstrologerData((prevData) => {
                const newData = reset ? data.results : [...prevData, ...data.results];
                return Array.from(new Set(newData.map((item) => item._id))).map((id) =>
                    newData.find((item) => item._id === id)
                );
            });
            setTotalPage(data.totalPages);
        } catch (error) {
            console.error("Error fetching astrologer data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAstrologers(1, true); // Fetch initial data
    }, [selectedOption, sortBy, searchText]);

    useEffect(() => {
        if (page > 1) {
            fetchAstrologers(page);
        }
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (loading) return;

            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const clientHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

            if (isNearBottom && page < totalPage) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, page, totalPage]);

    useEffect(() => {
        dispatch(AstrologerActions.getAstrologerSkill());
        dispatch(AstrologerActions.getAstrologerMainExpertise());
    }, [dispatch]);

    const handleSelectOption = (category, data) => {
        setSelectedOption((prevOptions) => ({
            ...prevOptions,
            [category]: prevOptions[category].includes(data)
                ? prevOptions[category].filter((item) => item !== data)
                : [...prevOptions[category], data],
        }));
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setShowFilter(true);
            } else {
                setShowFilter(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <section className='flex max-lg:flex-col gap-3 justify-between min-h-screen'>
                {showFilter && <div className="max-lg:w-full max-lg:max-h-60 overflow-y-scroll custom-scrollbar max-lg:px-10 lg:min-w-60 lg:max-w-60 space-y-6 bg-white text-gray-500 p-3">
                    <div className='flex items-center gap-2'>
                        <h5 className="font-medium text-lg text-black">Select Filters</h5>
                        {/* <button><SyncSvg h={20} w={20} /></button> */}
                    </div>

                    <div className='space-y-2.5'>
                        <h6 className="text-[15px] font-medium text-black_secondary">Skill</h6>
                        <div className="flex flex-col gap-3 text-sm max-h-96 overflow-auto custom-scrollbar">
                            {astrologerSkillData?.map((value, index) => (
                                <div onClick={() => handleSelectOption('skill', value?._id)} key={index} className='flex gap-2 items-center cursor-pointer'>
                                    {selectedOption?.skill?.includes(value?._id) ? <CheckBoxActive /> : <CheckBoxInactive />}
                                    <div className='capitalize'>{value?.skill}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='space-y-2.5'>
                        <h6 className="text-[15px] font-medium text-black_secondary">Main Expertise</h6>
                        <div className="flex flex-col gap-3 text-sm max-h-96 overflow-auto custom-scrollbar">
                            {astrologerMainExpertiseData?.map((value, index) => (
                                <div onClick={() => handleSelectOption('main_expertise', value?._id)} key={index} className='flex gap-2 items-center cursor-pointer'>
                                    {selectedOption?.main_expertise?.includes(value?._id) ? <CheckBoxActive /> : <CheckBoxInactive />}
                                    <div className='capitalize'>{value?.mainExpertise}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='space-y-2.5'>
                        <h6 className="text-[15px] font-medium text-black_secondary">Language</h6>
                        <div className="flex flex-col gap-3 text-sm max-h-96 overflow-auto custom-scrollbar">
                            {languageData.map((value, index) => (
                                <div onClick={() => handleSelectOption('language', value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                                    {selectedOption?.language?.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                                    <div className='capitalize'>{value?.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='space-y-2.5'>
                        <h6 className="text-[15px] font-medium text-black_secondary">Gender</h6>
                        <div className="flex flex-col gap-3 text-sm max-h-96 overflow-auto custom-scrollbar">
                            {genderData.map((value, index) => (
                                <div onClick={() => handleSelectOption('gender', value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                                    {selectedOption?.gender?.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                                    <div className='capitalize'>{value?.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='space-y-2.5'>
                        <h6 className="text-[15px] font-medium text-black_secondary">Country</h6>
                        <div className="flex flex-col gap-3 text-sm max-h-96 overflow-auto custom-scrollbar">
                            {countryData.map((value, index) => (
                                <div onClick={() => handleSelectOption('country', value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                                    {selectedOption?.country?.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                                    <div className='capitalize'>{value?.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='space-y-2.5'>
                        <h6 className="text-[15px] font-medium text-black_secondary">Offer</h6>
                        <div className="flex flex-col gap-3 text-sm max-h-96 overflow-auto custom-scrollbar">
                            {offerData.map((value, index) => (
                                <div onClick={() => handleSelectOption('offer', value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                                    {selectedOption?.offer?.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                                    <div className='capitalize'>{value?.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

                <div className='flex-1 bg-white p-3 space-y-3'>
                    <div className='flex gap-4 max-md:flex-col justify-between'>
                        <div className='flex-1 rounded-md flex items-center'>
                            <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Search here..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%] md:w-[200px] lg:w-[300px]' />
                            <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                        </div>

                        <div className='flex flex-wrap gap-3'>
                            {userCustomerDetails && <p className='max-md:basis-full text-nowrap self-center px-1'>Available balance: {IndianRupee(userCustomerDetails?.wallet_balance)}</p>}
                            <button onClick={() => navigate('/recharge')} className='border border-green-500 text-green-500 px-5 rounded-[3px] flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</button>
                            <button onClick={() => setShowFilter(!showFilter)} className='border border-green-500 text-green-500 px-5 rounded-[3px] flex items-center justify-center max-md:py-1 cursor-pointer'>{showFilter ? 'Hide' : 'Show'} Filter</button>
                        </div>
                    </div>

                    <main className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {loading ?
                            Array(20).fill('').map((_, index) => <AstrologerSkeletonCard key={index} />)
                            :
                            astrologerData?.map((astrologer, index) => <ConsultantCard key={index} astrologer={astrologer} />)
                        }
                    </main>
                    {astrologerData?.length <= 0 && <DataNotFound />}
                </div>
            </section>
        </>
    )
}

export default Astrologer;