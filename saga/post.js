import axios from 'axios';

import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from '../reducer/post';

function loadPostsAPI() {
  return axios({
    method: 'GET',
    url: '/api/postList',
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

// function postChatAPI(data) {
// 	return axios.post('/chat/', data)
// }

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    console.log('result', result.data);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data.data,
    });
    console.log('load post success');
  } catch (error) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error,
    });
  }
}

function* postChat(action) {
  try {
    //		yield call(postChatAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadPosts);
}

function* watchPostChat() {
  yield takeLatest(ADD_POST_REQUEST, postChat);
}

export default function* chattingSaga() {
  yield all([fork(watchLoadPosts), fork(watchPostChat)]);
}
