import * as actionTypes from "../action-types";
import axios from "axios";
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import { AstrologyAPIRequest, AstrologyAPINewRequest, kundliRequest } from '../../utils/api-function';
import { toaster } from '../../utils/services/toast-service';
import { get_daily_horoscope, get_daily_tomorrow_horoscope, get_daily_yesterday_horoscope, get_kundli_matching_ashtakoot_points_details, get_kundli_matching_astro_details, get_kundli_matching_birth_details, get_kundli_matching_dashakoot_points_details, get_kundli_matching_manglik_report_details, get_monthly_horoscope, get_horoscope, get_asthakoota, get_astro_data } from '../../utils/api-routes';

//! Horoscope 
function* getDailyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Daily Horoscope Payload ::: ", payload);

        if (payload?.day == 'today') {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(100);
            const data = yield AstrologyAPIRequest(get_daily_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Today ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        } else if (payload?.day == 'tomorrow') {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(100);
            const data = yield AstrologyAPIRequest(get_daily_tomorrow_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Tomorrow ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(100);
            const data = yield AstrologyAPIRequest(get_daily_yesterday_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Yesterday ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Daily Horoscope Saga Error :::', error?.error);
    }
};



function* getMonthlyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Monthly Horoscope Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_monthly_horoscope(payload));
        console.log('Get Monthly Horoscope Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_MONTHLY_HOROSCOPE, payload: data });
        else toaster?.warning({ text: data?.error });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Monthly Horoscope Saga Error :::', error?.error);
    }
};


