import React from 'react'

const PlanetaryPosition = ({ data }) => {

    return (
        <table className="min-w-full border-collapse border border-gray-200 text-left text-nowrap">
            <thead className="bg-gray-100">
                <tr className='text-orange-600'>
                    <th className="border border-gray-200 px-4 py-2">Planet</th>
                    <th className="border border-gray-200 px-4 py-2">Degree</th>
                    <th className="border border-gray-200 px-4 py-2">Sign</th>
                    <th className="border border-gray-200 px-4 py-2">Sign Lord</th>
                    <th className="border border-gray-200 px-4 py-2">Nakshatra</th>
                    <th className="border border-gray-200 px-4 py-2">Nakshatra Lord</th>
                    <th className="border border-gray-200 px-4 py-2">House</th>
                    <th className="border border-gray-200 px-4 py-2">Charan</th>
                    <th className="border border-gray-200 px-4 py-2">Retrograde</th>
                    <th className="border border-gray-200 px-4 py-2">Combust</th>
                    <th className="border border-gray-200 px-4 py-2">State</th>
                </tr>
            </thead>
            <tbody>
                {data?.planetList?.map((value, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{value?.name}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.degree}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.rashi}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.rashiLord}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.nakshatra}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.nakshatraLord}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.house}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.charan}</td>
                        <td className="border border-gray-200 px-4 py-2"> {value?.isRetrograde ? "Yes" : "No"}</td>
                        <td className="border border-gray-200 px-4 py-2"> {value?.isCombust ? "Yes" : "No"}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.PlanetState}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PlanetaryPosition