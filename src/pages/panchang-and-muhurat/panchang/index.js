import { useSelector } from 'react-redux';
import { CalendarDays, MapPin, Sunrise, Sunset, Moon, Clock, SunMoon, Star, Timer, CircleDashed, Globe, Mountain, MoonStar, Sun, AlignVerticalSpaceBetween } from 'lucide-react';

const DetailCard = ({ label, value, icon: Icon }) => (
    <div className="border p-3 rounded-sm basis-full md:basis-[24%] flex gap-3 items-start">
        <div className="bg-primary p-2 rounded-full text-white">
            <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-0.5">
            <p className="text-xs text-gray-500 uppercase font-medium">{label}</p>
            <p className="text-sm font-semibold text-primary">{value}</p>
        </div>
    </div>
);

const Panchang = () => {
    const { panchangData } = useSelector(state => state?.astrologyApiReducer);
    if (!panchangData) return <div className="bg-white rounded-[3px] text-center py-10 text-gray-500">Panchang data not available.</div>;
    const { day, month, year, place, latitude, longitude, sunrise, sunset, moonrise, moonset, tithi, nakshatra, yoga, karan, vaara, masa, ritu, vikramSamvat, shakSamvat, sun_ayana, sunsign, moonsign, abhijitkal, gulika, rahukal, yamganda, moonniwas, dishashool } = panchangData;

    const formatDate = `${day}-${month}-${year}`;
    const location = `${place} (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;

    return (
        <>
            <div className="space-y-5">
                <main className="bg-white rounded-sm p-5 flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="self-stretch w-1 bg-primary rounded"></div>
                        <h5 className="font-semibold text-lg flex items-center gap-2">
                            <CalendarDays size={18} /> Panchang Details - {formatDate}
                        </h5>
                    </div>

                    <div className="text-sm text-gray-500 flex items-center gap-2 ml-2">
                        <MapPin size={14} /> {location}
                    </div>

                    <div className="flex flex-wrap gap-[1.33%] gap-y-4">
                        <DetailCard label="Vaara (Day)" value={vaara} icon={Timer} />
                        <DetailCard label="Tithi" value={tithi?.name} icon={CircleDashed} />
                        <DetailCard label="Nakshatra" value={nakshatra?.name} icon={Star} />
                        <DetailCard label="Yoga" value={yoga?.name} icon={AlignVerticalSpaceBetween} />
                        <DetailCard label="Karan" value={karan?.name} icon={Mountain} />
                        <DetailCard label="Masa" value={masa} icon={CalendarDays} />
                        <DetailCard label="Ritu" value={ritu} icon={Globe} />
                    </div>
                </main>

                <main className="bg-white rounded-sm p-5 flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="self-stretch w-1 bg-primary rounded"></div>
                        <h5 className="font-semibold text-lg flex items-center gap-2">
                            <SunMoon size={18} /> Sun & Moon Timing
                        </h5>
                    </div>

                    <div className="flex flex-wrap gap-[1.33%] gap-y-4">
                        <DetailCard label="Sunrise" value={sunrise} icon={Sunrise} />
                        <DetailCard label="Sunset" value={sunset} icon={Sunset} />
                        <DetailCard label="Moonrise" value={moonrise} icon={Moon} />
                        <DetailCard label="Moonset" value={moonset} icon={MoonStar} />
                        <DetailCard label="Moon Niwas" value={moonniwas} icon={MapPin} />
                    </div>
                </main>

                <main className="bg-white rounded-sm p-5 flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="self-stretch w-1 bg-primary rounded"></div>
                        <h5 className="font-semibold text-lg flex items-center gap-2">
                            <Clock size={18} /> Muhurat & Dosha Kaal
                        </h5>
                    </div>

                    <div className="flex flex-wrap gap-[1.33%] gap-y-4">
                        <DetailCard label="Abhijit Kal" value={abhijitkal} icon={Clock} />
                        <DetailCard label="Rahu Kaal" value={rahukal} icon={Clock} />
                        <DetailCard label="Gulika Kaal" value={gulika} icon={Clock} />
                        <DetailCard label="Yamganda" value={yamganda} icon={Clock} />
                        <DetailCard label="Disha Shool" value={dishashool} icon={Globe} />
                    </div>
                </main>

                <main className="bg-white rounded-sm p-5 flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className="self-stretch w-1 bg-primary rounded"></div>
                        <h5 className="font-semibold text-lg flex items-center gap-2">
                            <Star size={18} /> Zodiac & Samvat Info
                        </h5>
                    </div>

                    <div className="flex flex-wrap gap-[1.33%] gap-y-4">
                        <DetailCard label="Sun Sign" value={sunsign} icon={Sun} />
                        <DetailCard label="Moon Sign" value={moonsign} icon={Moon} />
                        <DetailCard label="Ayana" value={sun_ayana} icon={SunMoon} />
                        <DetailCard label="Vikram Samvat" value={vikramSamvat} icon={CalendarDays} />
                        <DetailCard label="Shaka Samvat" value={shakSamvat} icon={CalendarDays} />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Panchang;