import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { getAPI, kundliRequest, postAPI } from '../../utils/api-function';

function* getKundli(action) {
    try {
        const { payload } = action;
        console.log("Create Kundli Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const { data } = yield postAPI('api/kundli/get_customer_kundli', payload);
        console.log('Get Kundli Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_KUNDLI, payload: data?.kundli });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Kundli Saga Error ::: ", error);
    }
}

function* createKundli(action) {
    try {
        const { payload } = action;
        console.log("Create Kundli Payload ::: ", payload);

        const { data } = yield postAPI('api/kundli/add_kundli', payload?.data);
        console.log('Create Kundli Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", text: "Kundli Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.GET_KUNDLI, payload: { customerId: payload?.customerId } });
            payload?.navigate(`/kundli/kundli-details?kundliId=${data?.kundli?._id}&type=free-kundli`);
        }

    } catch (error) {
        Swal.fire({ icon: "error", text: error?.response?.data ? error?.response?.data?.message : 'Failed To Create Kundli', showConfirmButton: true, timer: 2000, });
        console.log("Create Kundli Saga Error ::: ", error);
    }
}

function* deleteKundli(action) {
    try {
        const { payload } = action;
        console.log("Delete Kundli Payload ::: ", payload);

        const { data } = yield postAPI('api/kundli/delete_kundli', { kundliId: payload?.kundliId });
        console.log('Delete Kundli Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.GET_KUNDLI, payload: { customerId: payload?.customerId } });
        }

    } catch (error) {
        console.log("Delete Kundli Saga Error ::: ", error);
    }
}

function* kundliGetBirthDetail(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetBirthDetail Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/astro/get_birth_data', payload);
        // console.log('kundliGetBirthDetail Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_BIRTH_DETAIL, payload: data?.responseData?.data[0]?.birthdata });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetBirthDetail Saga Error ::: ", error);
    }
};

function* kundliGetAstroDetail(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetAstroDetail Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/astro/get_astro_data', payload);
        // console.log('kundliGetAstroDetail Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_ASTRO_DETAIL, payload: data?.responseData?.data[0]?.astrodata });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetAstroDetail Saga Error ::: ", error);
    }
};


function* kundliGetFriendShipTable(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetFriendShipTable Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/astro/get_friendship_data', payload);
        // console.log('kundliGetFriendShipTable Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_FRIEND_SHIP_TABLE, payload: data?.responseData?.data[0] });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetFriendShipTable Saga Error ::: ", error);
    }
};

function* kundliGetKpBirthDetail(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpBirthDetail Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/kp_birth_data', payload);
        // console.log('kundliGetKpBirthDetail Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_BIRTH_DETAIL, payload: data?.responseData?.data[0]?.birthdata });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpBirthDetail Saga Error ::: ", error);
    }
};

function* kundliGetKpPlanetaryPosition(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpPlanetaryPosition Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/get_all_planet_data', payload);
        // console.log('kundliGetKpPlanetaryPosition Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_PLANETARY_POSITION, payload: data?.responseData?.data[0]?.planetData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpPlanetaryPosition Saga Error ::: ", error);
    }
};

function* kundliGetKpCuspsDetail(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpCuspsDetail Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/get_cusps_data', payload);
        // console.log('kundliGetKpCuspsDetail Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_CUSPS_DETAIL, payload: data?.responseData?.data[0]?.cuspsData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpCuspsDetail Saga Error ::: ", error);
    }
};

function* kundliGetKpPlanetSignificator(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpPlanetSignificator Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/get_planet_significators', payload);
        // console.log('kundliGetKpPlanetSignificator Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_PLANET_SIGNIFICATOR, payload: data?.responseData?.data[0]?.planetSignificatorsData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpPlanetSignificator Saga Error ::: ", error);
    }
};

function* kundliGetKpHouseSignificator(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpHouseSignificator Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/get_house_significators', payload);
        // console.log('kundliGetKpHouseSignificator Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_HOUSE_SIGNIFICATOR, payload: data?.responseData?.data[0]?.houseSignificatorsData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpHouseSignificator Saga Error ::: ", error);
    }
};

function* kundliGetKpRulingPlanet(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpRulingPlanet Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/get_ruling_planets', payload);
        // console.log('kundliGetKpRulingPlanet Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_RULING_PLANET, payload: data?.responseData?.data[0]?.rulingPlanetsData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpRulingPlanet Saga Error ::: ", error);
    }
};

function* kundliGetKpBirthChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpBirthChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/get_birth_chart', payload);
        console.log('kundliGetKpBirthChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_BIRTH_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpBirthChart Saga Error ::: ", error);
    }
};

function* kundliGetKpCuspsChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKpCuspsChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/kp/get_cusps_chart', payload);
        console.log('kundliGetKpCuspsChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KP_CUSPS_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKpCuspsChart Saga Error ::: ", error);
    }
};

