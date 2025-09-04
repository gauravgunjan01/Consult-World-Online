import * as actionTypes from "../action-types";

const initialState = {
    astrologersData: null,
    astrologerDetails: null,
    astrologerReviewsData: null,
    astrologerSkillsData: null,
    astrologerExpertisesData: null,
    astrologerFollowedStatusByCustomer: null,
};

const astrologerReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_ASTROLOGERS:
            return { ...state, astrologersData: payload };

        case actionTypes.SET_ASTROLOGER_DETAILS:
            return { ...state, astrologerDetails: payload };

        case actionTypes.SET_ASTROLOGER_REVIEWS:
            return { ...state, astrologerReviewsData: payload };

        case actionTypes.SET_ASTROLOGER_SKILLS:
            return { ...state, astrologerSkillsData: payload };

        case actionTypes.SET_ASTROLOGER_EXPERTISES:
            return { ...state, astrologerExpertisesData: payload };

        case actionTypes.SET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER:
            return { ...state, astrologerFollowedStatusByCustomer: payload };

        default:
            return state;
    }
};

export default astrologerReducer;