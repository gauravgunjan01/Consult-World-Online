import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';
import { toaster } from '../../utils/services/toast-service';
import * as AstrologyApiActions from '../../redux/actions/astrologyApiAction';
import Panchang from './panchang';

import LagnaTable from './lagna-table';
import HoraMuhurat from './hora-muhurat';
import ChaughadiyaDetails from './chaughadiya-details';

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

const PanchangAndMuhurat = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const active = searchParams.get('active');

    const autocompleteRef = useRef(null);

    const [inputFieldDetail, setInputFieldDetail] = useState({ day: moment().date().toString(), month: (moment().month() + 1).toString(), year: moment().year().toString(), timezone: '', latitude: '28.7040592', longitude: '77.10249019999999', place: 'Delhi, India', timezone: '5.5' });
    const [kundliPayload, setKundliPayload] = useState(inputFieldDetail);

    const handlePlaceSelect = () => {
        const place = autocompleteRef?.current?.getPlace();
        try {
            if (place) {
                const location = place.geometry.location;
                setInputFieldDetail({ ...inputFieldDetail, place: place?.formatted_address, latitude: String(location?.lat()), longitude: String(location?.lng()) });
            }
        } catch (error) {
            toaster?.info({ text: 'Select Place' })
        }
    };

    const handleChange = (e) => setInputFieldDetail(prev => ({ ...prev, [e.target?.name]: e.target?.value }));

    useEffect(() => {
        //! Dispatching API
        kundliPayload && kundliPayload?.day && dispatch(AstrologyApiActions.getPanchang(kundliPayload));
        kundliPayload && kundliPayload?.day && dispatch(AstrologyApiActions.getHoraMuhurat(kundliPayload));
        kundliPayload && kundliPayload?.day && dispatch(AstrologyApiActions.getChaughadiyaDetails(kundliPayload));
        kundliPayload && kundliPayload?.day && dispatch(AstrologyApiActions.getLagnaTable(kundliPayload));

    }, [kundliPayload]);

    return (
        <>
            <div className="bg-white rounded-b-[3px] p-5 flex flex-col gap-5 mb-3">
                <div className="flex items-center gap-2">
                    <div className="self-stretch w-1 bg-primary rounded"></div>
                    <h5 className="font-semibold text-lg flex items-center gap-2">
                        <CalendarDays size={18} /> Panchang Input Details
                    </h5>
                </div>

                <div className="grid lg:grid-cols-4 gap-3">
                    <InputCard label="Day" name="day" value={inputFieldDetail.day} onChange={handleChange} icon={CalendarDays} type="text" />
                    <InputCard label="Month" name="month" value={inputFieldDetail.month} onChange={handleChange} icon={CalendarDays} type="text" />
                    <InputCard label="Year" name="year" value={inputFieldDetail.year} onChange={handleChange} icon={CalendarDays} type="text" />

                    <div className="border p-3 rounded-sm flex gap-3 items-start">
                        <div className="bg-primary p-2 rounded-full text-white">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs text-gray-500 uppercase font-medium">Place</label>
                            <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect} >
                                <input
                                    type='text'
                                    name='place'
                                    value={inputFieldDetail.place}
                                    onChange={handleChange}
                                    className={`w-full text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-primary`}
                                    placeholder='Enter place of birth'
                                />
                            </Autocomplete>
                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={() => setKundliPayload({ ...inputFieldDetail })} className="bg-primary hover:bg-secondary text-sm text-white px-5 py-2 rounded-[3px] hover:bg-primary-dark transition-all duration-500">Submit</button>
                </div>
            </div>

            {active == 'panchang' && kundliPayload?.day && <Panchang />}
            {active == 'hora-muhurat' && kundliPayload?.day && <HoraMuhurat />}
            {active == 'chaughadiya-details' && kundliPayload?.day && <ChaughadiyaDetails />}
            {active == 'marriage-muhurat' && kundliPayload?.day && <LagnaTable />}
        </>
    )
};

export default PanchangAndMuhurat;