function* kundliGetPlanetaryPosition(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetPlanetaryPosition Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/planet/get_all_planet_data', payload);
        // console.log('kundliGetPlanetaryPosition Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_PLANETARY_POSITION, payload: data?.responseData?.data[0]?.planetData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetPlanetaryPosition Saga Error ::: ", error);
    }
};


function* kundliGetUpgraha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetUpgraha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/planet/get_all_upgraha_data', payload);
        // console.log('kundliGetUpgraha Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_UPGRAHA, payload: data?.responseData?.data[0]?.upgrahaData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetUpgraha Saga Error ::: ", error);
    }
};


function* kundliGetDashamBhavMadhya(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetDashamBhavMadhya Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/planet/get_dasham_bhav_madhya', payload);
        // console.log('kundliGetDashamBhavMadhya Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_DASHAM_BHAV_MADHYA, payload: data?.responseData?.data[0]?.dashamBhavData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetDashamBhavMadhya Saga Error ::: ", error);
    }
};

function* kundliGetAshtakVarga(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetAshtakVarga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/planet/get_ashtak_varga_data', payload);
        // console.log('kundliGetAshtakVarga Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_ASHTAK_VARGA, payload: data?.responseData?.data[0]?.prastarakListData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetAshtakVarga Saga Error ::: ", error);
    }
};

function* kundliGetSarvashtak(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetSarvashtak Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/planet/get_sarvashtak_data', payload);
        // console.log('kundliGetSarvashtak Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({
                    type: actionTypes.KUNDLI_SET_SARVASHTAK, payload: data?.responseData?.data[0]?.sarvashtakaListData
                });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetSarvashtak Saga Error ::: ", error);
    }
};

function* kundliGetVimshottariDasha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetVimshottariDasha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_maha_dasha', payload);
        // console.log('kundliGetVimshottariDasha Saga Response ::: ', data?.responseData?.data[0]?.vimshottaryMahaDashaData);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_VIMSHOTTARI_DASHA, payload: data?.responseData?.data[0]?.vimshottaryMahaDashaData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetVimshottariDasha Saga Error ::: ", error);
    }
};

function* kundliGetVimshottariCurrentDasha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetVimshottariCurrentDasha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_current_dasha', payload);
        // console.log('kundliGetVimshottariCurrentDasha Saga Response ::: ', data?.responseData?.data[0]?.vimshottaryCurrentDashaData);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_VIMSHOTTARI_CURRENT_DASHA, payload: data?.responseData?.data[0]?.vimshottaryCurrentDashaData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetVimshottariCurrentDasha Saga Error ::: ", error);
    }
};

function* kundliGetYoginiDasha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetYoginiDasha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dasha/get_yogini_maha_dasha', payload);
        // console.log('kundliGetYoginiDasha Saga Response ::: ', data?.responseData?.data[0]?.yoginiMahaDashaData);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_YOGINI_DASHA, payload: data?.responseData?.data[0]?.yoginiMahaDashaData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetYoginiDasha Saga Error ::: ", error);
    }
};

function* kundliGetYoginiCurrentDasha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetYoginiCurrentDasha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dasha/get_yogini_current_dasha', payload);
        // console.log('kundliGetYoginiCurrentDasha Saga Response ::: ', data?.responseData?.data[0]?.yoginiCurrentDashaData);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_YOGINI_CURRENT_DASHA, payload: data?.responseData?.data[0]?.yoginiCurrentDashaData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetYoginiCurrentDasha Saga Error ::: ", error);
    }
};

function* kundliGetJaiminiDetails(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetJaiminiDetails Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/gemini/get_gemini_data', payload);
        // console.log('kundliGetJaiminiDetails Saga Response ::: ', data?.responseData?.data[0]?.karakaPlanetData);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_JAIMINI_DETAILS, payload: data?.responseData?.data[0]?.karakaPlanetData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetJaiminiDetails Saga Error ::: ", error);
    }
};

function* kundliGetCharDasha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetCharDasha Payload ::: ", payload);

        // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/gemini/get_char_dasha_data', payload);
        // console.log('kundliGetCharDasha Saga Response ::: ', data?.responseData?.data[0]?.charDashaData);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_CHAR_DASHA, payload: data?.responseData?.data[0]?.charDashaData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetCharDasha Saga Error ::: ", error);
    }
};

function* kundliGetCharCurrentDasha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetCharCurrentDasha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/gemini/get_current_char_dasha_data', payload);
        // console.log('kundliGetCharCurrentDasha Saga Response ::: ', data?.responseData?.data[0]?.charCurrentDashaData);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_CHAR_CURRENT_DASHA, payload: data?.responseData?.data[0]?.charCurrentDashaData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetCharCurrentDasha Saga Error ::: ", error);
    }
}

