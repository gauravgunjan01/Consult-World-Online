import * as actionTypes from "../action-types";

const initialState = {
    //* Loader
    isLoading: false,

    //* Sidebar
    isSidebarOpen: true,
    sidebarWidth: 250,

    //* Description Modal
    descriptionModalData: null,
    descriptionModalIsOpen: false,
};

const astrologerDashboardReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        //* Loader
        // case actionTypes.SET_IS_LOADING:
        //     return { ...state, isLoading: payload };

        //* Sidebar
        case actionTypes.SET_IS_SIDEBAR_OPEN:
            return { ...state, isSidebarOpen: payload };

        case actionTypes.SET_SIDEBAR_WIDTH:
            return { ...state, sidebarWidth: payload };

        //* Description Modal
        case actionTypes.OPEN_DESCRIPTION_MODAL:
            return { ...state, descriptionModalIsOpen: true, descriptionModalData: payload };

        case actionTypes.CLOSE_DESCRIPTION_MODAL:
            return { ...state, descriptionModalIsOpen: false };

        default:
            return state;
    }
};

export default astrologerDashboardReducer;