import { useSelector } from 'react-redux';
import { Clock4, Orbit } from 'lucide-react';

const LagnaCard = ({ rashi, from, to }) => (
    <div className="border rounded-sm p-3 flex justify-between items-center shadow-sm bg-white">
        <div className="flex items-center gap-3">
            <Orbit className="text-primary" size={20} />
            <div className="flex flex-col">
                <p className="font-semibold text-primary">{rashi}</p>
                <p className="text-xs text-gray-500">{from} ➜ {to}</p>
            </div>
        </div>
        <Clock4 className="text-gray-400" size={18} />
    </div>
);

const LagnaTable = () => {
    const { lagnaTableData } = useSelector(state => state?.astrologyApiReducer);
    if (!lagnaTableData || lagnaTableData.length === 0) return <div className="bg-white rounded-[3px] text-center py-10 text-gray-500">Lagna table data not available.</div>;

    return (
        <>
            <div className="bg-white p-5 space-y-5">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary rounded" />
                    <h5 className="font-semibold text-lg flex items-center gap-2">
                        <Orbit size={18} /> Lagna Rashi Timings
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lagnaTableData.map((item, idx) => (
                        <LagnaCard key={idx} rashi={item.rashi} from={item.from} to={item.to} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default LagnaTable;
