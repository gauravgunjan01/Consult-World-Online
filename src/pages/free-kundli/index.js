import moment from 'moment';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarDays, MapPin, User } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DeleteSvg, SearchSvg } from '../../assets/svg';
import { DeepSearchSpace } from '../../utils/common-function';
import DataNotFound from '../../components/common/DataNotFound';
import * as KundliActions from '../../redux/actions/kundliAction';
import PageHeading from '../../components/common/PageHeading';

const FreeKundli = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const full_name = query.get('full-name') || '';
    const gender = searchParams.get('gender') || '';
    const date_of_birth = searchParams.get('date-of-birth') || '';
    const time_of_birth = searchParams.get('time-of-birth') || '';
    const place_of_birth = searchParams.get('place-of-birth') || '';
    const latitude = searchParams.get('latitude') || '';
    const longitude = searchParams.get('longitude') || '';
    console.log("params ::: ", { full_name, gender, date_of_birth, time_of_birth, place_of_birth, latitude, longitude });

    const { kundliData } = useSelector(state => state?.kundliReducer);
    const { userCustomerDetails } = useSelector(state => state?.userReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(kundliData, searchText);

    const autocompleteRef = useRef(null);

    //* Handle Input
    const handleInputFieldDetail = (event) => {
        const { name, value } = event?.target;

        switch (name) {
            case 'full_name':
                setSearchParams(`full-name=${value}&gender=${gender}&date-of-birth=${date_of_birth}&time-of-birth=${time_of_birth}&place-of-birth=${place_of_birth}&latitude=${latitude}&longitude=${longitude}`)
                break;
            case 'gender':
                setSearchParams(`full-name=${full_name}&gender=${value}&date-of-birth=${date_of_birth}&time-of-birth=${time_of_birth}&place-of-birth=${place_of_birth}&latitude=${latitude}&longitude=${longitude}`)
                break;
            case 'date_of_birth':
                setSearchParams(`full-name=${full_name}&gender=${gender}&date-of-birth=${value}&time-of-birth=${time_of_birth}&place-of-birth=${place_of_birth}&latitude=${latitude}&longitude=${longitude}`)
                break;
            case 'time_of_birth':
                setSearchParams(`full-name=${full_name}&gender=${gender}&date-of-birth=${date_of_birth}&time-of-birth=${value}&place-of-birth=${place_of_birth}&latitude=${latitude}&longitude=${longitude}`)
                break;
            case 'place_of_birth':
                setSearchParams(`full-name=${full_name}&gender=${gender}&date-of-birth=${date_of_birth}&time-of-birth=${time_of_birth}&place-of-birth=${value}&latitude=&longitude=`)
                break;
            default:
                break;
        }
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place) {
            const location = place.geometry.location;
            setSearchParams(`full-name=${full_name}&gender=${gender}&date-of-birth=${date_of_birth}&time-of-birth=${time_of_birth}&place-of-birth=${place.formatted_address}&latitude=${location.lat()}&longitude=${location.lng()}`)
        }
    };

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        let isValid = true;

        if (!full_name) {
            toast.error('Please Enter Full Name')
            return isValid = false
        }
        if (!gender) {
            toast.error('Please Select Gender')
            return isValid = false
        }
        if (!date_of_birth) {
            toast.error('Please Enter Date Of Birth')
            return isValid = false
        }
        if (!time_of_birth) {
            toast.error('Please Enter Time Of Birth')
            return isValid = false
        }
        if (!place_of_birth) {
            toast.error('Please Enter Place Of Birth')
            return isValid = false
        }

        return isValid;
    }

    //! Handle Submit : Generate Kundli
    const handleSubmit = async (e) => {
        console.log({
            date_of_birth, time_of_birth,
            tob: `${date_of_birth}T${time_of_birth}`
        });

        // 2025-03-07T08:00:00.000Z

        if (handleValidation()) {
            const payload = {
                data: {
                    customerId: userCustomerDetails?._id, name: full_name, gender, dob: date_of_birth, tob: `${date_of_birth}T${time_of_birth}`, place: place_of_birth,
                    // customerId: userCustomerDetails?._id, name: full_name, gender, dob: date_of_birth, tob: ParseDateTime(moment(date_of_birth).format('YYYY-MM-DD'), moment(time_of_birth, 'HH:mm').format('HH:mm')), place: place_of_birth,
                    lat: latitude, lon: longitude,
                },
                customerId: userCustomerDetails?._id,
                onComplete: () => setSearchParams(`full-name=&gender=&date-of-birth=&time-of-birth=&place-of-birth=&latitude=&longitude=`),
                navigate
            }

            //! Dispatching API For Creating Kundli
            dispatch(KundliActions?.createKundli(payload));

        } else {
            console.log('Validation Error !!!');
        }
    };

    useEffect(() => {
        //! Dispatching API For Getting Kundli Data;
        userCustomerDetails && dispatch(KundliActions?.getKundli({ customerId: userCustomerDetails?._id }));
    }, [userCustomerDetails]);

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3 rounded-b-[3px]'>
                    <main className='flex justify-between items-center max-md:flex-wrap gap-5'>
                        <PageHeading title={'Kundli'} />
                    </main>
                </div>

                <section className='grid lg:grid-cols-2 gap-3'>
                    <div className='bg-white p-3 space-y-5 rounded-[3px] md:min-h-[345px] md:max-h-[345px] custom-zero-scrollbar overflow-y-scroll'>
                        <div className="grid lg:grid-cols-2 gap-3">
                            <InputCard label="Full Name" name="full_name" value={full_name} onChange={handleInputFieldDetail} icon={CalendarDays} type="text" />

                            <div className="border p-3 rounded-sm flex gap-3 items-start">
                                <div className="bg-primary p-2 rounded-full text-white">
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-xs text-gray-500 uppercase font-medium">Gender</label>
                                    <select
                                        name="gender"
                                        value={gender}
                                        onChange={handleInputFieldDetail}
                                        className="w-full text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-primary"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <InputCard label="Date of Birth" name="date_of_birth" value={date_of_birth} onChange={handleInputFieldDetail} icon={CalendarDays} type="date" />

                            <InputCard label="Time of Birth" name="time_of_birth" value={time_of_birth} onChange={handleInputFieldDetail} icon={CalendarDays} type="time" />
                        </div>

                        <div className="border p-3 rounded-sm flex gap-3 items-start">
                            <div className="bg-primary p-2 rounded-full text-white">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <label className="text-xs text-gray-500 uppercase font-medium">Place</label>
                                <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect} >
                                    <input
                                        type='text'
                                        name='place_of_birth'
                                        value={place_of_birth}
                                        onChange={handleInputFieldDetail}
                                        className={`w-full text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-primary`}
                                        placeholder='Enter place of birth'
                                    />
                                </Autocomplete>
                            </div>
                        </div>

                        <div onClick={(e) => {
                            if (userCustomerDetails) handleSubmit(e);
                            else alert('Please login');
                        }} className='basis-full bg-primary text-center text-white font-[500] rounded-[3px] p-2 py-2.5 text-sm cursor-pointer'>Generate Kundli</div>
                    </div>

                    <div className='bg-white p-3 space-y-3 w-full text-sm min-h-[345px] max-h-[345px] overflow-y-scroll rounded-[3px] custom-scrollbar'>
                        <div className='flex'>
                            <div className='rounded-md flex items-center w-full max-sm:w-[90vw]'>
                                <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Let’s find what you’re looking for..' className='border border-[#DDDDDD] outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-s-[3px] h-full w-[100%]' />
                                <button className='bg-primary border border-primary rounded-e-[3px] flex items-center justify-center p-2 px-3 w-[50px] h-full text-white'><SearchSvg w='20' h='20' /></button>
                            </div>
                        </div>

                        {filteredData?.map((data, index) => (
                            <div key={index} className="p-4 flex justify-between rounded-[3px] border border-secondary cursor-pointer">
                                <div onClick={() => navigate(`/kundli/kundli-details?kundliId=${data?._id}&type=free-kundli`)} className='flex-1'>
                                    <div className="font-[500] text-lg mb-2 capitalize">{data?.name}</div>
                                    <p className="text-gray-700">
                                        {moment(data?.dob).format('DD-MMM-YYYY')} at {moment.utc(data?.tob).format('hh:mm a')}
                                    </p>
                                    <p className="text-gray-700">{data?.place}</p>
                                </div>

                                <div onClick={() => dispatch(KundliActions?.deleteKundli({ kundliId: data?._id, customerId: userCustomerDetails?._id }))} className='cursor-pointer text-white bg-red-500 self-start p-1.5 rounded-full'><DeleteSvg w='14' h='14' /></div>
                            </div>
                        ))}

                        {filteredData?.length <= 0 && <DataNotFound />}
                    </div>
                </section>
            </section>
        </>
    )
}

export default FreeKundli;

const InputCard = ({ label, name, value, onChange, icon: Icon, type = 'text', placeholder }) => (
    <div className="border p-3 rounded-sm flex gap-3 items-start">
        <div className="bg-primary p-2 rounded-full text-white">
            <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 uppercase font-medium">{label}</label>
            <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder || label} className="text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-primary" />
        </div>
    </div>
);