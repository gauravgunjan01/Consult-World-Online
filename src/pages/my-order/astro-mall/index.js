import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RightArrowHeadSvg } from '../../../assets/svg';
import DataNotFound from '../../../components/common/DataNotFound';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import OrderHistoryAstromallDetailModal from '../../../components/modal/OrderHistoryAstromallDetailModal';
import * as UserActions from '../../../redux/actions/userAction';

const MyOrderAstromall = () => {
    const dispatch = useDispatch();
    const { userCustomerDetails, userCustomerAstromallHistoryData } = useSelector(state => state?.userReducer);

    const [state, setState] = useState({ productModelOpen: false, productModelData: null, address: null });
    const { productModelOpen, productModelData, address } = state;

    useEffect(() => {
        userCustomerDetails && dispatch(UserActions?.getUserCustomerAstromallHistory());
    }, [userCustomerDetails]);

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3'>
                    <main className='flex max-md:flex-wrap gap-5'>
                        <NavLink to="/my-order/astro-mall" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-primary border-primary border-2 text-white px-12 max-md:px-10 py-2 rounded-md" : "bg-white text-primary border-primary border-2 px-12 max-md:px-10 py-2 rounded-md"}>Astromall Order</NavLink>
                        <NavLink to="/my-order/puja" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-primary border-primary border-2 text-white px-12 max-md:px-10 py-2 rounded-md" : "bg-white text-primary border-primary border-2 px-12 max-md:px-10 py-2 rounded-md"}>Puja Order</NavLink>
                    </main>
                </div>

                <div className='bg-white p-3 rounded-[3px]'>
                    <main className='grid md:grid-cols-3 gap-3 text-[#919191] text-[15px]'>
                        {userCustomerAstromallHistoryData && userCustomerAstromallHistoryData?.map((value, index) => (
                            <div key={index} className='rounded-[3px] p-4 capitalize border-b-8 border-secondary' style={{ boxShadow: "0 0 10px #EFEFEF" }}>
                                <div>Invoice Id : {value?.invoiceId}</div>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='text-black font-[500] text-base'>{value?.astrologerId?.astrologerName}</div>
                                        <div>Booking Date: {moment(value?.bookingdate).format('DD MMM YYYY') || 'N/A'}</div>
                                        <div className='text-green-500'>Total Amount : ₹{Number(value?.amount)?.toFixed(2)}</div>
                                    </div>

                                    <div onClick={() => setState({ productModelOpen: true, productModelData: value?.products, address: value?.addressId })} className='h-12 w-12 rounded-full border border-primary flex justify-center items-center cursor-pointer'><RightArrowHeadSvg /></div>
                                </div>
                                <div className='capitalize'>Status : {value?.status?.toLowerCase()}</div>
                            </div>
                        ))}
                    </main>

                    {(userCustomerAstromallHistoryData && userCustomerAstromallHistoryData?.length <= 0 || userCustomerAstromallHistoryData == undefined) && <DataNotFound />}
                </div>
            </section>

            {/* OrderHistoryAstromallDetailModal */}
            <OrderHistoryAstromallDetailModal isOpen={productModelOpen} handleClose={() => setState({ ...state, productModelOpen: false })} data={productModelData} address={address} />
        </>
    )
}

export default MyOrderAstromall;