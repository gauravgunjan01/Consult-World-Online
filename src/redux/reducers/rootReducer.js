import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import astrologerReducer from "./astrologerReducer";
import consultationReducer from "./consultationReducer";
import kundliReducer from "./kundliReducer";
import astrologyApiReducer from "./astrologyApiReducer";
import ecommerceReducer from "./ecommerceReducer";
import astromallReducer from "./astromallReducer";
import blogreducer from "./blogReducer";
import staticPageReducer from "./staticPageReducer";
import astrologerDashboardReducer from "./astrologerDashboardReducer";

const rootReducer = combineReducers({
    commonReducer,
    authReducer,
    userReducer,
    profileReducer,
    astrologerReducer,
    consultationReducer,
    kundliReducer,
    astrologyApiReducer,
    ecommerceReducer,
    astromallReducer,
    blogreducer,
    staticPageReducer,
    astrologerDashboardReducer
});

export default rootReducer;
