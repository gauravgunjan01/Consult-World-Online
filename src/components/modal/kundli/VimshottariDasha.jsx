import React, { useEffect, useState } from 'react';
import * as KundliActions from '../../../redux/actions/kundliAction';
import { useDispatch, useSelector } from 'react-redux';
import { kundliRequest } from '../../../utils/api-function';

const VimshottariDasha = ({ data }) => {
    console.log('VimshottariDasha:::', data);

    const dispatch = useDispatch();
    const kundliVimshottariMahaDashaData = data?.vimshottaryMahaDashaList || [];  // Maha Dasha Data
    const { kundliVimshottariCurrentDashaData } = useSelector(state => state?.kundliReducer);   // Current Dasha Data from Redux
    const [kundliCurrentDashaData, setKundliCurrentDashaData] = useState([]);
    console.log('kundliVimshottariCurrentDashaData:::', kundliVimshottariCurrentDashaData);

    const [selectedTab, setSelectedTab] = useState('Maha Dasha');

    const payload = {
        "name": "Satya Tiwari",
        "day": "31",
        "month": "3",
        "year": "1987",
        "hour": "0",
        "min": "55",
        "place": "Motihari",
        "latitude": "26.6550589",
        "longitude": "84.8986636",
        "timezone": "5.5",
        "gender": "male"
    }

    // Fetch Current Dasha 
    useEffect(() => {
        dispatch(KundliActions.kundliGetVimshottariCurrentDasha(payload));
    }, []);

    useEffect(() => {
        if (kundliVimshottariCurrentDashaData?.vimshottaryCurrentDashaList) {
            setKundliCurrentDashaData(kundliVimshottariCurrentDashaData?.vimshottaryCurrentDashaList);
        }
    }, [kundliVimshottariCurrentDashaData]);

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Tabs */}
            <div className="flex gap-4 justify-around mb-5">
                <div
                    onClick={() => setSelectedTab('Maha Dasha')}
                    className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 'Maha Dasha' ? 'bg-primary text-white' : 'border border-primary'}`}
                >
                    Maha Dasha
                </div>
                <div
                    onClick={() => setSelectedTab('Current Dasha')}
                    className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 'Current Dasha' ? 'bg-primary text-white' : 'border border-primary'}`}
                >
                    Current Dasha
                </div>
            </div>

            {/* Content */}
            <div>
                {selectedTab === 'Maha Dasha' && <MahaDashaTab data={kundliVimshottariMahaDashaData} />}
                {selectedTab === 'Current Dasha' && <CurrentDashaTab data={kundliCurrentDashaData} />}
            </div>
        </div>
    );
};

