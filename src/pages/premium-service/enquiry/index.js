import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams, } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { toaster } from '../../../utils/services/toast-service';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { generateTokenByRequestPermission } from '../../../config/firebase-config';
import * as UserActions from '../../../redux/actions/userAction';
import * as AuthActions from '../../../redux/actions/authAction';

const Enquiry = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    const amount = location.state?.amount;
    const discount_amount = location.state?.discount_amount;

    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ full_name: userCustomerDataById?.customerName || '', gender: userCustomerDataById?.gender, date_of_birth: moment(userCustomerDataById?.dateOfBirth)?.format('YYYY-MM-DD') || '', time_of_birth: moment(userCustomerDataById?.timeOfBirth)?.format('HH:mm') || '', place_of_birth: '', latitude: '', longitude: '', email: userCustomerDataById?.email, mobile: userCustomerDataById?.phoneNumber });
    const { full_name, gender, date_of_birth, time_of_birth, place_of_birth, latitude, longitude, email, mobile } = inputFieldDetail;
    const handleInputFieldDetail = (event) => setInputFieldDetail({ ...inputFieldDetail, [event?.target?.name]: event?.target?.value });

    const autocompleteRef = useRef(null);
    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        try {
            if (place) {
                const location = place.geometry.location;
                setInputFieldDetail({ ...inputFieldDetail, place_of_birth: place.formatted_address, latitude: location.lat(), longitude: location.lng(), });
            }
        } catch (error) {
            toaster?.info({ text: 'Select Place' })
        }
    };

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        let isValid = true;

        if (!full_name) {
            toaster.error({ text: 'Please Enter Full Name' }, { position: 'top-center' });
            return isValid = false;
        }

        if (!gender) {
            toaster.error({ text: 'Please Select Gender' }, { position: 'top-center' });
            return isValid = false;
        }

        if (!date_of_birth) {
            toaster.error({ text: 'Please Enter Date Of Birth' }, { position: 'top-center' });
            return isValid = false;
        }

        if (!time_of_birth) {
            toaster.error({ text: 'Please Enter Time Of Birth' }, { position: 'top-center' });
            return isValid = false;
        }

        if (!place_of_birth) {
            toaster.error({ text: 'Please Enter Place Of Birth' }, { position: 'top-center' });
            return isValid = false;
        }

        if (!email) {
            toaster.error({ text: 'Please Enter Email' }, { position: 'top-center' });
            return isValid = false;
        }

        if (!mobile) {
            toaster.error({ text: 'Please Enter Mobile' }, { position: 'top-center' });
            return isValid = false;
        }

        return isValid;
    };

    //! Handle Submit : Generate Kundli
    const handleSubmit = async () => {
        console.log({ ...inputFieldDetail, customerId: userCustomerDataById?._id, });

        if (handleValidation()) {
            const payload = {
                data: {
                    customerId: userCustomerDataById?._id, full_name, gender, date_of_birth, time_of_birth, place_of_birth, latitude, longitude, email, mobile, amount: discount_amount,type
                },
                onComplete: () => navigate('/premium-service')
            }

            //! Dispatching API
            dispatch(UserActions?.enquiryPremiumService(payload));

        } else {
            console.log('Validation Error !!!');
        }
    };

    // Todo : Customer Login Start
    const handleOpenLoginCustomerModal = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            dispatch(AuthActions.toggleCustomerLoginModal(true));
        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
        }
    };

    useEffect(() => {
        if (!discount_amount) {
            navigate(-1)
        }
    }, []);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-[#F1EFEF]'>
                <form className='flex flex-wrap justify-between gap-x-[1%] gap-y-5 max-w-3xl m-auto bg-white rounded-xl shadow-xl p-10'>

                    <div className="basis-full border-2 border-yellow-400 rounded-md p-6 text-center max-w-md mx-auto mb-5">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{type == 'consult' ? 'Get Help for Your Problems from Our Expert Astrologer' : 'Your Personalised Vedic Kundli'}</h3>
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                            Only For {" "}
                            {amount && <span className="line-through text-gray-400">₹{amount} {" "}</span>}
                            <span className="text-orange-500">₹{discount_amount}</span>
                        </p>
                    </div>

                    <div className='basis-[49%] max-md:basis-full flex flex-col gap-1'>
                        <label className='text-black text-[15px] font-[500]'>Enter Your Full Name</label>
                        <input name='full_name' value={full_name} onChange={handleInputFieldDetail} type='text' placeholder='Enter Your Full Name' className='w-[100%] outline-none border px-5 py-[10px] rounded-sm' />
                    </div>

                    <div className='basis-[49%] max-md:basis-full flex flex-col gap-1'>
                        <label className='text-black text-[15px] font-[500]'>Select Gender</label>
                        <select name="gender" value={gender} onChange={handleInputFieldDetail} id="gender" className='w-[100%] outline-none border px-5 py-[12px] rounded-sm'>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='basis-[49%] max-md:basis-full flex flex-col gap-1'>
                        <label className='text-black text-[15px] font-[500]'>Date of Birth</label>
                        <input name='date_of_birth' value={date_of_birth} onChange={handleInputFieldDetail} type='date' className='w-[100%] outline-none border px-5 py-[10px] rounded-sm' />
                    </div>
                    <div className='basis-[49%] max-md:basis-full flex flex-col gap-1'>
                        <label className='text-black text-[15px] font-[500]'>Time of Birth</label>
                        <input name='time_of_birth' value={time_of_birth} onChange={handleInputFieldDetail} type='time' className='w-[100%] outline-none border px-5 py-[10px] rounded-sm' />
                    </div>

                    <div className='basis-[100%] max-md:basis-full flex flex-col gap-1'>
                        <label className='text-black text-[15px] font-[500]'>Select Place of Birth</label>
                        <Autocomplete
                            onLoad={(ref) => (autocompleteRef.current = ref)}
                            onPlaceChanged={handlePlaceSelect}
                        >
                            <input
                                type='text'
                                name='place_of_birth'
                                value={place_of_birth}
                                onChange={handleInputFieldDetail}
                                className='w-[100%] outline-none border px-5 py-[10px] rounded-sm'
                                placeholder='Select Place of Birth'
                            />
                        </Autocomplete>
                    </div>

                    <hr className='border border-dashed w-full' />

                    <div className='basis-[100%] max-md:basis-full flex flex-col gap-1'>
                        <label className='text-black text-[15px] font-[500]'>Enter Your Email</label>
                        <input name='email' value={email} onChange={handleInputFieldDetail} type='text' placeholder='Enter Your Email' className='w-[100%] outline-none border px-5 py-[10px] rounded-sm' />
                    </div>

                    <div className='basis-[100%] max-md:basis-full flex flex-col gap-1'>
                        <label className='text-black text-[15px] font-[500]'>Enter Your Mobile number</label>
                        <input name='mobile' value={mobile} onChange={handleInputFieldDetail} type='text' placeholder='Enter Your Mobile number' className='w-[100%] outline-none border px-5 py-[10px] rounded-sm' />
                    </div>

                    <div onClick={() => {
                        if (userCustomerDataById) {
                            handleSubmit()
                        } else {
                            handleOpenLoginCustomerModal();
                        }
                    }} className="cursor-pointer basis-full text-center bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition">Proceed</div>
                </form>
            </section>
        </>
    )
}

export default Enquiry;