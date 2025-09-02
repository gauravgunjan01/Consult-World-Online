import React, { useState } from 'react';

const AstakVarga = ({ data }) => {
    console.log('AstakVarga', data);

    const [selectedTab, setSelectedTab] = useState('Table');
    const [selectedBody, setSelectedBody] = useState('ascendant');

    const celestialBodies = ['ascendant', 'jupiter', 'mars', 'sun', 'moon', 'mercury', 'venus', 'saturn'];

    const getChartKey = (body) => `${body}chart`;

    return (
        <div className='overflow-x-scroll'>
            <div className='flex gap-4 justify-around mb-5'>
                {celestialBodies.map((body) => (
                    <div key={body}
                        onClick={() => setSelectedBody(body)}
                        className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedBody === body ? 'bg-primary text-white' : 'border border-primary'}`}
                    >
                        {body.charAt(0).toUpperCase() + body.slice(1)}
                    </div>
                ))}
            </div>
            <div className='flex gap-4 justify-around mb-5'>
                <div onClick={() => setSelectedTab('Table')} className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 'Table' ? 'bg-primary text-white' : 'border border-primary'}`}>Table</div>
                <div onClick={() => setSelectedTab('Chart')} className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 'Chart' ? 'bg-primary text-white' : 'border border-primary'}`}>Chart</div>
            </div>
            <div className=''>
                {selectedTab === 'Table' && <TableTab data={data?.prastarakList} selectedBody={selectedBody} />}
                {selectedTab === 'Chart' && <div className='pt-10 pb-20'><ChartTab data={data?.charts} selectedBody={selectedBody} /></div>}
            </div>
        </div>
    );
}

const TableTab = ({ data, selectedBody }) => {
    const kundliAstakVargaData = data?.find(value => value?.name?.toLowerCase() == selectedBody)
    
    console.log('kundliAstakVargaData ::: ', kundliAstakVargaData);

    return (
        <>
            <div>{kundliAstakVargaData?.name}</div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-start">Planet</th>
                        {(Array(12)?.fill(''))?.map((value, index) => (
                            <th key={index} className="border border-gray-200 px-4 py-2 capitalize">{index + 1}</th>
                        ))}
                        <th className="border border-gray-200 px-4 py-2 text-start">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {kundliAstakVargaData?.prastaraks?.map((value, index) => {
                        return <tr>
                            <td className="border border-gray-200 px-4 py-2">{value?.name}</td>
                            {value?.prastarak?.map((curr, idx) => (
                                <td className="border border-gray-200 px-4 py-2">{curr}</td>
                            ))}
                            <td className="border border-gray-200 px-4 py-2">{value?.total}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    );
}

const ChartTab = ({data, selectedBody}) => {

    const kundliAstakVargaChartData = data?.find(value => value?.name?.toLowerCase() == selectedBody)
    
    console.log('kundliAstakVargaChartData ::: ', kundliAstakVargaChartData);
    

    const paths = [
        "M10 10L175 10L92.5 87.5L10 10",
        "M175 10L340 10L257.5 87.5L175 10",
        "M92.5 87.5L10 165L10 10",
        "M92.5 87.5L175 165L257.5 87.5L175 10",
        "M257.5 87.5L340 165L340 10",
        "M92.5,87.5L175,165L92.5,242.5L10,165",
        "M257.5,87.5L340,165L257.5,242.5L175,165",
        "M92.5,242.5L10,320L10,165",
        "M175,165L257.5,242.5L175,320L92.5,242.5",
        "M92.5,242.5L175,320L10,320",
        "M257.5,242.5L340,320L175,320",
        "M340,165L340,320L257.5,242.5",
    ];
    
    const textPositions = [
        { x: 175, y: 90 },
        { x: 92.5, y: 45 },
        { x: 45, y: 90 },
        { x: 90, y: 170 },
        { x: 45, y: 250 },
        { x: 92.5, y: 290 },
        { x: 175, y: 250 },
        { x: 257.5, y: 290 },
        { x: 305, y: 250 },
        { x: 260, y: 170 },
        { x: 305, y: 90 },
        { x: 257.5, y: 45 },
    ];
    
    return (
        <>
            <div className='flex flex-col gap-5'>

                <div className='flex-1 justify-center'>
                    <svg width="350" height="350" viewBox="0 0 350 350" className="w-[60%] h-full m-auto">
                        {paths.map((d, index) => (
                            <path key={index} d={d} fill="none" stroke="red" />
                        ))}
                        { kundliAstakVargaChartData?.chart.map((signData, index) => {
                            const { house, rashi, planets, rashiIndex } = signData;
                            const textPosition = textPositions[index];

                            return (
                                <g key={rashiIndex} className="sign">
                                    <text x={textPosition.x} y={textPosition.y} textAnchor="middle" fontWeight="bold" fontSize="10">
                                        {rashiIndex}
                                    </text>
                                    {planets?.map((planet, i) => (
                                        <text key={i}  x={textPosition.x + (i * 13) - 20} y={textPosition.y - 12} textAnchor="middle" fontSize="8" fill={planet?.color}>
                                            {planet}
                                        </text>
                                    ))}
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </>
    );
}

export default AstakVarga;