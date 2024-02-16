import { createAction } from '@reduxjs/toolkit';
import {BookPayload} from "../../../types/booking/types";

export const bookingSuccess = createAction<{ booking:object, message: string }>('booking/SUCCESS');
export const bookingFailure = createAction<{ message: string }>('booking/FAILURE');

export const bookingRequest = createAction<BookPayload>('listing/SUCCESS');
