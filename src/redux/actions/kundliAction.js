import * as actionTypes from "../action-types";

export const getKundli = (payload) => ({
    type: actionTypes.GET_KUNDLI, payload
});

export const setKundli = (payload) => ({
    type: actionTypes.SET_KUNDLI, payload
});

export const createKundli = (payload) => ({
    type: actionTypes.CREATE_KUNDLI, payload
});

export const deleteKundli = (payload) => ({
    type: actionTypes.DELETE_KUNDLI, payload
});

export const kundliGetBirthDetail = (payload) => ({
    type: actionTypes.KUNDLI_GET_BIRTH_DETAIL, payload
});

export const kundliSetBirthDetail = (payload) => ({
    type: actionTypes.KUNDLI_SET_BIRTH_DETAIL, payload
});

export const kundliGetAstroDetail = (payload) => ({
    type: actionTypes.KUNDLI_GET_ASTRO_DETAIL, payload
});

export const kundliSetAstroDetail = (payload) => ({
    type: actionTypes.KUNDLI_SET_ASTRO_DETAIL, payload
});

export const kundliGetFriendShipTable = (payload) => ({
    type: actionTypes.KUNDLI_GET_FRIEND_SHIP_TABLE, payload
});

export const kundliSetFriendShipTable = (payload) => ({
    type: actionTypes.KUNDLI_SET_FRIEND_SHIP_TABLE, payload
});

export const kundliGetKpBirthDetail = payload => ({
    type: actionTypes.KUNDLI_GET_KP_BIRTH_DETAIL, payload
});

export const kundliSetKpBirthDetail = payload => ({
    type: actionTypes.KUNDLI_SET_KP_BIRTH_DETAIL, payload
});

export const kundliGetKpPlanetaryPosition = payload => ({
    type: actionTypes.KUNDLI_GET_KP_PLANETARY_POSITION, payload
});

export const kundliSetKpPlanetaryPosition = payload => ({
    type: actionTypes.KUNDLI_SET_KP_PLANETARY_POSITION, payload
});

export const kundliGetKpCuspsDetail = payload => ({
    type: actionTypes.KUNDLI_GET_KP_CUSPS_DETAIL, payload
});

export const kundliSetKpCuspsDetail = payload => ({
    type: actionTypes.KUNDLI_SET_KP_CUSPS_DETAIL, payload
});

export const kundliGetKpBirthChart = payload => ({
    type: actionTypes.KUNDLI_GET_KP_BIRTH_CHART, payload
});

export const kundliSetKpBirthChart = payload => ({
    type: actionTypes.KUNDLI_SET_KP_BIRTH_CHART, payload
});

export const kundliGetKpCuspsChart = payload => ({
    type: actionTypes.KUNDLI_GET_KP_CUSPS_CHART, payload
});

export const kundliSetKpCuspsChart = payload => ({
    type: actionTypes.KUNDLI_SET_KP_CUSPS_CHART, payload
});

export const kundliGetKpPlanetSignificator = payload => ({
    type: actionTypes.KUNDLI_GET_KP_PLANET_SIGNIFICATOR, payload
});

export const kundliSetKpPlanetSignificator = payload => ({
    type: actionTypes.KUNDLI_SET_KP_PLANET_SIGNIFICATOR, payload
});

export const kundliGetKpHouseSignificator = payload => ({
    type: actionTypes.KUNDLI_GET_KP_HOUSE_SIGNIFICATOR, payload
});

export const kundliSetKpHouseSignificator = payload => ({
    type: actionTypes.KUNDLI_SET_KP_HOUSE_SIGNIFICATOR, payload
});

export const kundliGetKpRulingPlanet = payload => ({
    type: actionTypes.KUNDLI_GET_KP_RULING_PLANET, payload
});

export const kundliSetKpRulingPlanet = payload => ({
    type: actionTypes.KUNDLI_SET_KP_RULING_PLANET, payload
});

export const kundliSetPlanetaryPosition = payload => ({
    type: actionTypes.KUNDLI_SET_PLANETARY_POSITION, payload
});

