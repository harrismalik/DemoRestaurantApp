import { RootState } from '../../rootReducer';

export const selectBookingResponse = (state: RootState): string|null => state.booking.response;
export const selectIsError = (state: RootState): boolean => state.booking.error;
export const selectLastBooking = (state: RootState): object|undefined => state.booking.lastBooking;
