import React, { useEffect, useState } from 'react';
import * as KundliActions from '../../../redux/actions/kundliAction';
import { useDispatch, useSelector } from 'react-redux';
import { kundliRequest } from '../../../utils/api-function';

const YoginiDasha = ({ data }) => {
  console.log('YoginiDasha:::', data);

  const dispatch = useDispatch();
  const kundliYoginiMahaDashaData = data?.yoginiMahaDashaList || [];  // Maha Dasha Data
  const { kundliYoginiCurrentDashaData } = useSelector(state => state?.kundliReducer);   // Current Dasha Data from Redux
  const [kundliCurrentDashaData, setKundliCurrentDashaData] = useState([]);
  console.log('kundliCurrentDashaData:::', kundliYoginiCurrentDashaData);

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
    dispatch(KundliActions.kundliGetYoginiCurrentDasha(payload));
  }, []);

  useEffect(() => {
    if (kundliYoginiCurrentDashaData?.yoginiCurrentDashaList) {
      setKundliCurrentDashaData(kundliYoginiCurrentDashaData?.yoginiCurrentDashaList);
    }
  }, [kundliYoginiCurrentDashaData]);

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
        {selectedTab === 'Maha Dasha' && <MahaDashaTab data={kundliYoginiMahaDashaData} />}
        {selectedTab === 'Current Dasha' && <CurrentDashaTab data={kundliCurrentDashaData} />}
      </div>
    </div>
  );
};

// Maha Dasha Tab Component
const MahaDashaTab = ({ data }) => {
  const [kundliYoginiAntarDashaData, setKundliYoginiAntarDashaData] = useState(null);
  const [antarDashaPath, setAntarDashaPath] = useState('');

  const antarDashaPayload = {
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
    "mahaDashaYogini": "Bhadrika"
  }

  // Back button to go back to main dasha list
  const handleBackToMainDasha = () => setAntarDashaPath('');

  //! Fetch antar dasha data
  const kundliGetYoginiAntarDasha = async (payload) => {
    const response = await kundliRequest(
      `https://kundli2.astrosetalk.com/api/dasha/get_yogini_antar_dasha`,
      antarDashaPayload
    );
    console.log('kundliGetYoginiAntarDasha', response);

    setAntarDashaPath(payload); // Store planet name instead of object
    if (response?.success) {
      if (response?.responseData?.status) {
        setKundliYoginiAntarDashaData(response?.responseData?.data[0]?.yoginiAntarDashaData?.yoginiAntarDashaList || []);
      }
    }
  };
  return (
    <div>
      <div className="text-lg font-bold mb-4">Yogini Maha Dasha</div>
      {
        !antarDashaPath && data.map((value, index) => (
          <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between"
            onClick={() => kundliGetYoginiAntarDasha(value?.yogini)}>
            <span>{value?.yogini}</span> <span>{value?.endDate}</span>
          </div>
        ))
      }

      {/* Render Antar dasha list */}
      {antarDashaPath && (
        <>
          <div className='flex items-center justify-between mb-4'>
            <div className="text-base font-semibold">Yogini Antara Dasha</div>
            <button className="bg-white hover:bg-white text-black border border-primary py-1 px-4 rounded-md text-sm"
              onClick={handleBackToMainDasha}>Back</button>
          </div>
          {kundliYoginiAntarDashaData?.map((value, index) => (
            <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between">
              <span>{antarDashaPath} / {value?.yogini}</span> <span>{value?.endDate}</span>
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
      <div className="text-lg font-bold mb-4">Yogini Current Dasha</div>
      {data?.length > 0 ? (
        data.map((value, index) => (
          <div key={index} className="bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between">
            <span>{value?.name}</span> <span>{value?.yogini}</span> <span>{value?.endDate}</span>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm">No Current Dasha available</div>
      )}
    </div>
  );
};

export default YoginiDasha;
