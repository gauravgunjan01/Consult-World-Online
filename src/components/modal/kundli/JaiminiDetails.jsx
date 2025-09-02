import React from 'react'

const JaiminiDetails = ({ data }) => {
    console.log("JaiminiDetails::::", data);

    return (
        <div className="p-4">
            {/* H3 Headings in Two Columns */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Ascendant: <span className="text-orange-600">{data?.karakDetails?.ascendant}</span>
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Karamsha Lagna: <span className="text-orange-600">{data?.karakDetails?.karamsha_lagna}</span>
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Pad Lagna: <span className="text-orange-600">{data?.karakDetails?.pad_lagna}</span>
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                    Up Pad Lagna: <span className="text-orange-600">{data?.karakDetails?.up_pad_lagna}</span>
                </h3>
            </div>

            {/* Table Section */}
            <table className="min-w-full border-collapse border border-gray-200 text-left text-nowrap shadow-md rounded-lg">
                <thead className="bg-gray-100">
                    <tr className='text-orange-600'>
                        <th className="border border-gray-200 px-4 py-2">Name</th>
                        <th className="border border-gray-200 px-4 py-2">Planet</th>
                        <th className="border border-gray-200 px-4 py-2">Rashi</th>
                        <th className="border border-gray-200 px-4 py-2">Degree</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.karakDetails?.karakaPlanetList?.map((value, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">{value?.name}</td>
                            <td className="border border-gray-200 px-4 py-2">{value?.planet?.name}</td>
                            <td className="border border-gray-200 px-4 py-2">{value?.planet?.rashi}</td>
                            <td className="border border-gray-200 px-4 py-2">{value?.planet?.degree}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JaiminiDetails
