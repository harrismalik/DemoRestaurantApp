import { createReducer } from '@reduxjs/toolkit';
import {
    logoutSuccess,
    logoutFailure,
    authenticated,
    authFailed
} from './actions';
import {AuthState} from "../../../types/auth/types";
import Cookies from 'js-cookie';

const initialState: AuthState = {
    isAuthenticated: false,
    response: null,
    error: false,
    user: {
        name:'',
        email:''
    }
};

const authenticatedReducer = (state: AuthState, action: any) => {
    Cookies.set('access_token', action.payload.token, { expires: 1, secure: true });
    state.error = false
    state.user.name = action.payload.name
    state.user.email = action.payload.email
    state.isAuthenticated = true
    state.response = action.payload.message
    return state
}

const authenticationFailedReducer = (state: AuthState, action: any) => {
    state = initialState
    state.error = true
    state.response = action.payload
    return state
}

const logoutSuccessReducer = (state: AuthState) => {
    Cookies.remove('access_token')
    state = initialState
    return state
}

const logoutFailureReducer = (state: AuthState, action: any) => {
    state.error = true;
    state.response = action.payload;
    return state
}

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(authenticated, authenticatedReducer)
        .addCase(authFailed, authenticationFailedReducer)
        .addCase(logoutSuccess, logoutSuccessReducer)
        .addCase(logoutFailure, logoutFailureReducer)
});

export default authReducer;