export const kundliGetPlanetaryPosition = payload => ({
    type: actionTypes.KUNDLI_GET_PLANETARY_POSITION, payload
});

export const kundliSetUpgraha = payload => ({
    type: actionTypes.KUNDLI_SET_UPGRAHA, payload
});

export const kundliGetUpgraha = payload => ({
    type: actionTypes.KUNDLI_GET_UPGRAHA, payload
});

export const kundliSetDashamBhavMadhya = payload => ({
    type: actionTypes.KUNDLI_SET_DASHAM_BHAV_MADHYA, payload
});

export const kundliGetDashamBhavMadhya = payload => ({
    type: actionTypes.KUNDLI_GET_DASHAM_BHAV_MADHYA, payload
});

export const kundliSetAshtakVarga = payload => ({
    type: actionTypes.KUNDLI_SET_ASHTAK_VARGA, payload
});

export const kundliGetAshtakVarga = payload => ({
    type: actionTypes.KUNDLI_GET_ASHTAK_VARGA, payload
});

export const kundliSetSarvashtak = payload => ({
    type: actionTypes.KUNDLI_SET_SARVASHTAK, payload
});

export const kundliGetSarvashtak = payload => ({
    type: actionTypes.KUNDLI_GET_SARVASHTAK, payload
});

export const kundliSetVimshottariDasha = payload => ({
    type: actionTypes.KUNDLI_SET_VIMSHOTTARI_DASHA, payload
});

export const kundliGetVimshottariDasha = payload => ({
    type: actionTypes.KUNDLI_GET_VIMSHOTTARI_DASHA, payload
});

export const kundliSetVimshottariCurrentDasha = payload => ({
    type: actionTypes.KUNDLI_SET_VIMSHOTTARI_CURRENT_DASHA, payload
});

export const kundliGetVimshottariCurrentDasha = payload => ({
    type: actionTypes.KUNDLI_GET_VIMSHOTTARI_CURRENT_DASHA, payload
});

export const kundliSetYoginiDasha = payload => ({
    type: actionTypes.KUNDLI_SET_YOGINI_DASHA, payload
});

export const kundliGetYoginiDasha = payload => ({
    type: actionTypes.KUNDLI_GET_YOGINI_DASHA, payload
});

export const kundliSetYoginiCurrentDasha = payload => ({
    type: actionTypes.KUNDLI_SET_YOGINI_CURRENT_DASHA, payload
});

export const kundliGetYoginiCurrentDasha = payload => ({
    type: actionTypes.KUNDLI_GET_YOGINI_CURRENT_DASHA, payload
});

export const kundliSetJaiminiDetails = payload => ({
    type: actionTypes.KUNDLI_SET_JAIMINI_DETAILS, payload
});

export const kundliGetJaiminiDetails = payload => ({
    type: actionTypes.KUNDLI_GET_JAIMINI_DETAILS, payload
});

export const kundliSetCharDasha = payload => ({
    type: actionTypes.KUNDLI_SET_CHAR_DASHA, payload
});

export const kundliGetCharDasha = payload => ({
    type: actionTypes.KUNDLI_GET_CHAR_DASHA, payload
});

export const kundliSetCharCurrentDasha = payload => ({
    type: actionTypes.KUNDLI_SET_CHAR_CURRENT_DASHA, payload
});

export const kundliGetCharCurrentDasha = payload => ({
    type: actionTypes.KUNDLI_GET_CHAR_CURRENT_DASHA, payload
});

export const kundliSetNumerologyDetails = payload => ({
    type: actionTypes.KUNDLI_SET_NUMEROLOGY_DETAILS, payload
});

export const kundliGetNumerologyDetails = payload => ({
    type: actionTypes.KUNDLI_GET_NUMEROLOGY_DETAILS, payload
});

export const kundliSetMangalDosha = payload => ({
    type: actionTypes.KUNDLI_SET_MANGAL_DOSHA, payload
});

export const kundliGetMangalDosha = payload => ({
    type: actionTypes.KUNDLI_GET_MANGAL_DOSHA, payload
});

export const kundliSetKaalsarpDosha = payload => ({
    type: actionTypes.KUNDLI_SET_KAALSARP_DOSHA, payload
});

