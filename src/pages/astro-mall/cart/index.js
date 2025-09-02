import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import * as AstromallActions from '../../../redux/actions/astromallAction';
import TopHeaderSection from '../../../components/common/TopHeaderSection';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { customerAstromallCartData } = useSelector(state => state?.astromallReducer);
    const { cart: customerAstromallCartDataArray, totalPrice } = customerAstromallCartData;

    useEffect(() => {
        //! Dispatching API For Getting Cart Data
        dispatch(AstromallActions.getCustomerAstromallCart());
    }, []);

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3'>
                    <main className='flex max-md:flex-wrap gap-5'>
                        <NavLink to="/astro-mall/cart" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-primary border-primary border-2 text-white px-12 max-md:px-10 py-2 rounded-md" : "bg-white text-primary border-primary border-2 px-12 max-md:px-10 py-2 rounded-md"}>Astromall Cart</NavLink>
                        <NavLink to="/cart" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-primary border-primary border-2 text-white px-12 max-md:px-10 py-2 rounded-md" : "bg-white text-primary border-primary border-2 px-12 max-md:px-10 py-2 rounded-md"}>Puja Cart</NavLink>
                    </main>
                </div>

                {customerAstromallCartDataArray?.length > 0 &&
                    <div className='flex gap-5 flex-wrap'>
                        {/* Left Side: Cart Items */}
                        <div className='bg-white p-3 flex-1 flex flex-col gap-6 min-w-[350px] max-md:min-w-[90vw] max-md:w-[90vw]'>
                            {customerAstromallCartDataArray?.map((value, index) => (
                                <div key={index} className="bg-white p-4 rounded-[3px] shadow-sm flex gap-5 items-center justify-between flex-wrap">
                                    <div className='flex items-center gap-5 basis-[50%] max-md:basis-[100%]'>
                                        <img src={api_urls + 'uploads/' + value?.productId?.image} alt={value?.productId?.productName} className="h-32 w-32 object-cover rounded-md mr-4" />
                                        <div className="flex flex-col gap-2">
                                            <div className="font-semibold text-lg">{value?.productId?.productName}</div>
                                            <div className={`text-base font-medium ${value?.status === 'IN_STOCK' ? 'text-green-700' : 'text-red-600'}`}>{value?.status === 'IN_STOCK' ? 'In Stock' : 'Out Of Stock'}</div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-5 basis-[45%] max-md:basis-[100%]'>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => dispatch(AstromallActions.updateAstromallCartItemQuantity({ cartItemId: value?._id, type: 'REMOVE' }))} className="bg-red-600 w-8 h-8 flex justify-center items-center rounded-md text-white">-</button>
                                            <div className="text-lg">{value?.quantity}</div>
                                            <button disabled={value?.quantity == 100} onClick={() => dispatch(AstromallActions.updateAstromallCartItemQuantity({ cartItemId: value?._id, type: 'ADD' }))} className={`${value?.quantity == 100 ? 'bg-gray-400' : 'bg-green-700'} w-8 h-8 flex justify-center items-center rounded-md text-white`}>+</button>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xl font-bold text-green-700">{IndianRupee(value?.productId?.price)}</span>
                                            <span className="line-through text-red-600">{IndianRupee(value?.productId?.mrp)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Side: Pricing Details */}
                        <div className='min-w-[300px] max-md:w-[90vw] bg-white p-3 rounded-[3px] flex flex-col'>
                            <div className='text-xl font-semibold mb-4'>Order Summary</div>
                            <div className='mb-4'>
                                <div className='flex justify-between'>
                                    <span className='text-lg'>Total Price:</span>
                                    <span className='text-lg font-bold'>{IndianRupee(totalPrice)}</span>
                                </div>
                            </div>
                            <button onClick={() => navigate('/astro-mall/cart/address', { state: { totalPrice } })} className='w-full bg-primary text-white py-2 rounded-md mb-4'>Book Now</button>
                        </div>
                    </div>}

                {(customerAstromallCartDataArray?.length <= 0 || customerAstromallCartDataArray == undefined) &&
                    <div className="bg-white rounded-b-[3px] flex flex-col items-center justify-center pb-20">
                        <img src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png' alt="Empty Cart" className="w-60 max-w-xs" />
                        <div className="text-center text-2xl font-semibold text-gray-600  my-6">Your cart is empty</div>
                        <button onClick={() => navigate('/astro-mall')} className="bg-primary text-white py-2 px-4 rounded cursor-pointer hover:bg-secondary transition-colors duration-300">Continue Shopping</button>
                    </div>
                }
            </section>
        </>
    );
}

export default Cart;
