import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction<{ email: string; password: string }>('auth/LOGIN_REQUEST');
export const signupRequest = createAction<{ name: string, email: string, password: string, repeat_password: string }>('auth/SIGNUP_REQUEST');

export const logoutRequest = createAction<{ token: string; }>('auth/LOGOUT_REQUEST');
export const logoutSuccess = createAction('auth/LOGOUT_SUCCESS');
export const logoutFailure = createAction<{ message: string }>('auth/LOGOUT_FAILURE');

export const authenticated = createAction<{ token: string, name: string, email: string, message:string }>('auth/AUTHENTICATED');
export const authFailed = createAction<{ message: string }>('auth/AUTH_FAILED');
