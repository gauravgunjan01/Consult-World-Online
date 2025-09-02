import React from 'react';

const paths = [
    "M50 50L300 50L300 300L50 300L50 50", // Rectangle Path
    "M50 175L300 175" // Horizontal Line
];

const HoraChart = ({ data }) => {
    const upperPlanets = data?.chart[0]?.planets || [];
    const upperRashiIndex = data?.chart[0]?.rashiIndex || "";
    const lowerPlanets = data?.chart[1]?.planets || [];
    const lowerRashiIndex = data?.chart[1]?.rashiIndex || "";

    return (
        <>
            <div className='flex flex-col gap-5'>
                <div className='flex-1 justify-center'>
                    <svg width="350" height="350" viewBox="0 0 350 350" className="w-[60%] h-full m-auto">
                        {paths.map((d, index) => (
                            <path key={index} d={d} fill="none" stroke="red" strokeWidth="2" strokeLinejoin="round" />
                        ))}
                        {/* Upper Box Text with Colors */}
                        <g>
                            {upperPlanets.map((planet, i) => (
                                <text key={i} x={175 + (i * 15) - 20} y={90} textAnchor="middle" fontWeight="bold" fontSize="10" fill={planet.color || "black"}>
                                    {planet.name}
                                </text>
                            ))}
                            <text x="175" y="110" textAnchor="middle" fontWeight="bold" fontSize="10" fill="blue">{upperRashiIndex}</text>
                        </g>

                        {/* Lower Box Text with Colors */}
                        <g>
                            {lowerPlanets.map((planet, i) => (
                                <text key={i} x={175 + (i * 15) - 40} y={250} textAnchor="middle" fontWeight="bold" fontSize="12" fill={planet.color || "black"}>
                                    {planet.name}
                                </text>
                            ))}
                            <text x="175" y="270" textAnchor="middle" fontWeight="bold" fontSize="12" fill="blue">{lowerRashiIndex}</text>
                        </g>
                    </svg>
                </div>
            </div>
        </>
    );
};

export default HoraChart;