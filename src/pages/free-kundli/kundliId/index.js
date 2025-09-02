import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { postAPI } from '../../../utils/api-function';
import { KundliFormatDateTime } from '../../../utils/common-function';
import KundliModal from '../../../components/modal/KundliModal';
import * as KundliActions from '../../../redux/actions/kundliAction';

const Kundli = () => {
    const dispatch = useDispatch();

    const { kundliBirthDetailData, kundliAstroDetailData, kundliSetFriendShipTableData, kundliKPBirthDetailData, kundliKPPlanetaryPositionData, kundliKPCuspsDetailData, kundliKpPlanetSignificatorData, kundliKpHouseSignificatorData, kundliKpRulingPlanetData, kundliKpBirthChartData, kundliKPCuspsChartData, kundliPlanetaryPositionData, kundliUpgrahaData, kundliDashamBhavMadhyaData, kundliAshtakVargaData, kundliSarvashtakData, kundliVimshottariDashaData, kundliYoginiDashaData, kundliJaiminiDetailsData, kundliCharDashaData, kundliNumerologyDetailsData, kundliMangalDoshaData, kundliKaalsarpDoshaData, kundliPitriDoshaData, kundliSadheSatiData, kundliPredictionData, kundliLagnaChartData, kundliMoonChartData, kundliSunChartData, kundliChalitChartData, kundliHoraChartData, kundliDreshkanChartData, kundliNavamanshaChartData, kundliDashamanshaChartData, kundliDwadasmanshaChartData, kundliTrishamanshaChartData, kundliShashtymanshaChartData
    } = useSelector(state => state?.kundliReducer);

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const kundliId = query.get('kundliId');
    const type = query.get('type') || 'free-kundli';

    const [kundliPayload, setKundliPayload] = useState(null);

    useEffect(() => {
        const fetchFreeKundli = async () => {
            const { data } = await postAPI('api/kundli/get_kundli_basic_details', { kundliId });
            console.log("Kundli Detail Data :::: ", data);
            if (data?.success) {
                setKundliPayload({
                    name: String(data?.data?.name),
                    day: String(data?.payload?.day),
                    month: String(data?.payload?.month),
                    year: String(data?.payload?.year),
                    hour: moment.utc(data?.data?.tob).format('HH:mm a')?.split(':')[0],
                    min: moment.utc(data?.data?.tob).format('HH:mm a')?.split(':')[1]?.split(' ')[0],
                    place: String(data?.data?.place),
                    latitude: String(data?.payload?.lat),
                    longitude: String(data?.payload?.lon),
                    timezone: String(data?.payload?.tzone),
                    gender: String(data?.data?.gender)
                });
                console.log({
                    name: String(data?.data?.name),
                    day: String(data?.payload?.day),
                    month: String(data?.payload?.month),
                    year: String(data?.payload?.year),
                    hour: moment.utc(data?.data?.tob).format('HH:mm a')?.split(':')[0],
                    min: moment.utc(data?.data?.tob).format('HH:mm a')?.split(':')[1]?.split(' ')[0],
                    place: String(data?.data?.place),
                    latitude: String(data?.payload?.lat),
                    longitude: String(data?.payload?.lon),
                    timezone: String(data?.payload?.tzone),
                    gender: String(data?.data?.gender)
                })

                console.log({
                    hour_old: String(data?.payload?.hour),
                    min_old: String(data?.payload?.min),
                    hour: moment.utc(data?.data?.tob).format('HH:mm a')?.split(':')[0],
                    min: moment.utc(data?.data?.tob).format('HH:mm a')?.split(':')[1]?.split(' ')[0],
                });
                // localStorage.setItem('intake_data', JSON.stringify(data?.data));
            }
        }


        const fetchIntakeDetail = async () => {
            const { data } = await postAPI('api/customers/get_linked_profile', { profileId: kundliId });
            if (data?.success) {
                console.log("Kundli Detail Data Intake Detail Page :::: ", data?.data);

                console.log({
                    name: String(data?.data?.firstName) + ' ' + String(data?.data?.lastName),
                    day: String(KundliFormatDateTime(data?.data?.dateOfBirth)?.day),
                    month: String(KundliFormatDateTime(data?.data?.dateOfBirth)?.month),
                    year: String(KundliFormatDateTime(data?.data?.dateOfBirth)?.year),
                    hour: moment(data?.data?.timeOfBirth).format('HH:mm a')?.split(':')[0],
                    min: moment(data?.data?.timeOfBirth).format('HH:mm a')?.split(':')[1]?.split(' ')[0],
                    place: String(data?.data?.placeOfBirth),
                    latitude: String(data?.data?.latitude),
                    longitude: String(data?.data?.longitude),
                    timezone: String(5.5),
                    gender: String(data?.data?.gender)
                })

                setKundliPayload({
                    name: String(data?.data?.firstName) + ' ' + String(data?.data?.lastName),
                    day: String(KundliFormatDateTime(data?.data?.dateOfBirth)?.day),
                    month: String(KundliFormatDateTime(data?.data?.dateOfBirth)?.month),
                    year: String(KundliFormatDateTime(data?.data?.dateOfBirth)?.year),
                    hour: moment(data?.data?.timeOfBirth).format('HH:mm a')?.split(':')[0],
                    min: moment(data?.data?.timeOfBirth).format('HH:mm a')?.split(':')[1]?.split(' ')[0],
                    place: String(data?.data?.placeOfBirth),
                    latitude: String(data?.data?.latitude),
                    longitude: String(data?.data?.longitude),
                    timezone: String(5.5),
                    gender: String(data?.data?.gender)
                })
            }
        }

        if (type == 'free-kundli') fetchFreeKundli();
        else fetchIntakeDetail();

    }, [kundliId]);

    // const kundliPayload = {
    //     name: "Anuj Kumar",
    //     day: "06",
    //     month: "03",
    //     year: "2025",
    //     hour: "12",
    //     min: "10",
    //     place: "Noida, Uttar Pradesh, India",
    //     latitude: "28.5355161",
    //     longitude: "77.3910265",
    //     timezone: "5.5",
    //     gender: "male"
    // };

    // const kundliPayload = {
    //     name: "Devesh Ji",
    //     day: "27",
    //     month: "09",
    //     year: "1969",
    //     hour: "05",
    //     min: "30",
    //     place: "New Delhi, Delhi, India",
    //     latitude: "28.4000",
    //     longitude: "77.1300",
    //     timezone: "5.5",
    //     gender: "male"
    // };

    // const kundliPayload = {
    //     name: "Gaurav",
    //     day: "07",
    //     month: "03",
    //     year: "2025",
    //     hour: "13",
    //     min: "03",
    //     place: "Noida, Uttar Pradesh, India",
    //     latitude: "28.5355161",
    //     longitude: "77.3910265",
    //     timezone: "5.5",
    //     gender: "male"
    // };

    useEffect(() => {
        //! Dispatching API For kundliGetBirthDetail 
        kundliPayload && dispatch(KundliActions.kundliGetBirthDetail(kundliPayload));

        //! Dispatching API For kundliGetAstroDetail 
        kundliPayload && dispatch(KundliActions.kundliGetAstroDetail(kundliPayload));

        //! Dispatching API For kundliGetFriendShipTable 
        kundliPayload && dispatch(KundliActions.kundliGetFriendShipTable(kundliPayload));

        //! Dispatching API For kundliGetKpBirthDetail 
        kundliPayload && dispatch(KundliActions.kundliGetKpBirthDetail(kundliPayload));

        //! Dispatching API For kundliGetKpPlanetaryPosition 
        kundliPayload && dispatch(KundliActions.kundliGetKpPlanetaryPosition(kundliPayload));

        //! Dispatching API For kundliGetKpCuspsDetail 
        kundliPayload && dispatch(KundliActions.kundliGetKpCuspsDetail(kundliPayload));

        //! Dispatching API For kundliGetKpBirthChart 
        kundliPayload && dispatch(KundliActions.kundliGetKpBirthChart(kundliPayload));

        //! Dispatching API For kundliGetKpCuspsChart 
        kundliPayload && dispatch(KundliActions.kundliGetKpCuspsChart(kundliPayload));

        //! Dispatching API For kundliGetKpPlanetSignificator 
        kundliPayload && dispatch(KundliActions.kundliGetKpPlanetSignificator(kundliPayload));

        //! Dispatching API For kundliGetKpHouseSignificator 
        kundliPayload && dispatch(KundliActions.kundliGetKpHouseSignificator(kundliPayload));

        //! Dispatching API For kundliGetKpRulingPlanet 
        kundliPayload && dispatch(KundliActions.kundliGetKpRulingPlanet(kundliPayload));

        // ! Dispatching API For kundliGetPlanetaryPosition 
        kundliPayload && dispatch(KundliActions.kundliGetPlanetaryPosition(kundliPayload));

        // ! Dispatching API For kundliGetUpgraha
        kundliPayload && dispatch(KundliActions.kundliGetUpgraha(kundliPayload));

        // ! Dispatching API For kundliGetDashamBhavMadhya
        kundliPayload && dispatch(KundliActions.kundliGetDashamBhavMadhya(kundliPayload));

        // ! Dispatching API For kundliGetAshtakVarga
        kundliPayload && dispatch(KundliActions.kundliGetAshtakVarga(kundliPayload));

        // ! Dispatching API For kundliGetSarvashtak
        kundliPayload && dispatch(KundliActions.kundliGetSarvashtak(kundliPayload))

        // ! Dispatching API For kundliGetVimshottariDasha
        kundliPayload && dispatch(KundliActions.kundliGetVimshottariDasha(kundliPayload))

        // ! Dispatching API For kundliGetYoginiDasha
        kundliPayload && dispatch(KundliActions.kundliGetYoginiDasha(kundliPayload))

        // ! Dispatching API For kundliGetJaiminiDetails
        kundliPayload && dispatch(KundliActions.kundliGetJaiminiDetails(kundliPayload))

        // ! Dispatching API For kundliGetCharDasha
        kundliPayload && dispatch(KundliActions.kundliGetCharDasha(kundliPayload))

        // ! Dispatching API For kundliGetNumerologyDetails
        kundliPayload && dispatch(KundliActions.kundliGetNumerologyDetails(kundliPayload))

        // ! Dispatching API For kundliGetNumerologyDetails
        kundliPayload && dispatch(KundliActions.kundliGetMangalDosha(kundliPayload))

        // ! Dispatching API For kundliGetKaalsarpDosha
        kundliPayload && dispatch(KundliActions.kundliGetKaalsarpDosha(kundliPayload))

        // ! Dispatching API For kundliGetPitriDosha
        kundliPayload && dispatch(KundliActions.kundliGetPitriDosha(kundliPayload))

        // ! Dispatching API For kundliGetSadheSati
        kundliPayload && dispatch(KundliActions.kundliGetSadheSati(kundliPayload))

        // ! Dispatching API For kundliGetPrediction
        kundliPayload && dispatch(KundliActions.kundliGetPrediction(kundliPayload))

        // ! Dispatching API For kundliGetLagnaChart
        kundliPayload && dispatch(KundliActions.kundliGetLagnaChart(kundliPayload))

        // ! Dispatching API For kundliGetMoonChart
        kundliPayload && dispatch(KundliActions.kundliGetMoonChart(kundliPayload))

        // ! Dispatching API For kundliGetSunChart
        kundliPayload && dispatch(KundliActions.kundliGetSunChart(kundliPayload))

        // ! Dispatching API For kundliGetChalitChart
        kundliPayload && dispatch(KundliActions.kundliGetChalitChart(kundliPayload))



        // ! Dispatching API For kundliGetHoraChart
        kundliPayload && dispatch(KundliActions.kundliGetHoraChart(kundliPayload))

        // ! Dispatching API For kundliGetDreshkanChart
        kundliPayload && dispatch(KundliActions.kundliGetDreshkanChart(kundliPayload))

        // ! Dispatching API For kundliGetNavamanshaChart
        kundliPayload && dispatch(KundliActions.kundliGetNavamanshaChart(kundliPayload))

        // ! Dispatching API For kundliGetDashamanshaChart
        kundliPayload && dispatch(KundliActions.kundliGetDashamanshaChart(kundliPayload))

        // ! Dispatching API For kundliGetDwadasmanshaChart
        kundliPayload && dispatch(KundliActions.kundliGetDwadasmanshaChart(kundliPayload))

        // ! Dispatching API For kundliGetTrishamanshaChart
        kundliPayload && dispatch(KundliActions.kundliGetTrishamanshaChart(kundliPayload))

        // ! Dispatching API For kundliGetShashtymanshaChart
        kundliPayload && dispatch(KundliActions.kundliGetShashtymanshaChart(kundliPayload))

    }, [kundliPayload]);

    const [modalData, setModalData] = useState(null);
    const [visible, setVisible] = useState(false);
    const handleVisible = () => setVisible(false);

    const chartHead = [
        'Birth Details', 'Astro Details', 'Friendship Table', 'KP Birth Details', 'KP Planetary Positions', 'KP Cusps Details', 'KP Birth Chart', 'KP Cusps Chart', 'KP Planet Significators', 'KP House Significators', 'KP Ruling Planets', 'Planetary Position', 'Upgraha', 'Dasham Bhav Madhya', 'Ashtak Varga', 'Sarvashtak', 'Vimshottari Dasha', 'Yogini Dasha', 'Jaimini Details', 'Char Dasha',
        'Numerology Details', 
        'Mangal Dosha', 'Kaalsarp Dosha', 'Pitri Dosha', 'Sadhe Sati', 'Ascendant Prediction', 'Sign Prediction', 'Planet Consideration', 'Bhav Prediction', 'Nakshatra Prediction', 'Lagna Chart', 'Moon Chart', 'Sun Chart', 'Chalit Chart', 'Hora Chart', 'Dreshkan Chart', 'Navamansha Chart', 'Dashamansha Chart', 'Dwadasmansha Chart', 'Trishamansha Chart', 'Shashtymansha Chart'];

    const handleChartHeadClick = (value) => {
        setVisible(true);

        switch (value) {
            case 'Birth Details':
                setModalData({ title: value, data: kundliBirthDetailData });
                break;

            case 'Astro Details':
                setModalData({ title: value, data: { ...kundliAstroDetailData } });
                break;

            case 'Friendship Table':
                setModalData({ title: value, data: kundliSetFriendShipTableData });
                break;

            case 'KP Birth Details':
                setModalData({ title: value, data: kundliKPBirthDetailData });
                break;

            case 'KP Planetary Positions':
                setModalData({ title: value, data: kundliKPPlanetaryPositionData });
                break;

            case 'KP Cusps Details':
                setModalData({ title: value, data: kundliKPCuspsDetailData });
                break;

            case 'KP Planet Significators':
                setModalData({ title: value, data: kundliKpPlanetSignificatorData });
                break;

            case 'KP House Significators':
                setModalData({ title: value, data: kundliKpHouseSignificatorData });
                break;

            case 'KP Ruling Planets':
                setModalData({ title: value, data: kundliKpRulingPlanetData });
                break;

            case 'KP Ruling Planets':
                setModalData({ title: value, data: kundliKpRulingPlanetData });
                break;

            case 'KP Birth Chart':
                setModalData({ title: value, data: kundliKpBirthChartData });
                break;

            case 'KP Cusps Chart':
                setModalData({ title: value, data: kundliKPCuspsChartData });
                break;

            case 'Planetary Position':
                setModalData({ title: value, data: kundliPlanetaryPositionData });
                break;

            case 'Upgraha':
                setModalData({ title: value, data: kundliUpgrahaData });
                break;

            case 'Dasham Bhav Madhya':
                setModalData({ title: value, data: kundliDashamBhavMadhyaData });
                break;

            case 'Ashtak Varga':
                setModalData({ title: value, data: kundliAshtakVargaData });
                break;

            case 'Sarvashtak':
                setModalData({ title: value, data: kundliSarvashtakData });
                break;

            case 'Vimshottari Dasha':
                setModalData({ title: value, data: kundliVimshottariDashaData });
                break;

            case 'Yogini Dasha':
                setModalData({ title: value, data: kundliYoginiDashaData });
                break;

            case 'Jaimini Details':
                setModalData({ title: value, data: kundliJaiminiDetailsData });
                break;

            case 'Char Dasha':
                setModalData({ title: value, data: kundliCharDashaData });
                break;

            case 'Numerology Details':
                setModalData({ title: value, data: kundliNumerologyDetailsData });
                break;

            case 'Mangal Dosha':
                setModalData({ title: value, data: kundliMangalDoshaData });
                break;

            case 'Kaalsarp Dosha':
                setModalData({ title: value, data: kundliKaalsarpDoshaData });
                break;

            case 'Pitri Dosha':
                setModalData({ title: value, data: kundliPitriDoshaData });
                break;

            case 'Sadhe Sati':
                setModalData({ title: value, data: kundliSadheSatiData });
                break;

            case 'Ascendant Prediction':
                setModalData({ title: value, data: kundliPredictionData });
                break;

            case 'Sign Prediction':
                setModalData({ title: value, data: kundliPredictionData });
                break;

            case 'Planet Consideration':
                setModalData({ title: value, data: kundliPredictionData });
                break;

            case 'Bhav Prediction':
                setModalData({ title: value, data: kundliPredictionData });
                break;

            case 'Nakshatra Prediction':
                setModalData({ title: value, data: kundliPredictionData });
                break;

            case 'Lagna Chart':
                setModalData({ title: value, data: kundliLagnaChartData });
                break;

            case 'Moon Chart':
                setModalData({ title: value, data: kundliMoonChartData });
                break;

            case 'Sun Chart':
                setModalData({ title: value, data: kundliSunChartData });
                break;

            case 'Chalit Chart':
                setModalData({ title: value, data: kundliChalitChartData });
                break;

            case 'Hora Chart':
                setModalData({ title: value, data: kundliHoraChartData });
                break;

            case 'Dreshkan Chart':
                setModalData({ title: value, data: kundliDreshkanChartData });
                break;

            case 'Navamansha Chart':
                setModalData({ title: value, data: kundliNavamanshaChartData });
                break;

            case 'Dashamansha Chart':
                setModalData({ title: value, data: kundliDashamanshaChartData });
                break;

            case 'Dwadasmansha Chart':
                setModalData({ title: value, data: kundliDwadasmanshaChartData });
                break;

            case 'Trishamansha Chart':
                setModalData({ title: value, data: kundliTrishamanshaChartData });
                break;

            case 'Shashtymansha Chart':
                setModalData({ title: value, data: kundliShashtymanshaChartData });
                break;

            default:
                setModalData({ title: 'default', data: {} });
                break;
        }
    }

    return (
        <>
            <section className='space-y-3'>
                <div className='bg-white p-3 rounded-b-[3px] text-black font-semibold text-lg'>View kundli</div>

                <div className='bg-white p-3 rounded-t-[3px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                    {chartHead?.map((value, index) => <div onClick={() => handleChartHeadClick(value)} key={index} className='break-words rounded-[3px] cursor-pointer flex items-center justify-center border text-center border-secondary p-5'>{value}</div>)}
                </div>
            </section>

            <KundliModal modalData={modalData} visible={visible} handleVisible={handleVisible} />
        </>
    )
}

export default Kundli;