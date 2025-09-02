import React from 'react';
import moment from 'moment';
import { dateTime } from '../../../utils/common-function';

const KPBirthDetail = ({ data }) => {
    console.log("KPBirthDetail Data ::: ", data);

    return (
        <>
            <div className="px-7 py-5 flex flex-col gap-4 bg-white rounded-lg">
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Name</div>
                    <div className="basis-[60%] text-gray-900">{data?.name}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Birth Date</div>
                    <div className="basis-[60%] text-gray-900">{moment(dateTime(data?.year, data?.month, data?.day, data?.hour, data?.min))?.format('MMM Do YYYY')}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Birth Time</div>
                    <div className="basis-[60%] text-gray-900">{moment(dateTime(data?.year, data?.month, data?.day, data?.hour, data?.min)).format('hh:mm A')}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Birth Place</div>
                    <div className="basis-[60%] text-gray-900">{data?.place}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Tithi</div>
                    <div className="basis-[60%] text-gray-900">{data?.tithi?.name}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Sunrise</div>
                    <div className="basis-[60%] text-gray-900">{data?.sunrise}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Sunset</div>
                    <div className="basis-[60%] text-gray-900">{data?.sunset}</div>
                </div>

                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Day</div>
                    <div className="basis-[60%] text-gray-900">{data?.dayname}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Shak Samvat</div>
                    <div className="basis-[60%] text-gray-900">{data?.shakSamvat}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Vikram Samvat</div>
                    <div className="basis-[60%] text-gray-900">{data?.vikramSamvat}</div>
                </div>

                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Latitude</div>
                    <div className="basis-[60%] text-gray-900">{data?.latitude}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Longitude</div>
                    <div className="basis-[60%] text-gray-900">{data?.longitude}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Time Zone</div>
                    <div className="basis-[60%] text-gray-900">+05.30</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Ayanamsha</div>
                    <div className="basis-[60%] text-gray-900">{data?.ayanamsha?.ayanamsha_name}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Ayanamsha Degree</div>
                    <div className="basis-[60%] text-gray-900">{data?.ayanamsha?.degree}</div>
                </div>
            </div>
        </>
    )
}

export default KPBirthDetail;