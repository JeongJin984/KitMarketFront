import axios from 'axios';

import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from '../reducer/post';

function loadPostsAPI(category) {
  return axios({
    method: 'GET',
    url: `/api/${category}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function loadPostAPI({ category, id }) {
  return axios({
    method: 'GET',
    url: `/api/${category}/${id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

// function postChatAPI(data) {
// 	return axios.post('/chat/', data)
// }

function* loadPosts(action) {
  try {
    console.log(action.category);
    const result = yield call(loadPostsAPI, action.category);
    console.log('result', result.data);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
    console.log('load posts success');
  } catch (error) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error,
    });
    console.log('load posts error');
  }
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
    console.log('load post success');
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      error,
    });
    console.log('load post error');
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

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchPostChat() {
  yield takeLatest(ADD_POST_REQUEST, postChat);
}

export default function* chattingSaga() {
  yield all([fork(watchLoadPosts), fork(watchLoadPost), fork(watchPostChat)]);
}
