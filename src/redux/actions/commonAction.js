import * as actionTypes from '../action-types';

export const setIsLoading = payload => ({ type: actionTypes.SET_IS_LOADING, payload });
export const setSocketConnectionStatus = payload => ({ type: actionTypes.SET_SOCKET_CONNECTION_STATUS, payload });

export const openDownloadOurAppModal = payload => ({ type: actionTypes.OPEN_DOWNLOAD_OUR_APP_MODAL, payload });
export const closeDownloadOurAppModal = payload => ({ type: actionTypes.CLOSE_DOWNLOAD_OUR_APP_MODAL, payload });

export const webLanguage = payload => ({ type: actionTypes.WEB_LANGUAGE, payload });

export const toggleHamburgerMenu = payload => ({ type: actionTypes.TOGGLE_HAMBURGER_MENU, payload });