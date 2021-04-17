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
  JOIN_POST_REQUEST,
  JOIN_POST_SUCCESS,
  JOIN_POST_FAILURE,
} from '../reducer/post';

// function postChatAPI(data) {
// 	return axios.post('/chat/', data)
// }
function loadPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `/api/${data.category}?offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.category);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error,
    });
  }
}

function loadPostAPI(data) {
  return axios({
    method: 'GET',
    url: `/api/${data.category}/${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      error,
    });
  }
}

function addPostAPI(data) {
  return axios({
    method: 'POST',
    url: `/api/post`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data); // reesult 존재?
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error,
    });
  }
}

function joinPostAPI(data) {
  return axios({
    method: 'POST',
    url: `/api/join?postId=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username },
  });
}

function* joinPost(action) {
  try {
    const result = yield call(joinPostAPI, action.data); // reesult 존재?
    yield put({
      type: JOIN_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: JOIN_POST_FAILURE,
      error,
    });
  }
}

// function* postChat(action) {
//   try {
//     //		yield call(postChatAPI, action.data)
//     yield put({
//       type: ADD_POST_SUCCESS,
//       data: action.data,
//     });
//   } catch (error) {
//     yield put({
//       type: ADD_POST_FAILURE,
//       error: error,
//     });
//   }
// }

function* watchLoadPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchJoinPost() {
  yield takeLatest(JOIN_POST_REQUEST, joinPost);
}

// function* watchPostChat() {
//   yield takeLatest(ADD_POST_REQUEST, postChat);
// }

export default function* chattingSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchJoinPost),
  ]);
}
