import { RootState } from '../../rootReducer';

export const selectIsUpdating = (state: RootState): boolean => state.listing.updating;
export const selectTables = (state: RootState): [] => state.listing.tables;
export const selectMenu = (state: RootState): [] => state.listing.menu;
export const selectSlots = (state: RootState): [] => state.listing.slots;
export const selectMyBookings = (state: RootState): [] => state.listing.myBookings;
