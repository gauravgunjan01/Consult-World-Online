import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import { getAPI, postAPI } from '../../utils/api-function';
import { get_astrologers, get_astrologer_details, get_astrologer_reviews, get_astrologer_skills, get_astrologer_expertises, follow_unfollow_astrologer, get_astrologer_followed_status_by_customer } from '../../utils/api-routes';
import { toaster } from '../../utils/services/toast-service';

function* getAstrologers() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astrologers);
        console.log('Get Astrologer Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_ASTROLOGERS, payload: data?.result });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astrologer Saga Error ::: ", error);
    }
};

function* getAstrologerDetails(action) {
    try {
        const { payload } = action;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        yield delay(100);
        const { data } = yield getAPI(get_astrologer_details(payload));

        if (data?.status) yield put({ type: actionTypes.SET_ASTROLOGER_DETAILS, payload: data?.result });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        toaster.error({ text: error?.response?.data?.message })
    }
};

function* getAstrologerReviews(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(get_astrologer_reviews, payload);
        if (data?.status) yield put({ type: actionTypes.SET_ASTROLOGER_REVIEWS, payload: data?.reviews?.reverse() });

    } catch (error) {
        yield put({ type: actionTypes.SET_ASTROLOGER_REVIEWS, payload: [] });
    }
};

function* getAstrologerSkills(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astrologer_skills);
        console.log('Get Astrologer Skill Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_ASTROLOGER_SKILLS, payload: data?.skills });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astrologer Skill Saga Error ::: ", error);
    }
};


function* getAstrologerExpertises(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astrologer_expertises);
        console.log('Get Astrologer MainExpertise Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_ASTROLOGER_EXPERTISES, payload: data?.mainExpertise });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astrologer MainExpertise Saga Error ::: ", error);
    }
};


function* followUnfollowAstrologer(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(follow_unfollow_astrologer, payload);
        console.log("Follow Unfollow Astrologer Saga Response ::: ", data);

        if (data?.status) {
            toaster.success({ text: `Astrologer ${payload?.action} successfully!!!` });
            yield put({ type: actionTypes.GET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER, payload: { customerId: payload?.customerId, astrologerId: payload?.astrologerId } });
        }

    } catch (error) {
        toaster.error({ text: 'Failed to change profile picture!!!' });
        console.log("Customer Change Picture Saga Error ::: ", error)
    }
};


function* getAstrologerFollowedStatusByCustomer(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(get_astrologer_followed_status_by_customer, payload);
        console.log('Get Astrologer Followed Status By Customer Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER, payload: data?.follow });

    } catch (error) {
        console.log("Get Astrologer Followed Status By Customer Saga Error ::: ", error);
    }
};

export default function* astrologerSaga() {
    yield takeLeading(actionTypes?.GET_ASTROLOGERS, getAstrologers);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_DETAILS, getAstrologerDetails);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_REVIEWS, getAstrologerReviews);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_SKILLS, getAstrologerSkills);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_EXPERTISES, getAstrologerExpertises);

    yield takeLeading(actionTypes?.FOLLOW_UNFOLLOW_ASTROLOGER, followUnfollowAstrologer);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER, getAstrologerFollowedStatusByCustomer);
};