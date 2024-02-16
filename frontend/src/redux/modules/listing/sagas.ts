import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getSlotsRequest,
    listingFailure,
    listingSuccess,
    getMenuRequest,
    getTablesRequest
} from './actions';
import {ApiResponse} from "../../../types/common/types";
import ListingService from "../../../services/listing/ListingService";
import {GetTablesPayload} from "../../../types/listing/types";

function* handleGetTablesRequest(action: ReturnType<typeof getTablesRequest>) {
    try {
        const { date }: GetTablesPayload = action.payload;
        const listingResponse: ApiResponse = yield call(ListingService.getTables, date);
        const { error, message, data } = listingResponse;
        if (error == true) {
            yield put(listingFailure({ message }));
        } else {
            yield put(listingSuccess({ type:'tables', data:data['tables'], message }));
        }
    } catch (error) {
        yield put(listingFailure({ message: error instanceof Error ? error.message : 'An unknown error occurred' }));
    }
}

function* handleGetMenuRequest(action: ReturnType<typeof getMenuRequest>) {
    try {
        const listingResponse: ApiResponse = yield call(ListingService.getMenu);
        const { error, message, data } = listingResponse;
        if (error == true) {
            yield put(listingFailure({ message }));
        } else {
            yield put(listingSuccess({ type:'menu', data:data['menu'], message }));
        }
    } catch (error) {
        yield put(listingFailure({ message: error instanceof Error ? error.message : 'An unknown error occurred' }));
    }
}

function* handleGetSlotsRequest(action: ReturnType<typeof getSlotsRequest>) {
    try {
        const listingResponse: ApiResponse = yield call(ListingService.getSlots);
        const { message, error, data } = listingResponse;
        if (error == true) {
            yield put(listingFailure({ message }));
        }
        yield put(listingSuccess({type:'slots', data:data['slots'], message}));
    } catch (error) {
        yield put(listingFailure({ message: error instanceof Error ? error.message : 'An unknown error occurred' }));
    }
}

function* listingSaga() {
    yield takeLatest(getTablesRequest.type, handleGetTablesRequest);
    yield takeLatest(getMenuRequest.type, handleGetMenuRequest);
    yield takeLatest(getSlotsRequest.type, handleGetSlotsRequest);
}

export default listingSaga;
