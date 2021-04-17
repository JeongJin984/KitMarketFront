import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
} from '../reducer/user';

import axios from 'axios';
import cookie from 'react-cookies';

const { frontURL } = require('../config/config');
function logInAPI(data) {
  return axios({
    method: 'post',
    url: `http://localhost:8083/api/login?rememberMe=${data.rememberMe}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function logOutAPI() {
  return axios({
    methos: 'post',
    url: '/api/logout',
  });
}

function signUpAPI(data) {
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

function* logOut(action) {
  const result = yield call(logOutAPI);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {
    
  }
}

function loadProfileAPI() {
  return axios(
    {
      method: 'GET',
      url: `/api/profile/user`,
      headers: {
        'X-Request-With': 'XMLHttpRequest',
      },
      validateStatus: (status) => {
        return status === 200 || 401
      }
    }, 
  )
}

function* loadProfile(action) {
  try {
    const result = yield call(loadProfileAPI);
    console.log("result:::", result)

    if(result.status === 200) {
      yield put({
        type: LOAD_PROFILE_SUCCESS,
        data: result.data,
      });
    } else if(result.status === 401) {
      console.log("description::: ", result.data.error_description)
    }

  } catch (error) {
    console.log("error:::", error)
    type: LOAD_PROFILE_FAILURE
    error: error
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

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchLoadProfile),
  ]);
}
