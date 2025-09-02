import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo/logo.png";
import AstroMallCard from "../../components/cards/AstroMallCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as AstromallActions from "../../redux/actions/astromallAction";
import { api_urls } from "../../utils/api-urls/index.js";
import { DeepSearchSpace } from "../../utils/common-function/index.js";
import TopHeaderSection from "../../components/common/TopHeaderSection.jsx";
import { SearchSvg } from "../../assets/svg/index.js";
import DataNotFound from "../../components/common/DataNotFound.jsx";

const AstroMall = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astromallCategoryData } = useSelector(state => state?.astromallReducer);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event.target.value);
    const filteredData = DeepSearchSpace(astromallCategoryData, searchText);

    useEffect(function () {
        //! Dispatching API for Get Categories
        dispatch(AstromallActions.getAstromallCategory());
    }, []);

    return (
        <>
            <section className="space-y-3">
                <div className='bg-white p-3 text-center'>
                    <h1 className='text-[30px] max-md:text-[25px] font-[500] tracking-wider'>Astro Shop</h1>
                    <p className='text-[#ADADAD] text-[24px] max-md:text-[20px] font-[500] tracking-wide'>Shop Best Online Astrology Products And Services</p>
                </div>

                <div className='bg-white space-y-3 p-3 rounded-[3px]'>
                    <div className='flex gap-4 flex-wrap'>
                        <div className='rounded-md flex items-center max-sm:w-[90vw]'>
                            <input onChange={handleSearch} type='search' placeholder='Let’s find what you’re looking for..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%] md:w-[200px] lg:w-[400px]' />
                            <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                        {filteredData?.map((item, index) => (
                            <AstroMallCard key={index}
                                onClick={() => navigate(`/astro-mall/products?id=${item?._id}&name=${item?.categoryName}`)}
                                startPrice={null}
                                bgImage={api_urls + 'uploads/' + item?.image}
                                categoryName={item?.categoryName}
                                description={item?.description}
                            />
                        ))}
                    </div>

                    {(!astromallCategoryData || filteredData?.length <= 0) && <DataNotFound />}
                </div>
            </section>
        </>
    );
}

export default AstroMall;