import { call, put, takeLatest } from 'redux-saga/effects';
import {
    bookingRequest,
    bookingFailure,
    bookingSuccess
} from './actions';
import {ApiResponse} from "../../../types/common/types";
import {BookPayload} from "../../../types/booking/types";
import BookingService from "../../../services/booking/BookingService";

function* handleBookingRequest(action: ReturnType<typeof bookingRequest>) {
    try {
        const bookPayload: BookPayload = action.payload;
        const authResponse: ApiResponse = yield call(BookingService.bookNow, bookPayload);
        const { error, message, data } = authResponse;
        if (error == true) {
            yield put(bookingFailure({ message }));
        } else {
            yield put(bookingSuccess({ booking:data.booking, message }));
        }
    } catch (error) {
        yield put(bookingFailure({ message: error instanceof Error ? error.message : 'An unknown error occurred' }));
    }
}

function* bookingSaga() {
    yield takeLatest(bookingRequest.type, handleBookingRequest);
}

export default bookingSaga;
