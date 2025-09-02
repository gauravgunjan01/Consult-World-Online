import * as actionTypes from "../action-types";

//! Loader
// export const setIsLoading = (payload) => ({ type: actionTypes.SET_IS_LOADING, payload });

//! Sidebar
export const setIsSidebarOpen = (payload) => ({ type: actionTypes.SET_IS_SIDEBAR_OPEN, payload });
export const setSidebarWidth = (payload) => ({ type: actionTypes.SET_SIDEBAR_WIDTH, payload });

//! Description Modal
export const openDescriptionModal = payload => ({ type: actionTypes.OPEN_DESCRIPTION_MODAL, payload });
export const closeDescriptionModal = () => ({ type: actionTypes.CLOSE_DESCRIPTION_MODAL });