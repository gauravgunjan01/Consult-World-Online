import React from 'react'

const DashamBhavMadhya = ({ data }) => {

  console.log("DashamBhavMadhya :::", data);
  

  return (
    <table className="min-w-full border-collapse border border-gray-200 text-left">
      <thead className="bg-gray-100">
        <tr className='text-orange-600'>
          <th className="border border-gray-200 px-4 py-2">House</th>
          <th className="border border-gray-200 px-4 py-2">Bhav Madhya</th>
          <th className="border border-gray-200 px-4 py-2">Bhav Sandhi</th>
        </tr>
      </thead>

      <tbody>
        {data?.dashamBhavList?.map((value, index) => (
          <tr key={index} className="odd:bg-white even:bg-gray-50">
            <td className="border border-gray-200 px-4 py-2">{value?.house}</td>
            <td className="border border-gray-200 px-4 py-2">{value?.madhyaRashi} - {value?.madhyaDegree}</td>
            <td className="border border-gray-200 px-4 py-2">{value?.sandhiRashi} - {value?.sandhiDegree}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DashamBhavMadhya;