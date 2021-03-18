import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  loginSuccess,
  loginFailure,
  logoutRequest,
} from '../reducer/user';

import axios from 'axios';
const { frontURL } = require('../config/config');

function logInAPI(data) {
  console.log('loginapi', data);
  return axios.post('http://localhost:8080/api/login', data);
}

function logOutAPI() {
  console.log('logoutapi');
  return axios.post('http://localhost:8080/api/logout');
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put(loginSuccess(action.data));
  } catch (error) {
    //yield fork(console.log('error', error));
    yield put(loginFailure(error));
  }
}

function* logOut(action) {
  const result = yield call(logOutAPI);
  yield put(logoutRequest());
}

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, logIn);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogout)]);
}
