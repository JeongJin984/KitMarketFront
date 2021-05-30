import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import postSaga from './post';

import axios from 'axios';

axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
