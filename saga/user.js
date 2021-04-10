import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
} from '../reducer/user';

import axios from 'axios';

const { frontURL } = require('../config/config');
function logInAPI(data) {
  return axios({
    method: 'post',
    url: '/api/login',
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function logOutAPI() {
  console.log('logoutapi');
  return axios({
    methos: 'post',
    url: '/api/logout',
  });
}

function signUpAPI(data) {
  console.log('signUpAPI');
  return axios({
    method: 'post',
    url: '/api/signup',
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    console.log('result', result);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
    console.log('login successful');
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error,
    });
    console.log('login failure');
  }
}

function* logOut(action) {
  const result = yield call(logOutAPI);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(action.data);
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      error,
    });
    console.log('signup failed', error);
  }
}

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, logIn);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogout), fork(watchSignUp)]);
}
