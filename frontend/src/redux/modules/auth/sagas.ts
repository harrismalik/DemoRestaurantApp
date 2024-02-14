import { call, put, takeLatest } from 'redux-saga/effects';
import {
    loginRequest,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    signupRequest,
    authFailed,
    authenticated
} from './actions';
import AuthService from '../../../services/auth/AuthService';
import {LoginPayload, LogoutPayload, SignupPayload} from "../../../types/auth/types";
import {ApiResponse} from "../../../types/common/types";

function* handleLoginRequest(action: ReturnType<typeof loginRequest>) {
    try {
        const { email, password }: LoginPayload = action.payload;
        const authResponse: ApiResponse = yield call(AuthService.login, email, password);
        const { error, message, data } = authResponse;
        if (error == true) {
            yield put(authFailed({ message }));
        } else {
            yield put(authenticated({ name:data.name, email:data.email, token: data.token, message }));
        }
    } catch (error) {
        yield put(authFailed({ message: error instanceof Error ? error.message : 'An unknown error occurred' }));
    }
}

function* handleSignupRequest(action: ReturnType<typeof signupRequest>) {
    try {
        const { name, email, password, repeat_password }: SignupPayload = action.payload;
        const authResponse: ApiResponse = yield call(AuthService.signup, name, email, password, repeat_password);
        const { error, message, data } = authResponse;
        if (error == true) {
            yield put(authFailed({ message }));
        } else {
            yield put(authenticated({ name:data.name, email:data.email, token: data.token, message }));
        }
    } catch (error) {
        yield put(authFailed({ message: error instanceof Error ? error.message : 'An unknown error occurred' }));
    }
}

function* handleLogoutRequest(action: ReturnType<typeof logoutRequest>) {
    try {
        const { token }: LogoutPayload = action.payload;
        const authResponse: ApiResponse = yield call(AuthService.logout, token);
        const { message, error } = authResponse;
        if (error == true) {
            yield put(logoutFailure({ message }));
        }
        yield put(logoutSuccess());
    } catch (error) {
        yield put(logoutFailure({ message: error instanceof Error ? error.message : 'An unknown error occurred' }));
    }
}

function* authSaga() {
    yield takeLatest(loginRequest.type, handleLoginRequest);
    yield takeLatest(signupRequest.type, handleSignupRequest);
    yield takeLatest(logoutRequest.type, handleLogoutRequest);
}

export default authSaga;