// Maha Dasha Tab Component
const MahaDashaTab = ({ data }) => {
    console.log('VimshottariDasha:::', data);
    const [kundliVimshottariAntarDashaData, setKundliVimshottariAntarDashaData] = useState(null);
    const [kundliVimshottariPratyantarDashaData, setKundliVimshottariPratyantarDashaData] = useState(null);
    const [kundliVimshottariSookshmaDashaData, setKundliVimshottariSookshmaDashaData] = useState(null);
    const [kundliVimshottariPranDashaData, setKundliVimshottariPranDashaData] = useState(null);
    const [antarDashaPath, setAntarDashaPath] = useState('');
    const [pratyantarDashaPath, setPratyantarDashaPath] = useState('');
    const [sookshmaDashaPath, setSookshmaDashaPath] = useState('');
    const [pranDashaPath, setPranDashaPath] = useState('');


    // Back button to go back to antar dasha list
    const handleBackToAntarDasha = () => setPratyantarDashaPath('');

    // Back button to go back to main dasha list
    const handleBackToMainDasha = () => setAntarDashaPath('');
    const handleBackToPratyantarDasha = () => setSookshmaDashaPath('');
    const handleBackToSookshaDasha = () => setPranDashaPath('');

    const antarDashapayload = {
        name: "Satya Tiwari",
        day: "31",
        month: "3",
        year: "1987",
        hour: "0",
        min: "55",
        place: "Motihari",
        latitude: "26.6550589",
        longitude: "84.8986636",
        timezone: "5.5",
        gender: "male",
        mahaDashaLord: "Ketu"
    };

    const pratyantarDashaPayload = {
        "name": "Satya Tiwari",
        "day": "31",
        "month": "3",
        "year": "1987",
        "hour": "0",
        "min": "55",
        "place": "Motihari",
        "latitude": "26.6550589",
        "longitude": "84.8986636",
        "timezone": "5.5",
        "gender": "male",
        "mahaDashaLord": "Sun",
        "antarDashaLord": "Moon"
    };

    const sookshmaDashaPayload = {
        "name": "Satya Tiwari",
        "day": "31",
        "month": "3",
        "year": "1987",
        "hour": "0",
        "min": "55",
        "place": "Motihari",
        "latitude": "26.6550589",
        "longitude": "84.8986636",
        "timezone": "5.5",
        "gender": "male",
        "mahaDashaLord": "Ketu",
        "antarDashaLord": "Ketu",
        "pratyantarDashaLord": "Ketu"
    };

    const pranDashaPayload = {
        "name": "Satya Tiwari",
        "day": "31",
        "month": "3",
        "year": "1987",
        "hour": "0",
        "min": "55",
        "place": "Motihari",
        "latitude": "26.6550589",
        "longitude": "84.8986636",
        "timezone": "5.5",
        "gender": "male",
        "mahaDashaLord": "Ketu",
        "antarDashaLord": "Ketu",
        "pratyantarDashaLord": "Ketu",
        "sookshmaDashaLord": "Ketu"
    };



    //! Fetch antar dasha data
    const kundliGetVimshottariAntarDasha = async (payload) => {
        const response = await kundliRequest(
            `https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_antar_dasha`,
            antarDashapayload
        );
        console.log('kundliGetVimshottariAntarDasha', response);

        setAntarDashaPath(payload); // Store planet name instead of object
        if (response?.success) {
            if (response?.responseData?.status) {
                setKundliVimshottariAntarDashaData(response?.responseData?.data[0]?.vimshottaryAntarDashaData?.vimshottaryAntarDashaList || []);
            }
        }
    };

    //! Fetch Pratyantar dasha data
    const kundliGetVimshottariPratyantarDasha = async (payload) => {
        const response = await kundliRequest(
            `https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_pratyantar_dasha`,
            pratyantarDashaPayload
        );

        console.log('kundliGetVimshottariPratyantarDasha', response);
        setPratyantarDashaPath(payload);
        if (response?.success) {
            if (response?.responseData?.status) {
                setKundliVimshottariPratyantarDashaData(response?.responseData?.data[0]?.vimshottaryPratyantarDashaData?.vimshottaryPratyantarDashaList || []);
            }
        }
    };

    // Fetch Sookshma dasha data
    const kundliGetVimshottariSookshmaDasha = async (payload) => {
        const response = await kundliRequest(
            `https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_sookshma_dasha`,
            sookshmaDashaPayload
        );

        console.log('kundliGetVimshottariSookshmaDasha', response);
        setSookshmaDashaPath(payload);
        if (response?.success) {
            if (response?.responseData?.status) {
                setKundliVimshottariSookshmaDashaData(response?.responseData?.data[0]?.vimshottarySookshmaDashaData?.vimshottarySookshmaDashaList || []);
            }
        }
    };

    // Fetch Pran dasha data
    const kundliGetVimshottariPranDasha = async (payload) => {
        const response = await kundliRequest(
            `https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_pran_dasha`,
            pranDashaPayload
        );

        console.log('kundliGetVimshottariPranDasha:::', response);
        setPranDashaPath(payload);
        if (response?.success) {
            if (response?.responseData?.status) {
                setKundliVimshottariPranDashaData(response?.responseData?.data[0]?.vimshottaryPranDashaData?.vimshottaryPranDashaList || []);
            }
        }
    };


    return (
        <div>
            {/* Render main Vimshottari dasha list */}
            <div className="text-lg font-bold mb-4">Vimshottari Maha Dasha</div>
            {!antarDashaPath && !pratyantarDashaPath && data.map((value, index) => (
                <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between"
                    onClick={() => kundliGetVimshottariAntarDasha(value?.planet)}>
                    <span>{value?.planet}</span> <span>{value?.endDate}</span>
                </div>
            ))}

            {/* Render Antar dasha list */}
            {antarDashaPath && !pratyantarDashaPath && (
                <>
                    <div className='flex items-center justify-between mb-4'>
                        <div className="text-base font-semibold">Vimshottari Antara Dasha</div>
                        <button className="bg-white hover:bg-white text-black border border-primary py-1 px-4 rounded-md text-sm"
                            onClick={handleBackToMainDasha}>Back</button>
                    </div>
                    {kundliVimshottariAntarDashaData?.map((value, index) => (
                        <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between"
                            onClick={() => kundliGetVimshottariPratyantarDasha(value?.planet)}>
                            <span>{antarDashaPath} / {value?.planet}</span> <span>{value?.endDate}</span>
                        </div>
                    ))}
                </>
            )}

            {/* Render Pratyantar dasha list */}
            {pratyantarDashaPath && !sookshmaDashaPath && (
                <>
                    <div className='flex items-center justify-between mb-4'>
                        <div className="text-base font-semibold">Vimshottari Prayantra Dasha</div>
                        <button className="bg-white hover:bg-white text-black border border-primary py-1 px-4 rounded-md text-sm"
                            onClick={handleBackToAntarDasha}>Back</button>
                    </div>
                    {kundliVimshottariPratyantarDashaData?.map((value, index) => (
                        <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between"
                            onClick={() => kundliGetVimshottariSookshmaDasha(value?.planet)}>
                            <span>{antarDashaPath} / {pratyantarDashaPath}  / {value?.planet}</span> <span>{value?.endDate}</span>
                        </div>
                    ))}
                </>
            )}

            {/* Render Sookshma dasha list */}
            {sookshmaDashaPath && !pranDashaPath && (
                <>
                    <div className='flex items-center justify-between mb-4'>
                        <div className="text-base font-semibold">Vimshottari Sookshma Dasha</div>
                        <button className="bg-white hover:bg-white text-black border border-primary py-1 px-4 rounded-md text-sm"
                            onClick={handleBackToPratyantarDasha}>Back</button>
                    </div>
                    {kundliVimshottariSookshmaDashaData?.map((value, index) => (
                        <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between"
                            onClick={() => kundliGetVimshottariPranDasha(value?.planet)}>
                            <span>{antarDashaPath} / {pratyantarDashaPath} / {sookshmaDashaPath} / {value.planet}</span> <span>{value?.endDate}</span>
                        </div>
                    ))}
                </>
            )}

            {/* Render Pran dasha list */}
            {pranDashaPath && (
                <>
                    <div className='flex items-center justify-between mb-4'>
                        <div className="text-base font-semibold">Vimshottari Pran Dasha</div>
                        <button className="bg-white hover:bg-white text-black border border-primary py-1 px-4 rounded-md text-sm"
                            onClick={handleBackToSookshaDasha}>Back</button>
                    </div>
                    {kundliVimshottariPranDashaData?.map((value, index) => (
                        <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between">
                            <span>{antarDashaPath} / {pratyantarDashaPath} / {sookshmaDashaPath} / {pranDashaPath} / {value.planet}</span> <span>{value?.endDate}</span>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

// Current Dasha Tab Component
const CurrentDashaTab = ({ data }) => {
    return (
        <div>
            <div className="text-lg font-bold mb-6">Vimshottari Current Dasha</div>
            {data?.length > 0 ? (
                <div className="space-y-6">
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 hover:bg-gray-300 rounded-lg py-4 px-6 text-base flex items-center justify-between shadow-lg"
                        >
                            <span className="w-1/3">{value?.name}</span>
                            <span className="w-1/3 text-center">{value?.planet}</span>
                            {/* <span className="w-1/3 text-right">{value?.startDate} - {value?.endDate}</span> */}
                            <div>
                                <p className="w-1/3 text-right">{value?.startDate}-</p>
                                <p className="w-1/3 text-right">{value?.endDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 text-base">No Current Dasha available</div>
            )}
        </div>
    );
};



export default VimshottariDasha;;

