import * as actionTypes from "../action-types";

//! Consultation Profile
export const getConsultationProfiles = payload => ({ type: actionTypes.GET_CONSULTATION_PROFILES, payload });
export const setConsultationProfiles = payload => ({ type: actionTypes.SET_CONSULTATION_PROFILES, payload });
export const getConsultationProfileDetails = payload => ({ type: actionTypes.GET_CONSULTATION_PROFILE_DETAILS, payload });
export const setConsultationProfileDetails = payload => ({ type: actionTypes.SET_CONSULTATION_PROFILE_DETAILS, payload });
export const createConsultationProfile = payload => ({ type: actionTypes.CREATE_CONSULTATION_PROFILE, payload });
export const updateConsultationProfile = payload => ({ type: actionTypes.UPDATE_CONSULTATION_PROFILE, payload });
export const deleteConsultationProfile = payload => ({ type: actionTypes.DELETE_CONSULTATION_PROFILE, payload });

//! Kundli Matching Profile
export const getKundliMatchingProfiles = payload => ({ type: actionTypes.GET_KUNDLI_MATCHING_PROFILES, payload });
export const setKundliMatchingProfiles = payload => ({ type: actionTypes.SET_KUNDLI_MATCHING_PROFILES, payload });
export const getKundliMatchingProfileDetails = payload => ({ type: actionTypes.GET_KUNDLI_MATCHING_PROFILE_DETAILS, payload });
export const setKundliMatchingProfileDetails = payload => ({ type: actionTypes.SET_KUNDLI_MATCHING_PROFILE_DETAILS, payload });
export const createKundliMatchingProfile = payload => ({ type: actionTypes.CREATE_KUNDLI_MATCHING_PROFILE, payload });
export const updateKundliMatchingProfile = payload => ({ type: actionTypes.UPDATE_KUNDLI_MATCHING_PROFILE, payload });
export const deleteKundliMatchingProfile = payload => ({ type: actionTypes.DELETE_KUNDLI_MATCHING_PROFILE, payload });