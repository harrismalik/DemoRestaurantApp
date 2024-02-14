import { all } from 'redux-saga/effects';
import authSaga from './modules/auth/sagas';

function* rootSaga() {
    yield all([
        authSaga(),
    ]);
}

export default rootSaga;
