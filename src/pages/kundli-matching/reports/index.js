import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { CallSvg, ChatSvg, FemaleSvg, MaleSvg } from '../../../assets/svg';
import { KundliFormatDateTime, formatBirthDate, formatBirthTime } from '../../../utils/common-function';
import * as ProfileActions from '../../../redux/actions/profileAction';
import * as AstrologyApiActions from '../../../redux/actions/astrologyApiAction';

const Reports = () => {
    const { profileId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector(state => state?.commonReducer);
    const { kundliMatchingProfileByIdData } = useSelector(state => state?.profileReducer);
    const { AsthakootaData, AstroData } = useSelector(state => state?.astrologyApiReducer);

    useEffect(() => {
        //! Dispatching API For Gettting Profile Data 
        dispatch(ProfileActions?.getKundliMatchingProfileById({ Id: profileId }));
    }, [profileId]);

    useEffect(() => {
        const newPayloadData = {
            boyName: kundliMatchingProfileByIdData?.MaleName,
            boyDay: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.MaledateOfBirth)?.day), // Convert to string
            boyMonth: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.MaledateOfBirth)?.month), // Convert to string
            boyYear: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.MaledateOfBirth)?.year), // Convert to string
            boyHour: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.MaledateOfBirth)?.hour), // Convert to string
            boyMin: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.MaledateOfBirth)?.min), // Convert to string
            boyPlace: kundliMatchingProfileByIdData?.MaleplaceOfBirth,
            boyLatitude: String(kundliMatchingProfileByIdData?.Malelatitude),
            boyLongitude: String(kundliMatchingProfileByIdData?.Malelongitude),
            boyTimezone: kundliMatchingProfileByIdData?.timeZone,
            boyGender: kundliMatchingProfileByIdData?.Malegender,
            girlName: kundliMatchingProfileByIdData?.FemaleName,
            girlDay: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.FemaledateOfBirth)?.day), // Convert to string
            girlMonth: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.FemaledateOfBirth)?.month), // Convert to string
            girlYear: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.FemaledateOfBirth)?.year), // Convert to string
            girlHour: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.FemaledateOfBirth)?.hour), // Convert to string
            girlMin: String(KundliFormatDateTime(kundliMatchingProfileByIdData?.FemaledateOfBirth)?.min), // Convert to string
            girlPlace: kundliMatchingProfileByIdData?.FemaleplaceOfBirth,
            girlLatitude: String(kundliMatchingProfileByIdData?.Femalelatitude),
            girlLongitude: String(kundliMatchingProfileByIdData?.Femalelongitude),
            girlTimezone: kundliMatchingProfileByIdData?.timeZone,
            girlGender: kundliMatchingProfileByIdData?.Femalegender
        }


        if (kundliMatchingProfileByIdData) {
            dispatch(AstrologyApiActions?.getAsthaKoota(newPayloadData));
            dispatch(AstrologyApiActions?.getAstroData(newPayloadData));
        }
    }, [kundliMatchingProfileByIdData, profileId]);



    const girlData = {
        name: AsthakootaData?.girlName,
        gender: AsthakootaData?.girlGender,
        birthDate: {
            day: AsthakootaData?.girlDay,
            month: AsthakootaData?.girlMonth,
            year: AsthakootaData?.girlYear,
            hour: AsthakootaData?.girlHour,
            minute: AsthakootaData?.girlMin
        },
        timezone: AsthakootaData?.girlTimezone,
        place: AsthakootaData?.girlPlace,
        latitude: AsthakootaData?.girlLatitude,
        longitude: AsthakootaData?.girlLongitude,
    };

    const boyData = {
        name: AsthakootaData?.boyName,
        gender: AsthakootaData?.boyGender,
        birthDate: {
            day: AsthakootaData?.boyDay,
            month: AsthakootaData?.boyMonth,
            year: AsthakootaData?.boyYear,
            hour: AsthakootaData?.boyHour,
            minute: AsthakootaData?.boyMin
        },
        place: AsthakootaData?.boyPlace,
        latitude: AsthakootaData?.boyLatitude,
        longitude: AsthakootaData?.boyLongitude,
        timezone: AsthakootaData?.boyTimezone
    };


    const manglikData = AsthakootaData?.mangalDoshaAnalysis;
    const manglikDataForBoy = manglikData?.boy?.mangalDosha;
    const manglikDataForGirl = manglikData?.girl?.mangalDosha;
    const matchData = AsthakootaData?.matchData;
    const falitData = AsthakootaData?.falit;

    return (
        <>
            {isLoading ?
                <>
                    <div className='bg-white p-3 rounded-[3px]'>
                        <article>
                            <main className='flex items-center justify-center gap-5'>
                                <div className='h-10 w-20'><Skeleton height={'100%'} /></div>
                                <div className='h-16 w-24'><Skeleton height={'100%'} /></div>
                                <div className='h-10 w-20'><Skeleton height={'100%'} /></div>
                            </main>
                        </article>
                    </div>

                    <div className='bg-white p-3 rounded-[3px]'>
                        <article>
                            <main className='flex max-md:flex-col justify-between gap-10 text-gray-800'>
                                <div className='flex-1 rounded-md'>
                                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div className='h-80'><Skeleton height={'100%'} /></div>
                                    </SkeletonTheme>
                                </div>

                                <div className='flex-1 rounded-md'>
                                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div className='h-80'><Skeleton height={'100%'} /></div>
                                    </SkeletonTheme>
                                </div>
                            </main>
                        </article>
                    </div>

                    <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                        <article>
                            <main className='flex max-md:flex-col justify-between gap-10 text-gray-800'>
                                <div className='flex-1 rounded-md'>
                                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div className='h-80'><Skeleton height={'100%'} /></div>
                                    </SkeletonTheme>
                                </div>

                                <div className='flex-1 rounded-md'>
                                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div className='h-80'><Skeleton height={'100%'} /></div>
                                    </SkeletonTheme>
                                </div>
                            </main>
                        </article>
                    </section>
                </>
                :
                <section className='space-y-3'>
                    <div className='bg-white p-3 rounded-[3px]'>
                        <main className='flex items-center justify-center gap-5'>
                            <div className='border border-primary px-5 py-2 bg-orange-100 rounded-md'>{kundliMatchingProfileByIdData?.MaleName}</div>
                            <div><img src='https://aws.astrotalk.com/assets/images/rings.webp' className='object-contain w-20' /></div>
                            <div className='border border-primary px-5 py-2 bg-orange-100 rounded-md'>{kundliMatchingProfileByIdData?.FemaleName}</div>
                        </main>
                    </div>

                    <main className='rounded-[3px] grid md:grid-cols-2 gap-3 text-gray-800'>
                        <div className='flex-1 bg-white rounded-[3px]'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-[3px]'>
                                <div> <MaleSvg /></div>
                                <div className='text-lg'>Basic Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>{boyData.gender}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Name</div>
                                <div className='basis-[65%]'>{boyData.name}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Date</div>
                                <div className='basis-[65%]'>{formatBirthDate(boyData)}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Time</div>
                                <div className='basis-[65%]'>{formatBirthTime(boyData)}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Place</div>
                                <div className='basis-[65%]'>{boyData.place}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Latitude</div>
                                <div className='basis-[65%]'>{boyData.latitude}</div>
                            </div>

                            <div className='flex items-center px-5 py-2'>
                                <div className='basis-[35%] font-semibold'>Longitude</div>
                                <div className='basis-[65%]'>{boyData.longitude}</div>
                            </div>
                        </div>

                        <div className='flex-1 bg-white rounded-[3px]'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-[3px]'>
                                <div> <FemaleSvg /></div>
                                <div className='text-lg'>Basic Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>{girlData.gender}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Name</div>
                                <div className='basis-[65%]'>{girlData.name}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Date</div>
                                <div className='basis-[65%]'>{formatBirthDate(girlData)}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Time</div>
                                <div className='basis-[65%]'>{formatBirthTime(girlData)}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Place</div>
                                <div className='basis-[65%]'>{girlData.place}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Latitude</div>
                                <div className='basis-[65%]'>{girlData.latitude}</div>
                            </div>

                            <div className='flex items-center px-5 py-2'>
                                <div className='basis-[35%] font-semibold'>Longitude</div>
                                <div className='basis-[65%]'>{girlData.longitude}</div>
                            </div>
                        </div>
                    </main>

                    <main className='rounded-[3px] grid md:grid-cols-2 gap-3 text-gray-800'>
                        <div className='flex-1 bg-white rounded-[3px]'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-[3px]'>
                                <div> <MaleSvg /></div>
                                <div className='text-lg'>Astro Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Male</div>
                            </div>

                            {AstroData && Object.keys(AstroData.boyAstroData).map((value, index) => {
                                const data = AstroData.boyAstroData[value];

                                // Define the keys to be displayed (Yog, Karan, Tithi)
                                const displayableKeys = ['ascendant', 'varna', 'vashya', 'yoni', 'yunja', 'gana', 'nadi', 'naksahtra', 'nakshatraLord', 'paya', 'sign', 'signLord', 'sunrise', 'sunset', 'tatva', 'nameAlphabetEnglish', 'nameAlphabetHindi', 'yog', 'karan', 'tithi'];

                                // Only render if the key is in the list of displayable keys
                                if (displayableKeys.includes(value)) {
                                    return (
                                        <div key={index} className="flex items-center px-5 py-2 border-b">
                                            <div className="basis-[35%] font-semibold capitalize">{value}</div>
                                            <div className="basis-[65%]">
                                                {/* Check if the data is an object and contains startDateTime and endDateTime */}
                                                {typeof data === 'object' && data !== null ? (
                                                    <>
                                                        <div><strong>Name:</strong> {data.name}</div>
                                                        <div><strong>Start Time:</strong> {data.startDateTime}</div>
                                                        <div><strong>End Time:</strong> {data.endDateTime}</div>
                                                    </>
                                                ) : (
                                                    data // Display the value directly if it's not an object
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Do not render anything for non-displayable keys
                            })}
                        </div>

                        <div className='flex-1 bg-white rounded-[3px]'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-[3px]'>
                                <div> <FemaleSvg /></div>
                                <div className='text-lg'>Astro Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Female</div>
                            </div>

                            {AstroData && Object.keys(AstroData.girlAstroData).map((value, index) => {
                                const data = AstroData.girlAstroData[value];

                                // Define the keys to be displayed (Yog, Karan, Tithi)
                                const displayableKeys = ['ascendant', 'varna', 'vashya', 'yoni', 'yunja', 'gana', 'nadi', 'naksahtra', 'nakshatraLord', 'paya', 'sign', 'signLord', 'sunrise', 'sunset', 'tatva', 'nameAlphabetEnglish', 'nameAlphabetHindi', 'yog', 'karan', 'tithi'];

                                // Only render if the key is in the list of displayable keys
                                if (displayableKeys.includes(value)) {
                                    return (
                                        <div key={index} className="flex items-center px-5 py-2 border-b">
                                            <div className="basis-[35%] font-semibold capitalize">{value}</div>
                                            <div className="basis-[65%]">
                                                {/* Check if the data is an object and contains startDateTime and endDateTime */}
                                                {typeof data === 'object' && data !== null ? (
                                                    <>
                                                        <div><strong>Name:</strong> {data.name}</div>
                                                        <div><strong>Start Time:</strong> {data.startDateTime}</div>
                                                        <div><strong>End Time:</strong> {data.endDateTime}</div>
                                                    </>
                                                ) : (
                                                    data // Display the value directly if it's not an object
                                                )}
                                            </div>
                                        </div>
                                    );
                                }

                                return null; // Do not render anything for non-displayable keys
                            })}
                        </div>
                    </main>

                    <main className='rounded-[3px] grid md:grid-cols-2 gap-3 text-gray-800'>
                        <div className='flex-1 bg-white rounded-[3px] pb-5'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-[3px]'>
                                <div> <MaleSvg /></div>
                                <div className='text-lg'>Manglik Report</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Male</div>
                            </div>

                            <div className='px-5 py-2'>{manglikDataForBoy?.info}</div>

                            <div className='flex items-center px-5 py-2 border-y'>
                                <div className='basis-[35%] font-semibold'>Intensity</div>
                                <div className='basis-[65%]'>{manglikDataForBoy?.intensity}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Reason</div>
                                <div className='basis-[65%]'>{manglikDataForBoy?.reason}</div>
                            </div>

                            <div className='px-5 py-2 font-semibold'>Type</div>
                            {<div className='px-5 py-0.5'>{manglikDataForBoy?.type}</div>}

                        </div>

                        <div className='flex-1 bg-white rounded-[3px] pb-5'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-[3px]'>
                                <div> <FemaleSvg /></div>
                                <div className='text-lg'>Manglik Report</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Female</div>
                            </div>

                            <div className='px-5 py-2'>{manglikDataForGirl?.info}</div>

                            <div className='flex items-center px-5 py-2 border-y'>
                                <div className='basis-[35%] font-semibold'>Intensity</div>
                                <div className='basis-[65%]'>{manglikDataForGirl?.intensity}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Reason</div>
                                <div className='basis-[65%]'>{manglikDataForGirl?.reason}</div>
                            </div>

                            <div className='px-5 py-2 font-semibold'>Type</div>
                            {<div className='px-5 py-0.5'>{manglikDataForGirl?.type}</div>}


                        </div>
                    </main>

                    <main className='flex max-md:flex-col justify-between gap-10 text-gray-800'>
                        <div className='flex-1 bg-white rounded-[3px]'>
                            <div className='bg-primary text-white text-center px-5 py-2 text-lg font-semibold rounded-[3px]'>
                                AshtaKoota Details
                            </div>

                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-6 py-3 border-b text-left font-semibold">Name</th>
                                        <th className="px-6 py-3 border-b text-left font-semibold">Maximum</th>
                                        <th className="px-6 py-3 border-b text-left font-semibold">Obtained</th>
                                        <th className="px-6 py-3 border-b text-left font-semibold">Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matchData?.map((item, index) => (
                                        <tr key={index} className={item.name === "Total" ? "bg-gray-300 font-semibold" : ""}>
                                            <td className="px-6 py-4 border-b">{item.name}</td>
                                            <td className="px-6 py-4 border-b">{item.maximum}</td>
                                            <td className="px-6 py-4 border-b">{item.obtained}</td>
                                            <td className="px-6 py-4 border-b">{item.area}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>

                    {/* Prediction */}
                    <main className='flex max-md:flex-col justify-between gap-10 text-gray-800'>
                        <div className='flex-1 bg-white rounded-[3px]'>
                            <div className='bg-primary text-white text-center px-5 py-2 text-lg font-semibold rounded-[3px]'>AshtaKoota Prediction</div>
                            <div className='p-10 max-md:p-2 flex flex-col gap-5'>
                                {falitData && Object.keys(falitData)?.map((value, index) => (
                                    <div key={index} className='flex gap-[5%]'>
                                        <p className='font-semibold basis-[12%] capitalize'>{value?.split("")?.slice(0, -5)?.join("")}</p>
                                        <p className='text-justify basis-[83%]' dangerouslySetInnerHTML={{ __html: falitData[value] }}></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>

                    <div className='bg-orange-100 text-gray-800 rounded-[3px]'>
                        <main className='flex-1 flex items-center justify-center flex-col gap-10 text-center px-10 max-lg:px-4 py-10'>
                            <div className='text-2xl max-lg:text-xl px-60 max-md:px-0 max-lg:px-40'>Connect with an Astrologer on Call or Chat for more personalised detailed predictions.</div>
                            <div className='flex gap-5'>
                                <div onClick={() => navigate('/astrologer')} className='cursor-pointer bg-primary text-white flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-primary transition-all duration-300 ease-in'>
                                    <CallSvg /> <div>Talk To Astrologer</div>
                                </div>

                                <div onClick={() => navigate('/astrologer')} className='cursor-pointer bg-primary text-white flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-primary transition-all duration-300 ease-in'>
                                    <ChatSvg /> <div>Chat With Astrologer</div>
                                </div>
                            </div>
                        </main>
                    </div>
                </section>}
        </>
    )
}

export default Reports;