//! Kundli Matching
function* getKundliMatchingBirthDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Birth Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_birth_details, payload);
        console.log('Get Kundli Matching Birth Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_BIRTH_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Birth Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingAstroDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Astro Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_astro_details, payload);
        console.log('Get Kundli Matching Astro Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_ASTRO_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Astro Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingAshtakootPointsDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Ashtakoot Points Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_ashtakoot_points_details, payload);
        console.log('Get Kundli Matching Ashtakoot Points Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Ashtakoot Points Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingDashakootPointsDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Dashakoot Points Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_dashakoot_points_details, payload);
        console.log('Get Kundli Matching Dashakoot Points Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Dashakoot Points Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingManglikReportDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Manglik Report Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_manglik_report_details, payload);
        console.log('Get Kundli Matching Manglik Report Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS, payload: data });
        else toaster?.warning({ text: data?.msg || data?.error || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Manglik Report Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};




// New api saga for horoscope

// Worker saga for fetching horoscope
export function* getHoroscope(action) {
    try {
        const { payload } = action; // Action payload contains the zodiac sign
        console.log("Get Horoscope Payload ::: ", payload);

        // Show loading spinner
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        // Delay to simulate network latency (optional)
        yield delay(100);

        // Make API request using a POST method with the zodiac sign
        const data = yield AstrologyAPINewRequest(get_horoscope, payload);
        console.log('Horoscope API Response ::: ', data);

        // Check if response is successful
        if (data?.success && data?.responseData?.status) {
            // Extract the horoscope data from the response
            const horoscopeData = data?.responseData?.data[0]?.horoscope;

            // Dispatch the action to store horoscope data in Redux state
            yield put({
                type: actionTypes.SET_HOROSCOPE,
                payload: {
                    daily: horoscopeData.daily,
                    weekly: horoscopeData.weekly,
                    monthly: horoscopeData.monthly,
                    yearly: horoscopeData.yearly,
                    tags: {
                        daily: horoscopeData?.dailytag,
                        weekly: horoscopeData?.weeklytag,
                        monthly: horoscopeData?.monthlytag,
                        yearly: horoscopeData?.yearlytag
                    }
                }
            });

        } else {
            // Handle error if response status is false
            toaster?.warning({ text: data?.responseData?.message || "Failed to fetch horoscope data!" });
        }

        // Hide loading spinner
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        // Handle errors gracefully
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Horoscope Saga Error :::', error);
        toaster?.error({ text: error.message || 'Something went wrong!' });
    }
}





export function* getAsthaKoota(action) {
    try {
        const { payload } = action; // Action payload contains the zodiac sign
        console.log("Get Horoscope Payload ::: ", payload);

        // Show loading spinner
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        // Delay to simulate network latency (optional)
        yield delay(100);

        // Make API request using a POST method with the zodiac sign
        const data = yield AstrologyAPINewRequest(get_asthakoota, payload);
        console.log('AsthaKoota API Response ::: ', data);

        // Check if response is successful
        if (data?.success && data?.responseData?.status) {
            const asthakootaData = data?.responseData?.data[0];
            yield put({
                type: actionTypes.SET_ASTHAKOOTA,
                payload: asthakootaData
            })

        } else {
            // Handle error if response status is false
            toaster?.warning({ text: data?.responseData?.message || "Failed to fetch horoscope data!" });
        }

        // Hide loading spinner
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        // Handle errors gracefully
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Horoscope Saga Error :::', error);
        toaster?.error({ text: error.message || 'Something went wrong!' });
    }
}



export function* getAstroData(action) {
    try {
        const { payload } = action; // Action payload contains the zodiac sign
        console.log("Get AstroData Payload ::: ", payload);

        // Show loading spinner
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        // Delay to simulate network latency (optional)
        yield delay(100);

        // Make API request using a POST method with the zodiac sign
        const data = yield AstrologyAPINewRequest(get_astro_data, payload);
        console.log('Astro Data API Response ::: ', data);

        // Check if response is successful
        if (data?.success && data?.responseData?.status) {
            const astroData = data?.responseData?.data[0];
            // Dispatch the action to store horoscope data in Redux state
            yield put({
                type: actionTypes.SET_ASTRO_DATA,
                payload: astroData
            });

        } else {
            // Handle error if response status is false
            toaster?.warning({ text: data?.responseData?.message || "Failed to fetch horoscope data!" });
        }

        // Hide loading spinner
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        // Handle errors gracefully
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Horoscope Saga Error :::', error);
        toaster?.error({ text: error.message || 'Something went wrong!' });
    }
};

function* getPanchang(action) {
    try {
        const { payload } = action;

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/panchang/get_panchang', payload);
        console.log("Get Panchang Saga Response :::", data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.SET_PANCHANG, payload: data?.responseData?.data[0]?.panchang });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getHoraMuhurat(action) {
    try {
        const { payload } = action;

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/panchang/get_hora_muhurta', payload);
        console.log("Get Hora Muhurat Saga Response :::", data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.SET_HORA_MUHURAT, payload: data?.responseData?.data[0] });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getChaughadiyaDetails(action) {
    try {
        const { payload } = action;

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/panchang/get_choghadiya_data', payload);
        console.log("Get Chaughadiya Details Saga Response :::", data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.SET_CHAUGHADIYA_DETAILS, payload: data?.responseData?.data[0] });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getLagnaTable(action) {
    try {
        const { payload } = action;

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/panchang/get_lagan_table  ', payload);
        console.log("Get Lagna Table Saga Response :::", data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.SET_LAGNA_TABLE, payload: data?.responseData?.data[0]?.lagantable });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

export default function* astrologyApiSaga() {
    //! Horoscope 
    yield takeLeading(actionTypes?.GET_DAILY_HOROSCOPE, getDailyHoroscope);
    yield takeLeading(actionTypes?.GET_MONTHLY_HOROSCOPE, getMonthlyHoroscope);
    yield takeLeading(actionTypes?.GET_HOROSCOPE, getHoroscope);
    //! Kundli Matching
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_BIRTH_DETAILS, getKundliMatchingBirthDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_ASTRO_DETAILS, getKundliMatchingAstroDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS, getKundliMatchingAshtakootPointsDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS, getKundliMatchingDashakootPointsDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS, getKundliMatchingManglikReportDetails);
    yield takeLeading(actionTypes.GET_ASTHAKOOTA, getAsthaKoota);
    yield takeLeading(actionTypes.GET_ASTRO_DATA, getAstroData);

    //! Panchang & Muhurat
    yield takeLeading(actionTypes.GET_PANCHANG, getPanchang);
    yield takeLeading(actionTypes.GET_HORA_MUHURAT, getHoraMuhurat);
    yield takeLeading(actionTypes.GET_CHAUGHADIYA_DETAILS, getChaughadiyaDetails);
    yield takeLeading(actionTypes.GET_LAGNA_TABLE, getLagnaTable);
};