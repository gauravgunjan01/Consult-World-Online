import moment from 'moment';
import { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { toaster } from '../../utils/services/toast-service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as KundliActions from '../../redux/actions/kundliAction';
import { CalendarDays, MapPin, User } from 'lucide-react';

const Numerology = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { kundliNumerologyDetailsData } = useSelector(state => state?.kundliReducer);
    const { radicalNumber, destinyNumber, nameNumber, details } = kundliNumerologyDetailsData || {};

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const full_name = query.get('full-name') || '';
    const gender = searchParams.get('gender') || '';
    const date_of_birth = searchParams.get('date-of-birth') || '';
    const time_of_birth = searchParams.get('time-of-birth') || '';
    const place_of_birth = searchParams.get('place-of-birth') || '';
    const latitude = searchParams.get('latitude') || '';
    const longitude = searchParams.get('longitude') || '';

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
            toaster.error({ text: 'Please Enter Full Name' });
            return isValid = false
        }
        if (!gender) {
            toaster.error({ text: 'Please Select Gender' });
            return isValid = false
        }
        if (!date_of_birth) {
            toaster.error({ text: 'Please Enter Date Of Birth' });
            return isValid = false
        }
        if (!time_of_birth) {
            toaster.error({ text: 'Please Enter Time Of Birth' });
            return isValid = false
        }
        if (!place_of_birth) {
            toaster.error({ text: 'Please Enter Place Of Birth' });
            return isValid = false
        }

        return isValid;
    }

    //! Handle Submit
    const handleSubmit = async (e) => {
        const payload = {
            name: full_name,
            gender,
            day: moment(date_of_birth).format('DD'),
            month: moment(date_of_birth).format('MM'),
            year: moment(date_of_birth).format('YYYY'),
            hour: moment.utc(`${date_of_birth}T${time_of_birth}`).format('HH:mm a')?.split(':')[0],
            min: moment.utc(`${date_of_birth}T${time_of_birth}`).format('HH:mm a')?.split(':')[1]?.split(' ')[0],
            place: place_of_birth,
            latitude,
            longitude,
            timezone: '5.5',
        };

        if (handleValidation())
            dispatch(KundliActions?.kundliGetNumerologyDetails(payload));
    };

    return (
        <>
            <section className="space-y-3">
                {/* Heading */}
                <div className="bg-white p-3 rounded-[3px] flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary rounded"></div>
                    <h2 className="text-lg font-semibold text-primary">Numerology</h2>
                </div>

                <div className="bg-white rounded-b-[3px] p-5 flex flex-col gap-5 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="self-stretch w-1 bg-primary rounded"></div>
                        <h5 className="font-semibold text-lg flex items-center gap-2">
                            <CalendarDays size={18} /> Numerology Input Details
                        </h5>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-3">
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

                        <InputCard label="Date of Birth" name="date_of_birth" value={date_of_birth} onChange={handleInputFieldDetail} icon={CalendarDays} type="date" />
                        <InputCard label="Time of Birth" name="time_of_birth" value={time_of_birth} onChange={handleInputFieldDetail} icon={CalendarDays} type="time" />
                    </div>

                    <div>
                        <button onClick={(e) => handleSubmit(e)} className="bg-primary hover:bg-secondary text-sm text-white px-5 py-2 rounded-[3px] hover:bg-primary-dark transition-all duration-500">Submit</button>
                    </div>
                </div>

                {radicalNumber && details && <>
                    {/* Top Numbers */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Card title="Radical Number" value={radicalNumber} />
                        <Card title="Destiny Number" value={destinyNumber} />
                        <Card title="Name Number" value={nameNumber} />
                    </div>

                    {/* Owner Info */}
                    <div className="bg-white p-3 rounded-[3px]">
                        <h3 className="text-md font-semibold mb-3">General Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <Field label="Owner" value={details?.owner} />
                            <Field label="God" value={details?.god} />
                            <Field label="Favourable Direction" value={details?.favourabledirection} />
                            <Field label="Favourable Days" value={details?.favourableDays.join(', ')} />
                            <Field label="Favourable Mantra" value={details?.favourableMantra} />
                            <Field label="Jap Count" value={details?.japnumber} />
                        </div>
                    </div>

                    {/* Favourables */}
                    <div className="bg-white p-3 rounded-[3px]">
                        <h3 className="text-md font-semibold mb-3">Favourable Elements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <Field label="Metals" value={details?.favourableMetal.join(', ')} />
                            <Field label="Colors" value={details?.favourablecolor.join(', ')} />
                            <Field label="Things" value={details?.favourableThings.join(', ')} />
                            <Field label="Stone" value={details?.stone} />
                            <Field label="Sub Stone" value={details?.subStone} />
                            <Field label="Herb" value={details?.herb} />
                            <Field label="Grains" value={details?.grains} />
                            <Field label="Substance" value={details?.substance} />
                        </div>
                    </div>

                    {/* Compatibility Numbers */}
                    <div className="bg-white p-3 rounded-[3px]">
                        <h3 className="text-md font-semibold mb-3">Number Compatibility</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                            <Field label="Friendly Numbers" value={details?.friendlyNumbers.join(', ')} />
                            <Field label="Neutral Numbers" value={details?.neutralNumbers.join(', ')} />
                            <Field label="Enemy Numbers" value={details?.enemyNumbers.join(', ')} />
                        </div>
                    </div>
                </>}
            </section>
        </>
    )
}

export default Numerology;

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

const Card = ({ title, value }) => (
    <div className="bg-white rounded-[3px] shadow p-3 text-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-bold text-primary">{value}</h2>
    </div>
);

const Field = ({ label, value }) => (
    <div>
        <p className="text-gray-500 text-xs mb-1">{label}</p>
        <p className="text-primary font-medium">{value}</p>
    </div>
);