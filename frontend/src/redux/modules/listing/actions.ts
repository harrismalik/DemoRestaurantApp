import { createAction } from '@reduxjs/toolkit';

export const listingSuccess = createAction<{ type:string, data:any, message: string }>('listing/SUCCESS');
export const listingFailure = createAction<{ message: string }>('listing/FAILURE');

export const listingStateUpdate = createAction<{ state: boolean; }>('listing/UPDATE_STATE');

export const getTablesRequest = createAction<{ date: string; }>('listing/TABLES_REQUEST');
export const getMenuRequest = createAction('listing/MENU_REQUEST');
export const getSlotsRequest = createAction('listing/SLOTS_REQUEST');
