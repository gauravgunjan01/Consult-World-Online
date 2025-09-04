import * as actionTypes from "../action-types";

const initialState = {
    consultationProfiles: [],
    consultationProfileDetails: null,

    kundliMatchingProfilesData: [],
    kundliMatchingProfileDetails: null,
};

const profileReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        //! Consultation Profile
        case actionTypes.SET_CONSULTATION_PROFILES:
            return { ...state, consultationProfiles: payload };

        case actionTypes.SET_CONSULTATION_PROFILE_DETAILS:
            return { ...state, consultationProfileDetails: payload };

        //! Kundli Matching Profile
        case actionTypes.SET_KUNDLI_MATCHING_PROFILES:
            return { ...state, kundliMatchingProfilesData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_PROFILE_DETAILS:
            return { ...state, kundliMatchingProfileDetails: payload };

        default:
            return state;
    }
};

export default profileReducer;