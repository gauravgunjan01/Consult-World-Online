import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls';
import Kundliimage from '../../assets/images/common/kundli-image.jpeg';
import AskYouQuestion from '../../components/features/AskYouQuestion';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as AstrologerActions from '../../redux/actions/astrologerAction';

const PremiumService = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerDataById } = useSelector(state => state?.astrologerReducer);

    const steps = [
        "Enter Your Birth Details",
        "Verify and Confirm Your Details",
        "Select Preferred Language of Answer",
        "Ask Your Question - You can either choose from the dropdown list of questions or type your own question. Just remember to type specific questions. You can add additional details if you think it is important information.",
        "Make the Payment to Confirm Your Order",
    ];

    const testimonials = [
        {
            name: "Devendar Joshi",
            photo: "https://5.imimg.com/data5/SELLER/Default/2024/10/457072165/GN/IL/GD/226988027/dhyan-posture-lord-hanuman-ji.jpg", // Replace with actual photo URL
            quote: `This was my second service purchased from your site. I am satisfied the way you interpret and explain the results in brief. However, I am waiting for the predictions to get true by the passing time. Hope, all whatever have been send in reports are genuine. Also, i would like to share a feedback that you should take less time in delivering your services. Good wishes to your team`,
        },
        {
            name: "Dipti Mehta",
            photo: "https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/9/d/c/small-shiv-ji-poster-shiv-parvati-mahadev-mahakal-bholenath-lord-original-imahfhtzvr23z5xm.jpeg?q=20&crop=false", // Replace with actual photo URL
            quote: `There was a deep description of the Planetary positions in the birth chart and the perfect explanation for the questions asked and they have given remedies to do for they development of our Future Life.`,
        },
    ];

    const colorClasses = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-orange-400",
        "bg-teal-500",
        "bg-rose-500",
    ];

    useEffect(() => {
        dispatch(AstrologerActions.getAstrologerById({ astrologerId: '681c8fef6167109eefa1fe2c' }));
    }, []);

    return (
        <>
            <TopHeaderSection />

            <section className='space-y-10 pt-10 pb-20 text-justify'>
                <section className='px-[100px] max-lg:px-[20px] max-lg:text-sm text-gray-800'>
                    <div className="bg-white p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                        {/* Left Section */}
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                Get Your Queries Answered by Our Principal Astrologer -{" "}
                                <span className="text-yellow-600 underline decoration-yellow-400 decoration-4 underline-offset-2">{astrologerDataById?.astrologerName}</span>
                            </h2>

                            <div className="flex items-start gap-4 mt-6">
                                <img src={api_urls + astrologerDataById?.profileImage} alt={astrologerDataById?.astrologerName} className="rounded-md w-36 h-40 object-cover" />
                                <p className="text-gray-700 md:text-lg">{astrologerDataById?.long_bio}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-6">
                                {astrologerDataById && astrologerDataById?.skill?.length > 0 &&
                                    astrologerDataById?.skill?.map((value, index) => {
                                        const skillName = value?.skill || "Unknown";
                                        const color = colorClasses[index % colorClasses.length];

                                        return (
                                            <span key={skillName + index} className={`${color} text-white px-5 py-1 rounded-full max-lg:text-sm font-semibold`}>{skillName}</span>
                                        );
                                    })}
                            </div>
                        </div>

                        <AskYouQuestion />
                    </div>
                </section>

                <section className='px-[100px] max-lg:px-[20px] max-lg:text-sm text-gray-800'>
                    <div className="bg-white p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                        {/* Left Section */}
                        <div className="flex-1 space-y-5">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Now You Can Consult Our Principal Astrologer Easily
                            </h2>

                            <p className="">Ask your questions regarding career, health, marriage, relationships, or any other area of life. And, get answers with a high level of accuracy and effective remedial measures from our Principal Astrologer, {astrologerDataById?.astrologerName}.</p>

                            <ul className="space-y-3 text-gray-800">
                                <li className="flex items-center gap-2">
                                    ✅ Panditji takes only 10 questions in a day so that he can personally work on each query. You get your answers and remedial measures by an expert!
                                </li>
                                <li className="flex items-center gap-2">
                                    ✅ You get effective and easy to follow remedial measures
                                </li>
                                <li className="flex items-center gap-2">
                                    ✅ You get the response emailed to the given email id within 48 to 72 hours.
                                </li>
                            </ul>
                        </div>

                        <AskYouQuestion />
                    </div>
                </section>

                <section className='px-[100px] max-lg:px-[20px] max-lg:text-sm text-gray-800'>
                    <div className="bg-white p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                        {/* Left Section */}
                        <div className="flex-1 space-y-5">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                How Consult Our Principal Astrologer Works
                            </h2>

                            <p className="">It’s really easy! Just follow the steps given below and your query will reach our {astrologerDataById?.astrologerName} in no time!</p>

                            <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-start gap-4 relative">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full border border-blue-500 text-blue-600 flex items-center justify-center font-semibold">
                                                {index + 1}
                                            </div>
                                            {index !== steps.length - 1 && (<div className="h-full border-l-4 border-dotted border-blue-300 mt-1"></div>)}
                                        </div>

                                        <div className="text-gray-700 text-sm md:text-base pt-0.5">{step}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <AskYouQuestion />
                    </div>
                </section>

                <section className='px-[100px] max-lg:px-[20px] max-lg:text-sm text-gray-800'>
                    <div className="bg-white py-12 px-4 md:px-8 max-w-5xl mx-auto text-center">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">What Our{" "}<span className="text-blue-700 underline decoration-yellow-400 decoration-4 underline-offset-4">Customers</span>{" "}are Saying</h2>

                        <div className="space-y-8">
                            {testimonials.map((item, index) => (
                                <div key={index} className="bg-white shadow-sm border rounded-md p-6 text-left" >
                                    <div className="flex items-start gap-4">
                                        <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-full object-cover mt-1" />
                                        <div className="text-gray-700 text-sm leading-relaxed">
                                            <p className="mb-3">"{item.quote}"</p>
                                            <p className="text-gray-500 text-sm font-medium">
                                                - {item.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='px-[100px] max-lg:px-[20px] max-lg:text-sm text-gray-800 text-center space-y-8'>
                    <h1 className="text-3xl md:text-4xl font-bold">Your Janam Kundli shows where you will succeed</h1>

                    <p className="max-w-3xl mx-auto text-sm md:text-base">We often act on instinct, but your Kundli shows what you should do to be successful. Get precise guidance on love, career, and health based on your birth chart. Trusted by{" "} <span className="text-yellow-400 font-semibold">Over 1.5 Lakh People</span> for Accurate Insights. Receive your 140+ page Kundli report in an easy-to-read report within 2-3 working days.</p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                        <div className="flex items-center gap-2"><Check className="text-yellow-400 w-5 h-5" />Accurate predictions</div>
                        <div className="flex items-center gap-2"><Check className="text-yellow-400 w-5 h-5" />Actionable insights for success</div>
                        <div className="flex items-center gap-2"><Check className="text-yellow-400 w-5 h-5" />Crafted by 35+ years experienced astrologer</div>
                    </div>

                    <h2 className="text-lg text-pink-400 font-bold">THIS REPORT IS FOR YOU!!</h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <img src={Kundliimage} alt="Kundli Book" className="w-28 object-contain" />

                        <div className="text-left md:text-center max-w-md">
                            <p className="text-xl font-bold">
                                At Just <span className="line-through text-gray-400">₹1500</span>{" "}
                                <span className="text-yellow-400">₹499/- Only</span>
                            </p>
                            <p className="text-green-400 font-medium">That's 66.67% OFF</p>
                        </div>
                    </div>

                    <p className="mt-8 text-sm md:text-base">Don’t let uncertainty hold you back any longer.</p>

                    <button onClick={() => navigate('/premium-service/enquiry?type=kundli', { state: { amount: 1500, discount_amount: 499 } })} className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition">Get Your Kundli Report Now</button>
                </section>
            </section>
        </>
    )
}

export default PremiumService;