function* kundliGetNumerologyDetails(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetNumerologyDetails Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/numerlogy/get_details', payload);
        // console.log('kundliGetNumerologyDetails Saga Response ::: ', data?.responseData?.data[0]?.numerlogy);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_NUMEROLOGY_DETAILS, payload: data?.responseData?.data[0]?.numerlogy });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetCharCurrentDasha Saga Error ::: ", error);
    }
}

function* kundliGetMangalDosha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetMangalDosha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dosha/mangal_dosh_analysis', payload);
        // console.log('kundliGetMangalDosha Saga Response ::: ', data?.responseData?.data[0]);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_MANGAL_DOSHA, payload: data?.responseData?.data[0] });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetMangalDosha Saga Error ::: ", error);
    }
}

function* kundliGetKaalsarpDosha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKaalsarpDosha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dosha/kalsharp_dosh_analysis', payload);
        // console.log('kundliGetKaalsarpDosha Saga Response ::: ', data?.responseData?.data[0]);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_KAALSARP_DOSHA, payload: data?.responseData?.data[0] });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetKaalsarpDosha Saga Error ::: ", error);
    }
}

function* kundliGetPitriDosha(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetPitriDosha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dosha/pitra_dosh_analysis', payload);
        // console.log('kundliGetPitriDosha Saga Response ::: ', data?.responseData?.data[0]);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_PITRI_DOSHA, payload: data?.responseData?.data[0] });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetPitriDosha Saga Error ::: ", error);
    }
}

function* kundliGetSadheSati(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetSadheSati Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/dosha/sadhesati_analysis', payload);
        // console.log('kundliGetSadheSati Saga Response ::: ', data?.responseData?.data[0]);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_SADHE_SATI, payload: data?.responseData?.data[0] });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetSadheSati Saga Error ::: ", error);
    }
}

function* kundliGetPrediction(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetPrediction Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/prediction/get_prediction', payload);
        // console.log('kundliGetPrediction Saga Response ::: ', data?.responseData?.data[0]?.prediction);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_PREDICTION, payload: data?.responseData?.data[0]?.prediction });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetPrediction Saga Error ::: ", error);
    }
};

function* kundliGetLagnaChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetLagnaChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_lagna_chart', payload);
        // console.log('kundliGetLagnaChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_LAGNA_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetLagnaChart Saga Error ::: ", error);
    }
};

function* kundliGetMoonChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetMoonChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_moon_chart', payload);
        // console.log('kundliGetMoonChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_MOON_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetMoonChart Saga Error ::: ", error);
    }
};

function* kundliGetSunChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetSunChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_sun_chart', payload);
        // console.log('kundliGetSunChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_SUN_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetSunChart Saga Error ::: ", error);
    }
};

function* kundliGetChalitChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetChalitChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_chalit_chart', payload);
        // console.log('kundliGetChalitChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_CHALIT_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetChalitChart Saga Error ::: ", error);
    }
};

function* kundliGetHoraChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetHoraChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_hora_chart', payload);
        // console.log('kundliGetHoraChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_HORA_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetHoraChart Saga Error ::: ", error);
    }
};

function* kundliGetDreshkanChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetDreshkanChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_dreshkan_chart', payload);
        // console.log('kundliGetDreshkanChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_DRESHKAN_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetDreshkanChart Saga Error ::: ", error);
    }
};

function* kundliGetNavamanshaChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetNavamanshaChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_navamansha_chart', payload);
        // console.log('kundliGetNavamanshaChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_NAVAMANSHA_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetNavamanshaChart Saga Error ::: ", error);
    }
};

function* kundliGetDashamanshaChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetDashamanshaChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_dashamansha_chart', payload);
        // console.log('kundliGetDashamanshaChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_DASHAMANSHA_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetDashamanshaChart Saga Error ::: ", error);
    }
};

function* kundliSetDwadasmanshaChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliSetDwadasmanshaChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_dwadashamansha_chart', payload);
        // console.log('kundliSetDwadasmanshaChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_DWADASMANSHA_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliSetDwadasmanshaChart Saga Error ::: ", error);
    }
};

function* kundliGetTrishamanshaChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetTrishamanshaChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_trishamansha_chart', payload);
        // console.log('kundliGetTrishamanshaChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_TRISHAMANSHA_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliGetTrishamanshaChart Saga Error ::: ", error);
    }
};

function* kundliSetShashtymanshaChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliSetShashtymanshaChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://kundli2.astrosetalk.com/api/chart/get_shashtymsha_chart', payload);
        // console.log('kundliSetShashtymanshaChart Saga Response ::: ', data);

        if (data?.success) {
            if (data?.responseData?.status) {
                yield put({ type: actionTypes.KUNDLI_SET_SHASHTYMANSHA_CHART, payload: data?.responseData?.data[0]?.chartData });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("kundliSetShashtymanshaChart Saga Error ::: ", error);
    }
};

export default function* kundliSaga() {
    yield takeLeading(actionTypes?.GET_KUNDLI, getKundli);
    yield takeLeading(actionTypes?.CREATE_KUNDLI, createKundli);
    yield takeLeading(actionTypes?.DELETE_KUNDLI, deleteKundli);
    yield takeLeading(actionTypes?.KUNDLI_GET_BIRTH_DETAIL, kundliGetBirthDetail);
    yield takeLeading(actionTypes?.KUNDLI_GET_ASTRO_DETAIL, kundliGetAstroDetail);
    yield takeLeading(actionTypes?.KUNDLI_GET_FRIEND_SHIP_TABLE, kundliGetFriendShipTable);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_BIRTH_DETAIL, kundliGetKpBirthDetail);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_PLANETARY_POSITION, kundliGetKpPlanetaryPosition);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_CUSPS_DETAIL, kundliGetKpCuspsDetail);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_PLANET_SIGNIFICATOR, kundliGetKpPlanetSignificator);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_HOUSE_SIGNIFICATOR, kundliGetKpHouseSignificator);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_RULING_PLANET, kundliGetKpRulingPlanet);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_BIRTH_CHART, kundliGetKpBirthChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_CUSPS_CHART, kundliGetKpCuspsChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_PLANETARY_POSITION, kundliGetPlanetaryPosition);
    yield takeLeading(actionTypes?.KUNDLI_GET_UPGRAHA, kundliGetUpgraha);
    yield takeLeading(actionTypes?.KUNDLI_GET_DASHAM_BHAV_MADHYA, kundliGetDashamBhavMadhya);
    yield takeLeading(actionTypes?.KUNDLI_GET_ASHTAK_VARGA, kundliGetAshtakVarga);
    yield takeLeading(actionTypes?.KUNDLI_GET_SARVASHTAK, kundliGetSarvashtak);
    yield takeLeading(actionTypes?.KUNDLI_GET_VIMSHOTTARI_DASHA, kundliGetVimshottariDasha);
    yield takeLeading(actionTypes?.KUNDLI_GET_VIMSHOTTARI_CURRENT_DASHA, kundliGetVimshottariCurrentDasha);
    yield takeLeading(actionTypes?.KUNDLI_GET_YOGINI_DASHA, kundliGetYoginiDasha);
    yield takeLeading(actionTypes?.KUNDLI_GET_YOGINI_CURRENT_DASHA, kundliGetYoginiCurrentDasha);
    yield takeLeading(actionTypes?.KUNDLI_GET_JAIMINI_DETAILS, kundliGetJaiminiDetails);
    yield takeLeading(actionTypes?.KUNDLI_GET_CHAR_DASHA, kundliGetCharDasha);
    yield takeLeading(actionTypes?.KUNDLI_GET_CHAR_CURRENT_DASHA, kundliGetCharCurrentDasha);
    yield takeLeading(actionTypes?.KUNDLI_GET_NUMEROLOGY_DETAILS, kundliGetNumerologyDetails);
    yield takeLeading(actionTypes?.KUNDLI_GET_MANGAL_DOSHA, kundliGetMangalDosha);
    yield takeLeading(actionTypes?.KUNDLI_GET_KAALSARP_DOSHA, kundliGetKaalsarpDosha);
    yield takeLeading(actionTypes?.KUNDLI_GET_PITRI_DOSHA, kundliGetPitriDosha);
    yield takeLeading(actionTypes?.KUNDLI_GET_SADHE_SATI, kundliGetSadheSati);
    yield takeLeading(actionTypes?.KUNDLI_GET_PREDICTION, kundliGetPrediction);
    yield takeLeading(actionTypes?.KUNDLI_GET_LAGNA_CHART, kundliGetLagnaChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_MOON_CHART, kundliGetMoonChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_SUN_CHART, kundliGetSunChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_CHALIT_CHART, kundliGetChalitChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_HORA_CHART, kundliGetHoraChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_DRESHKAN_CHART, kundliGetDreshkanChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_NAVAMANSHA_CHART, kundliGetNavamanshaChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_DASHAMANSHA_CHART, kundliGetDashamanshaChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_DWADASMANSHA_CHART, kundliSetDwadasmanshaChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_TRISHAMANSHA_CHART, kundliGetTrishamanshaChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_SHASHTYMANSHA_CHART, kundliSetShashtymanshaChart);
};