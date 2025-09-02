import * as actionTypes from "../action-types";

//! Horoscope
export const getDailyHoroscope = payload => ({
    type: actionTypes.GET_DAILY_HOROSCOPE, payload
});

export const setDailyHoroscope = payload => ({
    type: actionTypes.SET_DAILY_HOROSCOPE, payload
});

export const getMonthlyHoroscope = payload => ({
    type: actionTypes.GET_MONTHLY_HOROSCOPE, payload
});

export const setMonthlyHoroscope = payload => ({
    type: actionTypes.SET_MONTHLY_HOROSCOPE, payload
});

export const getHoroscope = payload => ({
    type: actionTypes.GET_HOROSCOPE, payload
});

export const setHoroscope = payload => ({
    type: actionTypes.SET_HOROSCOPE, payload
});

//! Kundli Matching
export const getKundliMatchingBirthDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_BIRTH_DETAILS,
    payload
});

export const setKundliMatchingBirthDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_BIRTH_DETAILS,
    payload
});

export const getKundliMatchingAstroDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_ASTRO_DETAILS,
    payload
});

export const setKundliMatchingAstroDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_ASTRO_DETAILS,
    payload
});

export const getKundliMatchingAshtakootPointsDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS,
    payload
});

export const setKundliMatchingAshtakootPointsDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS,
    payload
});

export const getKundliMatchingDashakootPointsDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS,
    payload
});

export const setKundliMatchingDashakootPointsDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS,
    payload
});

export const getKundliMatchingManglikReportDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS,
    payload
});

export const setKundliMatchingManglikReportDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS,
    payload
});

export const getAsthaKoota = payload => ({
    type: actionTypes.GET_ASTHAKOOTA, payload
});

export const setAsthaKoota = payload => ({
    type: actionTypes.SET_ASTHAKOOTA, payload
});

export const getAstroData = payload => ({
    type: actionTypes.GET_ASTRO_DATA, payload
});

export const setAstroData = payload => ({
    type: actionTypes.SET_ASTRO_DATA, payload
});

//! Panchang & Muhurat
export const getPanchang = payload => ({ type: actionTypes.GET_PANCHANG, payload });
export const setPanchang = payload => ({ type: actionTypes.SET_PANCHANG, payload });

export const getHoraMuhurat = payload => ({ type: actionTypes.GET_HORA_MUHURAT, payload });
export const setHoraMuhurat = payload => ({ type: actionTypes.SET_HORA_MUHURAT, payload });

export const getChaughadiyaDetails = payload => ({ type: actionTypes.GET_CHAUGHADIYA_DETAILS, payload });
export const setChaughadiyaDetails = payload => ({ type: actionTypes.SET_CHAUGHADIYA_DETAILS, payload });

export const getLagnaTable = payload => ({ type: actionTypes.GET_LAGNA_TABLE, payload });
export const setLagnaTable = payload => ({ type: actionTypes.SET_LAGNA_TABLE, payload });