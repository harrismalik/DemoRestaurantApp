import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth/reducers';
import listingReducer from "./modules/listing/reducers";
import bookingReducer from "./modules/booking/reducers";
export interface RootState {
    auth: ReturnType<typeof authReducer>;
    listing: ReturnType<typeof listingReducer>;
    booking: ReturnType<typeof bookingReducer>;
}

const rootReducer = combineReducers({
    auth: authReducer,
    listing: listingReducer,
    booking: bookingReducer,
});

export default rootReducer;
