import * as actionTypes from "../action-types";

const initialState = {
    //! Horoscope
    dailyHoroscopeData: null,
    monthlyHoroscopeData: null,
    horoscopeData: null,
    //! Kundli Matching
    kundliMatchingBirthDetailsData: null,
    kundliMatchingAstroDetailsData: null,
    kundliMatchingDashakootPointsDetailsData: null,
    kundliMatchingAshtakootPointsDetailsData: null,
    kundliMatchingManglikReportDetailsData: null,
    AsthakootaData: null,
    AstroData: null,

    //! Panchang & Muhurat
    panchangData: null,
    horaMuhuratData: null,
    chaughadiyaDetailsData: null,
    lagnaTableData: null,
};

const astrologyApiReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        //! Horoscope
        case actionTypes.SET_DAILY_HOROSCOPE:
            return { ...state, dailyHoroscopeData: payload };

        case actionTypes.SET_HOROSCOPE:
            return { ...state, horoscopeData: payload };

        case actionTypes.SET_MONTHLY_HOROSCOPE:
            return { ...state, monthlyHoroscopeData: payload };

        //! Kundli Matching
        case actionTypes.SET_KUNDLI_MATCHING_BIRTH_DETAILS:
            return { ...state, kundliMatchingBirthDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_ASTRO_DETAILS:
            return { ...state, kundliMatchingAstroDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS:
            return { ...state, kundliMatchingDashakootPointsDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS:
            return { ...state, kundliMatchingAshtakootPointsDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS:
            return { ...state, kundliMatchingManglikReportDetailsData: payload };

        case actionTypes.SET_ASTHAKOOTA:
            return { ...state, AsthakootaData: payload };

        case actionTypes.SET_ASTRO_DATA:
            return { ...state, AstroData: payload };

        //! Panchang & Muhurat
        case actionTypes.SET_PANCHANG:
            return { ...state, panchangData: action.payload };

        case actionTypes.SET_HORA_MUHURAT:
            return { ...state, horaMuhuratData: action.payload };

        case actionTypes.SET_CHAUGHADIYA_DETAILS:
            return { ...state, chaughadiyaDetailsData: action.payload };

        case actionTypes.SET_LAGNA_TABLE:
            return { ...state, lagnaTableData: action.payload };

        default:
            return state;
    }
};

export default astrologyApiReducer;