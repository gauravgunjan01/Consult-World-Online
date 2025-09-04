import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import userSaga from "./userSaga";
import profileSaga from "./profileSaga";
import astrologerSaga from "./astrologerSaga";
import consultationSaga from "./consultationSaga";
// import kundliSaga from "./kundliSaga";
// import astrologyApiSaga from "./astrologyApiSaga";
// import ecommerceSaga from "./ecommerceSaga";
// import astromallSaga from "./astromallSaga";
// import blogSaga from "./blogSaga";
// import staticPageSaga from "./staticPageSaga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        profileSaga(),
        astrologerSaga(),
        consultationSaga(),
        // kundliSaga(),
        // astrologyApiSaga(),
        // ecommerceSaga(),
        // astromallSaga(),
        // blogSaga(),
        // staticPageSaga(),
    ])
};