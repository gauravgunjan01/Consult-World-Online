import React from 'react';

const KPPlanetaryPosition = ({ data }) => {
    console.log("KPPlanetaryPosition Data ::: ", data);

    return (
        <table className="min-w-full border-collapse border border-gray-200 text-left">
            <thead className="bg-gray-100">
                <tr className='text-orange-600'>
                    <th className="border border-gray-200 px-4 py-2">Planet</th>
                    <th className="border border-gray-200 px-4 py-2">Degree</th>
                    <th className="border border-gray-200 px-4 py-2">Rashi</th>
                    <th className="border border-gray-200 px-4 py-2">Sign Lord</th>
                    <th className="border border-gray-200 px-4 py-2">Nakshatra Lord</th>
                    <th className="border border-gray-200 px-4 py-2">Sub Lord</th>
                    <th className="border border-gray-200 px-4 py-2">Sub-Sub Lord</th>
                </tr>
            </thead>
            <tbody>
                {data?.planetList?.map((value, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{value?.name}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.degree}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.rashi}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.signLord}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.nakshatraLord}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.subLord}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.subSubLord}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default KPPlanetaryPosition;