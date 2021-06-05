import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
} from '../data/eventName/userEventName';
import axios from 'axios';
import { frontURL, backURL } from '../config/config';

const defaultURL = backURL + '/user-service';

function logInAPI(data) {
  return axios({
    method: 'post',
    url: `${defaultURL}/login`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function logOutAPI() {
  return axios({
    methos: 'post',
    url: `${defaultURL}/logout`,
  });
}

function signUpAPI(data) {
  return axios({
    method: 'post',
    url: `${defaultURL}/signup`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function loadProfileAPI() {
  return axios({
    method: 'GET',
    url: `${defaultURL}/user`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function loadUserAPI() {
  return axios({
    method: 'GET',
    url: `${defaultURL}/user`,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error,
    });
  }
}

function* logOut() {
  try {
    console.log('asdfasdfasdf');
    yield call(logOutAPI);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {}
}

function* loadProfile(action) {
  try {
    const result = yield call(loadProfileAPI);
    // const result = { data: { username: 'asd' } };
    yield put({
      type: LOAD_PROFILE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_PROFILE_FAILURE,
      error: error,
    });
  }
}
function* loadUser() {
  try {
    console.log('load usersrsresrse');
    const result = { data: { username: 'user1', gender: 'MALE', age: 5 } };
    // const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: error,
    });
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

function* watchLoadProfile() {
  yield takeLatest(LOAD_PROFILE_REQUEST, loadProfile);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchLoadProfile),
    fork(watchLoadUser),
  ]);
}
