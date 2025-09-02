import { useSelector } from 'react-redux';
import { Clock, Sun, Moon } from 'lucide-react';

const planetColors = {
    Sun: 'bg-yellow-200 text-yellow-800',
    Moon: 'bg-blue-100 text-blue-800',
    Mars: 'bg-red-100 text-red-800',
    Mercury: 'bg-green-100 text-green-800',
    Jupiter: 'bg-orange-100 text-orange-800',
    Venus: 'bg-pink-100 text-pink-800',
    Saturn: 'bg-gray-200 text-gray-800',
};

const HoraItem = ({ planet, time }) => (
    <div className="flex items-center justify-between w-full bg-[#F9F9F9] p-2 rounded-md shadow-sm">
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${planetColors[planet] || 'bg-gray-100 text-gray-700'}`}>
                {planet[0]}
            </div>
            <p className="text-sm font-semibold text-primary">{planet}</p>
        </div>
        <p className="text-sm text-gray-500">{time}</p>
    </div>
);

const HoraMuhurat = () => {
    const { horaMuhuratData } = useSelector(state => state?.astrologyApiReducer);
    if (!horaMuhuratData) return <div className="bg-white rounded-[3px] text-center py-10 text-gray-500">Hora Muhurat data not available.</div>;

    return (
        <>
            <div className="shadow-sm rounded-md">
                <div className="flex items-center gap-2 bg-white p-5">
                    <div className="w-1 bg-primary rounded h-6" />
                    <h5 className="font-semibold text-lg flex items-center gap-2">
                        <Clock size={18} /> Hora Muhurat
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className='bg-white p-5'>
                        <h6 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary"><Sun size={16} /> Day Hora</h6>

                        <div className="flex flex-col gap-3">
                            {horaMuhuratData.dayHoras.map((hora, index) => (
                                <HoraItem key={`day-${index}`} planet={hora.planet} time={hora.time} />
                            ))}
                        </div>
                    </div>

                    <div className='bg-white p-5'>
                        <h6 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary"><Moon size={16} /> Night Hora</h6>

                        <div className="flex flex-col gap-3">
                            {horaMuhuratData.nightHoras.map((hora, index) => (
                                <HoraItem key={`night-${index}`} planet={hora.planet} time={hora.time} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HoraMuhurat;
