import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as UserActions from '../../../redux/actions/userAction';
import { RightArrowHeadSvg } from '../../../assets/svg';
import OrderHistoryProductDetailModal from '../../../components/modal/OrderHistoryProductDetailModal';
import PageHeading from '../../../components/common/PageHeading';
import DataNotFound from '../../../components/common/DataNotFound';

const MyOrderPuja = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);

    const dispatch = useDispatch();
    const { userCustomerDetails, userCustomerPujaBookHistoryData } = useSelector(state => state?.userReducer);

    const [state, setState] = useState({ productModelOpen: false, productModelData: null });
    const { productModelOpen, productModelData } = state;

    useEffect(() => {
        userCustomerDetails && dispatch(UserActions?.getUserCustomerOrderHistory());
        userCustomerDetails && dispatch(UserActions?.getUserCustomerPujaBookHistory());
    }, [userCustomerDetails]);

    return (
        <>
            <section className='space-y-3 min-h-screen'>
                {/* <div className='bg-white p-3'>
                    <main className='flex max-md:flex-wrap gap-5'>
                        <NavLink to="/my-order/astro-mall" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-primary border-primary border-2 text-white px-12 max-md:px-10 py-2 rounded-md" : "bg-white text-primary border-primary border-2 px-12 max-md:px-10 py-2 rounded-md"}>Astromall Order</NavLink>
                        <NavLink to="/my-order/puja" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-primary border-primary border-2 text-white px-12 max-md:px-10 py-2 rounded-md" : "bg-white text-primary border-primary border-2 px-12 max-md:px-10 py-2 rounded-md"}>Puja Order</NavLink>
                    </main>
                </div> */}

                <div className='bg-white p-3 rounded-[3px]'>
                    <main className='grid md:grid-cols-3 gap-3 text-[#919191] text-[15px]'>
                        {userCustomerPujaBookHistoryData && userCustomerPujaBookHistoryData?.map((value, index) => (
                            <div key={index} className='flex flex-col rounded-[3px] p-4 capitalize border-b-8 border-secondary' style={{ boxShadow: "0 0 10px #EFEFEF" }}>
                                <div>Invoice Id : {value?.InvoiceId}</div>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='text-black font-[500] text-base'>{value?.astrologerId?.astrologerName}</div>
                                        <div>Booking Date: {moment(value?.bookingdate).format('DD MMM YYYY') || 'N/A'}</div>
                                        <div className='text-green-500'>Total Amount : ₹{Number(value?.pujaData?.reduce((acc, item) => acc + (item?.price * item?.quantity), 0))?.toFixed(2)}</div>
                                    </div>

                                    <div onClick={() => setState({ productModelOpen: true, productModelData: value?.pujaData })} className='h-12 w-12 rounded-full border border-primary flex justify-center items-center cursor-pointer'><RightArrowHeadSvg /></div>
                                </div>
                            </div>
                        ))}
                    </main>

                    {(userCustomerPujaBookHistoryData && userCustomerPujaBookHistoryData?.length <= 0 || userCustomerPujaBookHistoryData == undefined) && <DataNotFound />}
                </div>
            </section>


            {/* OrderHistoryProductDetailModal */}
            <OrderHistoryProductDetailModal isOpen={productModelOpen} handleClose={() => setState({ ...state, productModelOpen: false })} data={productModelData} />
        </>
    )
}

export default MyOrderPuja;