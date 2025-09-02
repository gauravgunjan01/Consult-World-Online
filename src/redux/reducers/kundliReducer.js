import * as actionTypes from "../action-types";

const initialState = {
    kundliData: [],
    kundliBirthDetailData: null,
    kundliAstroDetailData: null,
    kundliSetFriendShipTableData: null,
    kundliKPBirthDetailData: null,
    kundliKPPlanetaryPositionData: null,
    kundliKPCuspsDetailData: null,
    kundliKpPlanetSignificatorData: null,
    kundliKpHouseSignificatorData: null,
    kundliKpRulingPlanetData: null,
    kundliKpBirthChartData: null,
    kundliKpCuspsChartData: null,
    kundliPlanetaryPositionData: null,
    kundliUpgrahaData: null,
    kundliDashamBhavMadhyaData: null,
    kundliAshtakVargaData: [],
    kundliSarvashtakData: [],
    kundliVimshottariDashaData: [],
    kundliVimshottariCurrentDashaData: [],
    kundliYoginiDashaData: [],
    kundliYoginiCurrentDashaData: [],
    kundliJaiminiDetailsData: null,
    kundliCharDashaData: [],
    kundliCharCurrentDashaData: [],
    kundliNumerologyDetailsData: null,
    kundliMangalDoshaData: null,
    kundliKaalsarpDoshaData: null,
    kundliSadheSatiData: null,
    kundliPredictionData: null,
    kundliLagnaChartData: null,
    kundliMoonChartData: null,
    kundliSunChartData: null,
    kundliChalitChartData: null,
    kundliHoraChartData: null,
    kundliDreshkanChartData: null,
    kundliNavamanshaChartData: null,
    kundliDashamanshaChartData: null,
    kundliDwadasmanshaChartData: null,
    kundliTrishamanshaChartData: null,
    kundliShashtymanshaChartData: null
};

const kundliReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_KUNDLI:
            return { ...state, kundliData: payload };

        case actionTypes.KUNDLI_SET_BIRTH_DETAIL:
            return { ...state, kundliBirthDetailData: payload };

        case actionTypes.KUNDLI_SET_ASTRO_DETAIL:
            return { ...state, kundliAstroDetailData: payload };

        case actionTypes.KUNDLI_SET_FRIEND_SHIP_TABLE:
            return { ...state, kundliSetFriendShipTableData: payload };

        case actionTypes.KUNDLI_SET_KP_BIRTH_DETAIL:
            return { ...state, kundliKPBirthDetailData: payload };

        case actionTypes.KUNDLI_SET_KP_PLANETARY_POSITION:
            return { ...state, kundliKPPlanetaryPositionData: payload };

        case actionTypes.KUNDLI_SET_KP_CUSPS_DETAIL:
            return { ...state, kundliKPCuspsDetailData: payload };

        case actionTypes.KUNDLI_SET_KP_PLANET_SIGNIFICATOR:
            return { ...state, kundliKpPlanetSignificatorData: payload };

        case actionTypes.KUNDLI_SET_KP_HOUSE_SIGNIFICATOR:
            return { ...state, kundliKpHouseSignificatorData: payload };

        case actionTypes.KUNDLI_SET_KP_RULING_PLANET:
            return { ...state, kundliKpRulingPlanetData: payload };

        case actionTypes.KUNDLI_SET_KP_BIRTH_CHART:
            return { ...state, kundliKpBirthChartData: payload };

        case actionTypes.KUNDLI_SET_KP_CUSPS_CHART:
            return { ...state, kundliKPCuspsChartData: payload };

        case actionTypes.KUNDLI_SET_PLANETARY_POSITION:
            return { ...state, kundliPlanetaryPositionData: payload };

        case actionTypes.KUNDLI_SET_UPGRAHA:
            return { ...state, kundliUpgrahaData: payload };

        case actionTypes.KUNDLI_SET_DASHAM_BHAV_MADHYA:
            return { ...state, kundliDashamBhavMadhyaData: payload };

        case actionTypes.KUNDLI_SET_ASHTAK_VARGA:
            return { ...state, kundliAshtakVargaData: payload };

        case actionTypes.KUNDLI_SET_SARVASHTAK:
            return { ...state, kundliSarvashtakData: payload };

        case actionTypes.KUNDLI_SET_VIMSHOTTARI_DASHA:
            return { ...state, kundliVimshottariDashaData: payload };

        case actionTypes.KUNDLI_SET_VIMSHOTTARI_CURRENT_DASHA:
            return { ...state, kundliVimshottariCurrentDashaData: payload };

        case actionTypes.KUNDLI_SET_YOGINI_DASHA:
            return { ...state, kundliYoginiDashaData: payload };

        case actionTypes.KUNDLI_SET_YOGINI_CURRENT_DASHA:
            return { ...state, kundliYoginiCurrentDashaData: payload };

        case actionTypes.KUNDLI_SET_JAIMINI_DETAILS:
            return { ...state, kundliJaiminiDetailsData: payload };


        case actionTypes.KUNDLI_SET_CHAR_DASHA:
            return { ...state, kundliCharDashaData: payload };

        case actionTypes.KUNDLI_SET_CHAR_CURRENT_DASHA:
            return { ...state, kundliCharCurrentDashaData: payload };

        case actionTypes.KUNDLI_SET_NUMEROLOGY_DETAILS:
            return { ...state, kundliNumerologyDetailsData: payload };

        case actionTypes.KUNDLI_SET_MANGAL_DOSHA:
            return { ...state, kundliMangalDoshaData: payload };

        case actionTypes.KUNDLI_SET_KAALSARP_DOSHA:
            return { ...state, kundliKaalsarpDoshaData: payload };

        case actionTypes.KUNDLI_SET_PITRI_DOSHA:
            return { ...state, kundliPitriDoshaData: payload };

        case actionTypes.KUNDLI_SET_SADHE_SATI:
            return { ...state, kundliSadheSatiData: payload };

        case actionTypes.KUNDLI_SET_PREDICTION:
            return { ...state, kundliPredictionData: payload };

        case actionTypes.KUNDLI_SET_LAGNA_CHART:
            return { ...state, kundliLagnaChartData: payload };

        case actionTypes.KUNDLI_SET_MOON_CHART:
            return { ...state, kundliMoonChartData: payload };

        case actionTypes.KUNDLI_SET_SUN_CHART:
            return { ...state, kundliSunChartData: payload };

        case actionTypes.KUNDLI_SET_CHALIT_CHART:
            return { ...state, kundliChalitChartData: payload };

        case actionTypes.KUNDLI_SET_HORA_CHART:
            return { ...state, kundliHoraChartData: payload };

        case actionTypes.KUNDLI_SET_DRESHKAN_CHART:
            return { ...state, kundliDreshkanChartData: payload };

        case actionTypes.KUNDLI_SET_NAVAMANSHA_CHART:
            return { ...state, kundliNavamanshaChartData: payload };

        case actionTypes.KUNDLI_SET_DASHAMANSHA_CHART:
            return { ...state, kundliDashamanshaChartData: payload };

        case actionTypes.KUNDLI_SET_DWADASMANSHA_CHART:
            return { ...state, kundliDwadasmanshaChartData: payload };

        case actionTypes.KUNDLI_SET_TRISHAMANSHA_CHART:
            return { ...state, kundliTrishamanshaChartData: payload };

        case actionTypes.KUNDLI_SET_SHASHTYMANSHA_CHART:
            return { ...state, kundliShashtymanshaChartData: payload };

        default: {
            return state;
        }
    }
};

export default kundliReducer;