import React from 'react';

const FriendshipTable = ({ data }) => {
    console.log("FriendshipTable Data ::: ", data);
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

    return (
        <section className='flex flex-col gap-10 text-left'>
            <div>
                <p className='bg-primary text-orange-600 py-2 px-5 rounded-t font-semibold'>Five Fold Friendship</p>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2"></th>
                            {planets?.map((planet, index) => (<th key={index} className="border border-gray-200 px-4 py-2 text-orange-600">{planet}</th>))}
                        </tr>
                    </thead>

                    <tbody>
                        {data?.fivefoldTable?.map((planetData, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2 text-orange-600">{planetData?.planet}</td>

                                {planetData?.relationList?.map((relation) => {
                                    return (
                                        <td key={relation?.planet} className="border border-gray-200 px-4 py-2">
                                            {relation ? relation.relation : ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div>
                <p className='bg-primary text-orange-600 py-2 px-5 rounded-t font-semibold'>Permanent Friendship</p>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2"></th>
                            {planets?.map((planet, index) => (<th key={index} className="border border-gray-200 px-4 py-2 text-orange-600">{planet}</th>))}
                        </tr>
                    </thead>

                    <tbody>
                        {data?.permanentFriedshipTable?.map((planetData, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2 text-orange-600">{planetData?.planet}</td>

                                {planets?.map((planetName) => {
                                    const relation = planetData?.relationList?.find((relation) => relation.planet === planetName);
                                    return (
                                        <td key={planetName} className="border border-gray-200 px-4 py-2">
                                            {relation ? relation.relation : ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <p className='bg-primary text-orange-600 py-2 px-5 rounded-t font-semibold'>Temporal Friendship</p>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2"></th>
                            {planets?.map((planet, index) => (<th key={index} className="border border-gray-200 px-4 py-2 text-orange-600">{planet}</th>))}
                        </tr>
                    </thead>

                    <tbody>
                        {data?.temporalFriedshipTable?.map((planetData, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2 text-orange-600">{planetData?.planet}</td>

                                {planetData?.relationList?.map((relation) => {
                                    return (
                                        <td key={relation?.planet} className="border border-gray-200 px-4 py-2">
                                            {relation ? relation.relation : ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default FriendshipTable;