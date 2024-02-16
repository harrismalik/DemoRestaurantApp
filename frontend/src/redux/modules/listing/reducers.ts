import { createReducer } from '@reduxjs/toolkit';
import {
    listingFailure,
    listingSuccess,
    listingStateUpdate
} from './actions';
import {ListingState} from "../../../types/listing/types";

const initialState: ListingState = {
    updating: false,
    response: null,
    error: false,
    tables: [],
    menu: [],
    slots: []
};

const listingStateUpdateReducer = (state:ListingState, action:any) => {
    state.updating = action.payload.state
    return state
}

const listingSuccessReducer = (state:ListingState, action:any) => {
    state.error = false
    state.response = action.payload.message
    switch (action.payload.type) {
        case 'tables':
            state.tables = action.payload.data
            break
        case 'menu':
            state.menu = action.payload.data
            break
        case 'slots':
            state.slots = action.payload.data
            break
    }
    state.updating = false
    return state
}

const listingFailureReducer = (state: ListingState, action: any) => {
    state.error = true;
    state.response = action.payload.message;
    return state
}

const listingReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(listingStateUpdate, listingStateUpdateReducer)
        .addCase(listingSuccess, listingSuccessReducer)
        .addCase(listingFailure, listingFailureReducer)
});

export default listingReducer;
