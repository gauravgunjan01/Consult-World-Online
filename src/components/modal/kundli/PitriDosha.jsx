import React from 'react';
import moment from 'moment';
import { dateTime } from '../../../utils/common-function';

const PitriDosha = ({ data }) => {
    console.log("PitriDosha Data ::: ", data);

    return (
        <>
            <div className="px-7 py-5 flex flex-col gap-4 bg-white rounded-lg text-wrap">
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Info</div>
                    <div className="basis-[60%] text-justify text-gray-900">{data?.info}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Pitri Rin</div>
                    <div className="basis-[60%] text-justify text-gray-900">{data?.rina[0]?.info}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Stree Rin</div>
                    <div className="basis-[60%] text-justify text-gray-900">{data?.rina[2]?.info}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Daivi Rin</div>
                    <div className="basis-[60%] text-justify text-gray-900">{data?.rina[8]?.info}</div>
                </div>
            </div>
        </>
    )
}

export default PitriDosha;
