import React from 'react';

const KPHouseSignificator = ({ data }) => {
    console.log("KPHouseSignificator Data ::: ", data);

    return (
        <table className="min-w-full border-collapse border border-gray-200 text-left">
            <thead className="bg-gray-100">
                <tr className='text-orange-600'>
                    <th className="border border-gray-200 px-4 py-2">House</th>
                    <th className="border border-gray-200 px-4 py-2">I</th>
                    <th className="border border-gray-200 px-4 py-2">II</th>
                    <th className="border border-gray-200 px-4 py-2">III</th>
                    <th className="border border-gray-200 px-4 py-2">IIII</th>
                </tr>
            </thead>
            <tbody>
                {data?.houseSignificators?.map((value, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 text-orange-600">{value?.house}</td>
                        {value?.significators?.map((curr, idx) => (
                            <td key={idx} className="border border-gray-200 px-4 py-2">{curr?.join(', ')}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default KPHouseSignificator;