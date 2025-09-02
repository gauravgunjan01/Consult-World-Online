import React, { useEffect, useState } from 'react';
import * as KundliActions from '../../../redux/actions/kundliAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { dateTime } from '../../../utils/common-function';

const NumerologyDetails = ({ data }) => {
    console.log("NumerologyDetails::: ", data);
    const dispatch = useDispatch();
    const { kundliBirthDetailData } = useSelector(state => state?.kundliReducer);
    console.log('kundliBirthDetailData:::', kundliBirthDetailData);

    // Fetch Current Dasha 
    useEffect(() => {
        dispatch(KundliActions.kundliGetBirthDetail());
    }, []);

    return (
        <>
            <div className="px-7 py-5 flex flex-col gap-4 bg-white rounded-lg">
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Radical Number</div>
                    <div className="basis-[60%] text-gray-900">{data?.radicalNumber}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Desitiny Numver</div>
                    <div className="basis-[60%] text-gray-900">{data?.destinyNumber}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Name Number</div>
                    <div className="basis-[60%] text-gray-900">{data?.nameNumber}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Owner</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.owner}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Name</div>
                    <div className="basis-[60%] text-gray-900">{kundliBirthDetailData?.name}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Birth Date</div>
                    <div className="basis-[60%] text-gray-900">{moment(dateTime(kundliBirthDetailData?.year, kundliBirthDetailData?.month, kundliBirthDetailData?.day, kundliBirthDetailData?.hour, kundliBirthDetailData?.min))?.format('DD-MM-YYYY')}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Friendly Numbers</div>
                    <div className="basis-[60%] text-gray-900">
                        {data?.details?.friendlyNumbers?.map((num, index) => (
                            <span key={index}>{num}{index !== data.details.friendlyNumbers.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Evil Numbers</div>
                    <div className="basis-[60%] text-gray-900">
                        {data?.details?.enemyNumbers?.map((num, index) => (
                            <span key={index}>{num}{index !== data.details.enemyNumbers.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Natural Numbers</div>
                    <div className="basis-[60%] text-gray-900">
                        {data?.details?.neutralNumbers?.map((num, index) => (
                            <span key={index}>{num}{index !== data.details.neutralNumbers.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Favourable God</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.god}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Favourable Metal</div>
                    <div className="basis-[60%] text-gray-900">
                        {data?.details?.favourableMetal?.map((num, index) => (
                            <span key={index}>{num}{index !== data.details.favourableMetal.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Favourable Color</div>
                    <div className="basis-[60%] text-gray-900">
                        {data?.details?.favourablecolor?.map((num, index) => (
                            <span key={index}>{num}{index !== data.details.favourablecolor.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Favourable Things</div>
                    <div className="basis-[60%] text-gray-900">
                        {data?.details?.favourableThings?.map((num, index) => (
                            <span key={index}>{num}{index !== data.details.favourableThings.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Favourable Direction</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.favourabledirection}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Grains</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.grains}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Substance</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.substance}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Stone</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.stone}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Sub Stone</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.subStone}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Herb</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.herb}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Favourable Days</div>
                    <div className="basis-[60%] text-gray-900">
                        {data?.details?.favourableDays?.map((num, index) => (
                            <span key={index}>{num}{index !== data.details.favourableDays.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Favourable Mantra</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.favourableMantra}</div>
                </div>
                <div className="flex items-start">
                    <div className="basis-[40%] font-medium text-gray-700">Jap Number</div>
                    <div className="basis-[60%] text-gray-900">{data?.details?.japnumber}</div>
                </div>
            </div>
        </>
    )
}

export default NumerologyDetails;