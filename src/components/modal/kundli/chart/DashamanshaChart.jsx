import React from 'react';

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

const DashamanshaChart = ({ data }) => {
    console.log("DashamanshaChart Data ::: ", data?.chart);

    return (
        <>
            <div className='flex flex-col gap-5'>

                <div className='flex-1 justify-center'>
                    <svg width="350" height="350" viewBox="0 0 350 350" className="w-[60%] h-full m-auto">
                        {paths.map((d, index) => (
                            <path key={index} d={d} fill="none" stroke="red" />
                        ))}
                        {data && data?.chart?.map((signData, index) => {
                            const { house, rashi, planets, rashiIndex } = signData;
                            const textPosition = textPositions[index];
                            // const textPosition = textPositions[rashiIndex];

                            return (
                                <g key={rashiIndex} className="sign">
                                    <text x={textPosition.x} y={textPosition.y} textAnchor="middle" fontWeight="bold" fontSize="10">
                                        {rashiIndex} {rashi}
                                    </text>
                                    {planets?.map((planet, i) => (
                                        <text key={i} x={textPosition.x + (i * 13) - 20} y={textPosition.y - 12} textAnchor="middle" fontSize="8" fill={planet?.color}>
                                            {planet?.name}
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
};

export default DashamanshaChart;