import React from 'react'

const Upgraha = ({ data }) => {
    console.log("Upgaraha Data ::: ", data);

    return (
        <table className="min-w-full border-collapse border border-gray-200 text-left">
            <thead className="bg-gray-100">
                <tr className='text-orange-600'>
                    <th className="border border-gray-200 px-4 py-2">Planet</th>
                    <th className="border border-gray-200 px-4 py-2">Degree</th>
                    <th className="border border-gray-200 px-4 py-2">Sign</th>
                    <th className="border border-gray-200 px-4 py-2">House</th>

                </tr>
            </thead>
            <tbody>
                {data?.upgrahaList?.map((value, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{value?.name}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.degree}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.rashi}</td>
                        <td className="border border-gray-200 px-4 py-2">{`House ${value?.house}`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Upgraha;