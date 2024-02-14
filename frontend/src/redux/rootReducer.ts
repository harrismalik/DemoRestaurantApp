import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth/reducers';
export interface RootState {
    auth: ReturnType<typeof authReducer>;
}

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
