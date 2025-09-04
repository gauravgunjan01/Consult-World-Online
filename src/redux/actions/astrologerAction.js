import * as actionTypes from "../action-types";

//! Astrologer List
export const getAstrologers = payload => ({ type: actionTypes.GET_ASTROLOGERS, payload });
export const setAstrologers = payload => ({ type: actionTypes.SET_ASTROLOGERS, payload });
export const getAstrologerDetails = payload => ({ type: actionTypes.GET_ASTROLOGER_DETAILS, payload });
export const setAstrologerDetails = payload => ({ type: actionTypes.SET_ASTROLOGER_DETAILS, payload });

export const getAstrologerReviews = payload => ({ type: actionTypes.GET_ASTROLOGER_REVIEWS, payload });
export const setAstrologerReviews = payload => ({ type: actionTypes.SET_ASTROLOGER_REVIEWS, payload });

export const getAstrologerSkills = payload => ({ type: actionTypes.GET_ASTROLOGER_SKILLS, payload });
export const setAstrologerSkills = payload => ({ type: actionTypes.SET_ASTROLOGER_SKILLS, payload });
export const getAstrologerExpertises = payload => ({ type: actionTypes.GET_ASTROLOGER_EXPERTISES, payload });
export const setAstrologerExpertises = payload => ({ type: actionTypes.SET_ASTROLOGER_EXPERTISES, payload });
export const followUnfollowAstrologer = payload => ({ type: actionTypes.FOLLOW_UNFOLLOW_ASTROLOGER, payload });
export const getAstrologerFollowedStatusByCustomer = payload => ({ type: actionTypes.GET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER, payload });
export const setAstrologerFollowedStatusByCustomer = payload => ({ type: actionTypes.SET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER, payload });