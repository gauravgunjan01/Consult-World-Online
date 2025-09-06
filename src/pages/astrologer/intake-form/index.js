import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import { ParseDateTime } from '../../../utils/common-function';
import * as AstrologerActions from '../../../redux/actions/astrologerAction';
import * as ConsultationActions from '../../../redux/actions/consultationAction';

const IntakeForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerId } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const connection_type = searchParams.get('type') || 'Chat';

    const { userCustomerDetails } = useSelector(state => state?.userReducer);
    const { astrologerDetails } = useSelector(state => state?.astrologerReducer);

    const autocompleteRef = useRef(null);
    const [inputFieldDetail, setInputFieldDetail] = useState({ is_new_profile: true, first_name: userCustomerDetails?.name?.split(' ')[0] || '', last_name: userCustomerDetails?.name?.split(' ')[1] || '', gender: userCustomerDetails?.gender || '', date_of_birth: moment(userCustomerDetails?.dateOfBirth)?.format('YYYY-MM-DD') || '', time_of_birth: moment(userCustomerDetails?.timeOfBirth)?.format('HH:mm') || '', place_of_birth: userCustomerDetails?.address?.birthPlace || '', marital_status: 'Unmarried', type_of_concern: 'Career', latitude: userCustomerDetails?.address?.latitude || '', longitude: userCustomerDetails?.address?.longitude || '', description: 'Description' });

    const handleinputFieldDetail = (e) => setInputFieldDetail({ ...inputFieldDetail, [e.target?.name]: e.target?.value }) //* Handle Input : Chat Intake Form Data

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place) {
            const location = place.geometry.location;
            setInputFieldDetail({
                ...inputFieldDetail,
                place_of_birth: place.formatted_address,
                latitude: location.lat(),
                longitude: location.lng(),
            });
        }
    };

    //! Handle Submit : Chat Intake Form Data
    const handleSubmitChatIntakeForm = async () => {
        console.log({ ...inputFieldDetail });

        const { is_new_profile, first_name, last_name, gender, date_of_birth, time_of_birth, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = inputFieldDetail;

        const payload = {
            is_new_profile,
            profile_data: { firstName: first_name, lastName: last_name, gender: gender, dateOfBirth: date_of_birth, timeOfBirth: ParseDateTime(date_of_birth, time_of_birth), placeOfBirth: place_of_birth, maritalStatus: marital_status, topic_of_concern: type_of_concern, latitude, longitude, description },
            profileId: null,
            chat_price: Number(astrologerDetails?.chat_price) + Number(astrologerDetails?.commission_chat_price),
            astrologerId: astrologerId,
            customerId: userCustomerDetails?._id,
            astrologer_name: astrologerDetails?.name?.toLowerCase(),
            astrologer_profile_image: astrologerDetails?.image,
            customer_name: userCustomerDetails?.name,
            customer_profile_image: 'uploads/' + userCustomerDetails?.image,
            type: connection_type,
            onComplete: () => navigate(-1)
        }

        //! Dispatch Request : Send By Customer 
        dispatch(ConsultationActions.initiateRequest(payload));
    };

    useEffect(() => {
        //! Dispatching API For Getting Single Astrologer
        dispatch(AstrologerActions.getAstrologerDetails({ astrologerId }));
    }, [astrologerId]);

    return (
        <>
            <section className='bg-white p-3 space-y-5'>
                <div className='text-[20px] font-semibold uppercase'>{connection_type} Intake Form</div>

                <main className='grid md:grid-cols-3 gap-4'>
                    <div className='space-y-1'>
                        <p className='font-[500]'>First Name: <span className='text-red-600'>*</span></p>
                        <input name='first_name' value={inputFieldDetail?.first_name} onChange={(e) => handleinputFieldDetail(e)} placeholder='First Name' className='border text-black text-[15px] rounded-[3px] outline-none w-full px-5 py-1.5' />
                    </div>
                    <div className='space-y-1'>
                        <p className='font-[500]'>Last Name: <span className='text-red-600'>*</span></p>
                        <input name='last_name' value={inputFieldDetail?.last_name} onChange={(e) => handleinputFieldDetail(e)} placeholder='Last Name' className='border text-black text-[15px] rounded-[3px] outline-none w-full px-5 py-1.5' />
                    </div>

                    <div className='space-y-1'>
                        <p className='font-[500]'>Gender: <span className='text-red-600'>*</span></p>
                        <select name='gender' value={inputFieldDetail?.gender} onChange={(e) => handleinputFieldDetail(e)} placeholder='Gender' className='border text-black text-[15px] rounded-[3px] outline-none w-full px-5 py-1.5' >
                            <option value="" className='text-gray-400'>----------Select Gender----------</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className='space-y-1'>
                        <p className='font-[500]'>Date of Birth: <span className='text-red-600'>*</span></p>
                        <input name='date_of_birth' value={inputFieldDetail?.date_of_birth} onChange={(e) => handleinputFieldDetail(e)} placeholder='Date of Birth' type='date' className='border text-black text-[15px] rounded-[3px] outline-none w-full px-5 py-1.5' />
                    </div>

                    <div className='space-y-1'>
                        <p className='font-[500]'>Time of Birth: <span className='text-red-600'>*</span></p>
                        <input name='time_of_birth' value={inputFieldDetail?.time_of_birth} onChange={(e) => handleinputFieldDetail(e)} placeholder='Time of Birth' type='time' className='border text-black text-[15px] rounded-[3px] outline-none w-full px-5 py-1.5' />
                    </div>

                    <div className='space-y-1'>
                        <p className='font-[500]'>Place of Birth: <span className='text-red-600'>*</span></p>
                        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect}>
                            <input name='place_of_birth' value={inputFieldDetail?.place_of_birth} onChange={(e) => handleinputFieldDetail(e)} placeholder='Place of Birth' className='border text-black rounded-[3px] outline-none w-full px-5 py-1.5' />
                        </Autocomplete>
                    </div>

                    <div className='space-y-1'>
                        <p className='font-[500]'>Select Marital Status: <span className='text-red-600'>*</span></p>
                        <select name='marital_status' value={inputFieldDetail?.marital_status} onChange={(e) => handleinputFieldDetail(e)} placeholder='marital status' className='border text-black text-[15px] rounded-[3px] outline-none w-full px-5 py-2' >
                            <option value="" className='text-gray-400'>Select Marital Status</option>
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className='space-y-1'>
                        <p className='font-[500]'>Select Type of Concern: <span className='text-red-600'>*</span></p>
                        <select name='type_of_concern' value={inputFieldDetail?.type_of_concern} onChange={(e) => handleinputFieldDetail(e)} placeholder='type of concern' className='border text-black text-[15px] rounded-[3px] outline-none w-full px-5 py-2' >
                            <option value="" className='text-gray-400'>Select Type of Concern</option>
                            <option value="Career">Career</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                </main>

                <main className='flex items-center flex-wrap gap-5 w-full'>
                    <div className='flex items-center'>
                        <input onChange={(event) => {
                            if (event?.target?.checked) { setInputFieldDetail({ ...inputFieldDetail, date_of_birth: moment(new Date())?.format('YYYY-MM-DD') }) }
                            else { setInputFieldDetail({ ...inputFieldDetail, date_of_birth: moment(userCustomerDetails?.dateOfBirth)?.format('YYYY-MM-DD') || '' }) }
                        }} id='date_of_birth' type='checkbox' className='-mt-0.5 cursor-pointer' />
                        <label htmlFor='date_of_birth' className='pl-2 cursor-pointer'>Don't know my date of birth</label>
                    </div>

                    <div className='flex items-center'>
                        <input onChange={(event) => {
                            if (event?.target?.checked) { setInputFieldDetail({ ...inputFieldDetail, time_of_birth: moment(new Date()?.setHours(12, 0, 0, 0))?.format('HH:mm') }) }
                            else { setInputFieldDetail({ ...inputFieldDetail, time_of_birth: moment(userCustomerDetails?.timeOfBirth)?.format('HH:mm') || '' }) }
                        }} id='time_of_birth' type='checkbox' className='-mt-0.5 cursor-pointer' />
                        <label htmlFor='time_of_birth' className='pl-2 cursor-pointer'>Don't know my time of birth</label>
                    </div>
                </main>

                <div className='flex justify-center pb-5'>
                    <button onClick={() => handleSubmitChatIntakeForm()} className='self-center cursor-pointer bg-primary border border-primary text-center text-white rounded-mds px-14 py-2 transition-all duration-500'>Start {connection_type?.split('-')?.join(' ')} with <span className='capitalize'>{astrologerDetails?.name?.toLowerCase()}</span></button>
                </div>
            </section>
        </>
    )
}

export default IntakeForm;