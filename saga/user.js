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
  LOAD_REFRESH_TOKEN_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
} from '../reducer/user';

import axios from 'axios';

const { frontURL, authURL } = require('../config/config');

function logInAPI(data) {
  return axios({
    method: 'post',
    url: `${authURL}/api/login?rememberMe=${data.rememberMe}`,
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
    url: `${authURL}/api/signup`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function loadProfileAPI() {
  return axios({
    method: 'GET',
    url: `/api/profile/user`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function refreshTokenAPI() {
  return axios({
    method: 'GET',
    url: `http://localhost:8083/api/refresh`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function loadUserAPI() {
  return axios({
    method: 'GET',
    url: `http://localhost:8083/api/user`,
  })
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
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {}
}

function* loadProfile(action) {
  try {
    //const result = yield call(loadProfileAPI);
    const result = {
      data: {
        username: 'user1',
        email: 'a@b.com',
        age: 3,
        createdPost: [
          {
            title: 'created',
            content: 'content',
            createdAt: '2020-04-13',
            maxNum: '3',
            curNum: '1',
            category: 'Study',
          },
          {
            title: 'abc',
            content: 'content',
            createdAt: '2020-04-13',
            maxNum: '3',
            curNum: '1',
            category: 'Study',
          },
          {
            title: 'abc',
            content: 'content',
            createdAt: '2020-04-13',
            maxNum: '3',
            curNum: '1',
            category: 'Study',
          },
          {
            title: 'abc',
            content: 'content',
            createdAt: '2020-04-13',
            maxNum: '3',
            curNum: '1',
            category: 'Study',
          },
          {
            title: 'abc',
            content: 'content',
            createdAt: '2020-04-13',
            maxNum: '3',
            curNum: '1',
            category: 'Study',
          },
        ],
        participatingPost: [
          {
            title: 'participating',
            content: 'content',
            createdAt: '2020-04-13',
            maxNum: '3',
            curNum: '1',
            category: 'Study',
          },
        ],
      },
    };
    yield put({
      type: LOAD_PROFILE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    type: LOAD_PROFILE_FAILURE;
    error: error;
  }
}

function* loadRefreshToken(action) {
  try {
    yield call(refreshTokenAPI, action.data);
  } catch (error) {}
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: error
    })
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

function* watchLoadRefreshToken() {
  yield takeLatest(LOAD_REFRESH_TOKEN_REQUEST, loadRefreshToken);
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
    fork(watchLoadRefreshToken),
    fork(watchLoadUser)
  ]);
}