export const kundliGetKaalsarpDosha = payload => ({
    type: actionTypes.KUNDLI_GET_KAALSARP_DOSHA, payload
});

export const kundliSetPitripDosha = payload => ({
    type: actionTypes.KUNDLI_SET_PITRI_DOSHA, payload
});

export const kundliGetPitriDosha = payload => ({
    type: actionTypes.KUNDLI_GET_PITRI_DOSHA, payload
});

export const kundliSetSadheSati = payload => ({
    type: actionTypes.KUNDLI_SET_SADHE_SATI, payload
});

export const kundliGetSadheSati = payload => ({
    type: actionTypes.KUNDLI_GET_SADHE_SATI, payload
});

export const kundliSetPrediction = payload => ({
    type: actionTypes.KUNDLI_SET_PREDICTION, payload
});

export const kundliGetPrediction = payload => ({
    type: actionTypes.KUNDLI_GET_PREDICTION, payload
});

export const kundliGetLagnaChart = payload => ({
    type: actionTypes.KUNDLI_GET_LAGNA_CHART, payload
});

export const kundliSetLagnaChart = payload => ({
    type: actionTypes.KUNDLI_SET_LAGNA_CHART, payload
});

export const kundliGetMoonChart = payload => ({
    type: actionTypes.KUNDLI_GET_MOON_CHART, payload
});

export const kundliSetMoonChart = payload => ({
    type: actionTypes.KUNDLI_SET_MOON_CHART, payload
});

export const kundliGetSunChart = payload => ({
    type: actionTypes.KUNDLI_GET_SUN_CHART, payload
});

export const kundliSetSunChart = payload => ({
    type: actionTypes.KUNDLI_SET_SUN_CHART, payload
});

export const kundliGetChalitChart = payload => ({
    type: actionTypes.KUNDLI_GET_CHALIT_CHART, payload
});

export const kundliSetChalitChart = payload => ({
    type: actionTypes.KUNDLI_SET_CHALIT_CHART, payload
});

export const kundliGetHoraChart = payload => ({
    type: actionTypes.KUNDLI_GET_HORA_CHART, payload
});

export const kundliSetHoraChart = payload => ({
    type: actionTypes.KUNDLI_SET_HORA_CHART, payload
});

export const kundliGetDreshkanChart = payload => ({
    type: actionTypes.KUNDLI_GET_DRESHKAN_CHART, payload
});

export const kundliSetDreshkanChart = payload => ({
    type: actionTypes.KUNDLI_SET_DRESHKAN_CHART, payload
});

export const kundliGetNavamanshaChart = payload => ({
    type: actionTypes.KUNDLI_GET_NAVAMANSHA_CHART, payload
});

export const kundliSetNavamanshaChart = payload => ({
    type: actionTypes.KUNDLI_SET_NAVAMANSHA_CHART, payload
});

export const kundliGetDashamanshaChart = payload => ({
    type: actionTypes.KUNDLI_GET_DASHAMANSHA_CHART, payload
});

export const kundliSetDashamanshaChart = payload => ({
    type: actionTypes.KUNDLI_SET_DASHAMANSHA_CHART, payload
});

export const kundliGetDwadasmanshaChart = payload => ({
    type: actionTypes.KUNDLI_GET_DWADASMANSHA_CHART, payload
});

export const kundliSetDwadasmanshaChart = payload => ({
    type: actionTypes.KUNDLI_SET_DWADASMANSHA_CHART, payload
});

export const kundliGetTrishamanshaChart = payload => ({
    type: actionTypes.KUNDLI_GET_TRISHAMANSHA_CHART, payload
});

export const kundliSetTrishamanshaChart = payload => ({
    type: actionTypes.KUNDLI_SET_TRISHAMANSHA_CHART, payload
});

export const kundliGetShashtymanshaChart = payload => ({
    type: actionTypes.KUNDLI_GET_SHASHTYMANSHA_CHART, payload
});

export const kundliSetShashtymanshaChart = payload => ({
    type: actionTypes.KUNDLI_SET_SHASHTYMANSHA_CHART, payload
});