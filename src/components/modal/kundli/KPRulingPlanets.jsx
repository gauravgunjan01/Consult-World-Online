import React from 'react';

const KPRulingPlanets = ({ data }) => {
    console.log("KPRulingPlanets Data ::: ", data);

    return (
        <>
            <div className="px-7 py-5 flex flex-col gap-4 bg-white rounded-lg">
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Ascendant Nakshatra Lord</div>
                    <div className="basis-[60%] text-gray-900">{data?.rulingPlanets?.ascendant_nakshatra_lord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Ascendant Sign Lord</div>
                    <div className="basis-[60%] text-gray-900">{data?.rulingPlanets?.ascendant_sign_lord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Moon Nakshatra Lord</div>
                    <div className="basis-[60%] text-gray-900">{data?.rulingPlanets?.moon_nakshatra_lord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Moon Sign Lord</div>
                    <div className="basis-[60%] text-gray-900">{data?.rulingPlanets?.moon_sign_lord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Day Lord</div>
                    <div className="basis-[60%] text-gray-900">{data?.rulingPlanets?.day_lord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Ascendant Sub Lord</div>
                    <div className="basis-[60%] text-gray-900">{data?.rulingPlanets?.ascendant_sub_lord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Moon Sub Lord</div>
                    <div className="basis-[60%] text-gray-900">{data?.rulingPlanets?.moon_sub_lord}</div>
                </div>
            </div>
        </>
    )
}

export default KPRulingPlanets;