import { createReducer } from '@reduxjs/toolkit';
import {
    bookingSuccess,
    bookingFailure
} from './actions';
import {BookingState} from "../../../types/booking/types";

const initialState: BookingState = {
    processing: false,
    response: null,
    error: false,
    lastBooking: undefined
};

const bookingSuccessReducer = (state: BookingState, action:any) => {
    state.error = false
    state.response = action.payload.message
    state.lastBooking = action.payload.booking
    state.processing = false
    return state
}

const bookingFailureReducer = (state: BookingState, action:any) => {
    state.error = true
    state.response = action.payload.message
    state.processing = false
    state.lastBooking = undefined
    return state
}

const bookingReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(bookingSuccess, bookingSuccessReducer)
        .addCase(bookingFailure, bookingFailureReducer)
});

export default bookingReducer;
