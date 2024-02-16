import { all } from 'redux-saga/effects';
import authSaga from './modules/auth/sagas';
import listingSaga from "./modules/listing/sagas";
import bookingSaga from "./modules/booking/sagas";

function* rootSaga() {
    yield all([
        authSaga(),
        listingSaga(),
        bookingSaga()
    ]);
}

export default rootSaga;
