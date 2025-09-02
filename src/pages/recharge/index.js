import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndianRupee } from "../../utils/common-function";
import { api_urls } from "../../utils/api-urls";

const Recharge = () => {
    const navigate = useNavigate();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const [planData, setPlanData] = useState([]);

    useEffect(() => {
        const getReachargePlan = async () => {
            try {
                const { data } = await axios.get(api_urls + 'api/customers/get_customer_all_recharge_plan')
                if (data?.success) {
                    console.log(data?.allRechargePlan)
                    setPlanData(data?.allRechargePlan);
                }
            } catch (error) {

            }
        }

        getReachargePlan();
    }, []);

    return (
        <>
            <section className="space-y-3 min-h-screen">
                <div className="bg-white p-3 rounded-b-[3px]">
                    <div className='text-2xl text-center font-[600]'>Add Money to Wallet</div>
                    <div className='text-l text-center font-[400] mt-2 text-grey'>Available balance:</div>
                    <div className="flex justify-center items-center text-xl text-center font-[400] mt-2 text-black">{IndianRupee(userCustomerDataById?.wallet_balance || 0)}</div>
                </div>

                <main className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-white p-3 rounded-t-[3px]">
                    {planData && planData.sort((a, b) => a.amount - b.amount)?.map((value, index) => (
                        <div key={index} onClick={() => navigate(`/recharge/payment-details`, { state: { stateData: value } })} className="bg-white border border-gray shadow-md shadow-gray-300 items-center hover:border-yellow-300 hover:shadow-yellow-50 rounded-[3px] cursor-pointer">
                            <div className="text-center mx-8 h-5  max-md:mx-3 max-xl:mx-3">
                                {value?.mostPopular && <div className="bg-[#F2994A] text-white rounded-b-md   ">
                                    {value?.mostPopular}
                                </div>}
                            </div>

                            <div className="text-center  text-xl px-10 py-5 ">{value?.amount}</div>

                            <div className="text-center">
                                <div className={` ${value?.percentage ? 'bg-[#E8F4ED]' : 'bg-white'} text-[#219675] rounded-b-[3px] flex items-center justify-center px-10 py-1 min-h-10`} >
                                    {value?.percentage ? value?.percentage + '%' : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </section>
        </>
    );
}

export default Recharge;