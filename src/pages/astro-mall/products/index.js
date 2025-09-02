import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logo/logo.png";
import AstroMallCard from "../../../components/cards/AstroMallCard";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api_urls } from "../../../utils/api-urls/index.js";
import { DeepSearchSpace, IndianRupee } from "../../../utils/common-function/index.js";
import TopHeaderSection from "../../../components/common/TopHeaderSection.jsx";
import * as AstromallActions from "../../../redux/actions/astromallAction";
import DataNotFound from "../../../components/common/DataNotFound.jsx";

const Products = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('id');
    const cateogry_name = searchParams.get('name');

    const dispatch = useDispatch();
    const { astromallProductData } = useSelector(state => state?.astromallReducer);
    console.log('astromallProductData', astromallProductData);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event.target.value);
    const filteredData = DeepSearchSpace(astromallProductData, searchText);

    useEffect(() => {
        // ! Dispatch API for Get Categories when component mounts
        dispatch(AstromallActions.getAstromallProduct({ categoryId }));

        return () => dispatch(AstromallActions.setAstromallProduct(null))
    }, [categoryId]);

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white space-y-3 p-3 rounded-[3px]'>
                    <div className="text-center text-xl sm:text-2xl font-semibold text-gray-600 mb-8">Shop Best Online Astrology Products And Services</div>
                </div>

                <div className="relative flex justify-center mb-8">
                    <hr className="w-full" />
                    <img src={logo} alt="logo img" className="absolute h-10 -translate-y-1/2 bg-white px-4" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }} />
                </div>


                <div className='bg-white space-y-3 p-3 rounded-[3px]'>
                    {/* Search Bar */}
                    <div className="flex items-center justify-center">
                        <input type="search" onChange={handleSearch} placeholder="Search" className="border border-gray-300 bg-white h-12 px-5 pr-12 rounded-full text-sm focus:outline-none w-full max-w-lg" />
                    </div>

                    {/* Products */}
                    <main className="grid md:grid-cols-3 gap-3">
                        {filteredData?.map((item, index) => (
                            <AstroMallCard key={index}
                                onClick={() => navigate(`/astro-mall/products/product-details?name=${item?.productName?.toLowerCase()?.split(' ').join('')}`, {
                                    state: { productDetails: item },
                                })}
                                startPrice={IndianRupee(item.price)}
                                categoryName={item.categoryName}
                                description={item.description}
                                bgImage={api_urls + 'uploads/' + item?.image}
                            />
                        ))}
                    </main>
                </div>

                {(!astromallProductData || filteredData?.length <= 0) && <DataNotFound />}
            </section>
        </>
    );
}

export default Products;
