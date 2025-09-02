import React from 'react';

const AstroDetail = ({ data }) => {
    console.log("AstroDetail Data ::: ", data);

    return (
        <>
            <div className="px-7 py-5 flex flex-col gap-4 bg-white rounded-lg">
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">ascendant</div>
                    <div className="basis-[60%] text-gray-900">{data?.ascendant}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">sign</div>
                    <div className="basis-[60%] text-gray-900">{data?.sign}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">signLord</div>
                    <div className="basis-[60%] text-gray-900">{data?.signLord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">naksahtra</div>
                    <div className="basis-[60%] text-gray-900">{data?.naksahtra}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">nakshatraLord</div>
                    <div className="basis-[60%] text-gray-900">{data?.nakshatraLord}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">charan</div>
                    <div className="basis-[60%] text-gray-900">{data?.charan}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">karan</div>
                    <div className="basis-[60%] text-gray-900">{data?.karan?.name}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">yog</div>
                    <div className="basis-[60%] text-gray-900">{data?.yog?.name}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">varna</div>
                    <div className="basis-[60%] text-gray-900">{data?.varna}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">vashya</div>
                    <div className="basis-[60%] text-gray-900">{data?.vashya}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">yoni</div>
                    <div className="basis-[60%] text-gray-900">{data?.yoni}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">gana</div>
                    <div className="basis-[60%] text-gray-900">{data?.gana}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">paya</div>
                    <div className="basis-[60%] text-gray-900">{data?.paya}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">nadi</div>
                    <div className="basis-[60%] text-gray-900">{data?.nadi}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">yunja</div>
                    <div className="basis-[60%] text-gray-900">{data?.yunja}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">tatva</div>
                    <div className="basis-[60%] text-gray-900">{data?.tatva}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">nameAlphabetEnglish</div>
                    <div className="basis-[60%] text-gray-900">{data?.nameAlphabetEnglish}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">nameAlphabetHindi</div>
                    <div className="basis-[60%] text-gray-900">{data?.nameAlphabetHindi}</div>
                </div>
            </div>
        </>
    )
}

export default AstroDetail;