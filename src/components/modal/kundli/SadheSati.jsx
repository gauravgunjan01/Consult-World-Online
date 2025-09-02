import React from 'react'

const SadheSati = ({ data }) => {
    console.log("SadheSati:::", data);

    return (
        <>
            <div className='text-wrap text-justify'>{data?.info}</div> <br />
            <table className="min-w-full border-collapse border border-gray-200 text-left text-nowrap">
                <thead className="bg-gray-100">
                    <tr className='text-orange-600'>
                        <th className="border border-gray-200 px-4 py-2">Type</th>
                        <th className="border border-gray-200 px-4 py-2">Saturnrashi</th>
                        <th className="border border-gray-200 px-4 py-2">Start Date</th>
                        <th className="border border-gray-200 px-4 py-2">End Date</th>
                        <th className="border border-gray-200 px-4 py-2">Phase</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.sadesati?.map((value, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">{value?.type}</td>
                            <td className="border border-gray-200 px-4 py-2">{value?.saturnrashi}</td>
                            <td className="border border-gray-200 px-4 py-2">{value?.startDate}</td>
                            <td className="border border-gray-200 px-4 py-2">{value?.endDate}</td>
                            <td className="border border-gray-200 px-4 py-2">{value?.phase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SadheSati