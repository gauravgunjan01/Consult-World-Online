import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IndianRupee } from "../../../utils/common-function";
import { toaster } from "../../../utils/services/toast-service";
import * as UserActions from '../../../redux/actions/userAction';

const PaymentDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location?.state?.stateData;

    const dispatch = useDispatch();
    const { userCustomerDetails } = useSelector(state => state?.userReducer)

    const handlePayment = async () => {
        const payload = {
            data: {
                customerId: userCustomerDetails?._id,
                amount: stateData?.amount + stateData?.amount * .18,
                rechargePlanId: stateData?._id,
                profitPercentage: stateData?.percentage,
                gst: 18
            },
            user: userCustomerDetails,
            onComplete: () => navigate('/wallet-history')
        }

        //! Dispatching API For Recharge 
        if (stateData?.amount) {
            dispatch(UserActions.rechargeUserCustomerWallet(payload));
        } else {
            toaster({ text: 'Amount is required.' })
        }
    };

    return (
        <>
            <section className="space-y-3">
                <div className='bg-white text-2xl font-semibold p-3 rounded-b-[3px]'>Payment Details</div>

                <div className="bg-white p-3 rounded-t-[3px] py-20">
                    <div className="max-w-3xl m-auto space-y-3 ">
                        <table className="bg-white border border-gray-300 w-full m-auto">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300">Recharge Amount</td>
                                    <td className="px-4 py-2 border border-gray-300 text-right">{IndianRupee(stateData?.amount)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300">GST@18%</td>
                                    <td className="px-4 py-2 border border-gray-300 text-right">{IndianRupee(stateData?.amount * .18)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300"><b> Total Amount </b></td>
                                    <td className="px-4 py-2 border border-gray-300 text-right"><b> {IndianRupee(stateData?.amount + stateData?.amount * .18)}</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div onClick={() => handlePayment()} className="bg-primary text-white text-center rounded-[3px] py-2 cursor-pointer">Proceed To Payment</div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PaymentDetail;