import { useSelector } from 'react-redux';
import { Clock, Sun, Moon, Info } from 'lucide-react';

const ChaughadiyaCard = ({ name, time, auspicious, info }) => (
    <div className={`p-3 border-l-4 flex flex-col gap-1 ${auspicious ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className={`text-sm font-bold ${auspicious ? 'text-green-700' : 'text-red-700'}`}>
                    {name}
                </div>
                <Info size={14} className="text-gray-400" title={info} />
            </div>
            <div className="text-sm text-gray-600 font-medium">{time}</div>
        </div>
        <p className="text-xs text-gray-500">{info}</p>
    </div>
);

const ChaughadiyaDetails = () => {
    const { chaughadiyaDetailsData } = useSelector(state => state?.astrologyApiReducer);

    if (!chaughadiyaDetailsData) {
        return <div className="bg-white rounded-[3px] text-center py-10 text-gray-500">Chaughadiya data not available.</div>;
    }

    return (
        <>
            <div className="bg-white shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 bg-primary h-6 rounded" />
                    <h5 className="font-semibold text-lg flex items-center gap-2">
                        <Clock size={18} /> Chaughadiya Muhurat
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h6 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary"><Sun size={16} /> Day Chaughadiya</h6>

                        <div className="flex flex-col gap-3">
                            {chaughadiyaDetailsData.dayChaughadiya.map((item, idx) => <ChaughadiyaCard key={`day-${idx}`} name={item.name} time={item.time} info={item.auspicious_info} auspicious={item.auspicious} />)}
                        </div>
                    </div>

                    <div>
                        <h6 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary"><Moon size={16} /> Night Chaughadiya</h6>

                        <div className="flex flex-col gap-3">
                            {chaughadiyaDetailsData.nightChaughadiya.map((item, idx) => <ChaughadiyaCard key={`night-${idx}`} name={item.name} time={item.time} info={item.auspicious_info} auspicious={item.auspicious} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChaughadiyaDetails;