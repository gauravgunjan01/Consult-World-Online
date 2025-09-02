import React from 'react';
import { useNavigate } from 'react-router-dom';

const AskYouQuestion = () => {
    const navigate = useNavigate();

    return (
        <div className=" m-auto w-full md:w-[350px] border border-yellow-400 rounded-md p-5 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Ask Your Questions Now</h3>
            <p className=" text-gray-700 mb-4">Getting answer to your question by expert astrologer has never been this easy and cost effective. </p>
            <ul className="space-y-2 text-gray-800 mb-4">
                <li className="flex items-center gap-2">
                    ✅ High Level Accuracy.
                </li>
                <li className="flex items-center gap-2">
                    ✅ Highly Experienced Astrologer.
                </li>
                <li className="flex items-center gap-2">
                    ✅ Effective remedial suggestions.
                </li>
            </ul>
            <p className="text-sm text-gray-900 font-semibold mb-4">
                <span className="underline">Consult for 30 min in just ₹599.</span>
            </p>
            <button onClick={() => navigate('/premium-service/enquiry?type=consult', { state: { discount_amount: 599 } })} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md w-full transition-all">Consult Now →</button>
        </div>
    )
}

export default AskYouQuestion;