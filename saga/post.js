import axios from 'axios';

import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { backURL } from '../config/config';
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
  CANCEL_JOIN_REQUEST,
  CANCEL_JOIN_SUCCESS,
  CANCEL_JOIN_FAILURE,
  PERMIT_JOIN_REQUEST,
  PERMIT_JOIN_SUCCESS,
  PERMIT_JOIN_FAILURE,
  LOAD_CREATED_POSTS_REQUEST,
  LOAD_CREATED_POSTS_SUCCESS,
  LOAD_CREATED_POSTS_FAILURE,
  LOAD_PARTICIPATING_POSTS_REQUEST,
  LOAD_PARTICIPATING_POSTS_SUCCESS,
  LOAD_PARTICIPATING_POSTS_FAILURE,
  LOAD_APPLICATED_POSTS_REQUEST,
  LOAD_APPLICATED_POSTS_SUCCESS,
  LOAD_APPLICATED_POSTS_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  OPERATE_POST_REQUEST,
  OPERATE_POST_SUCCESS,
  OPERATE_POST_FAILURE,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
} from '../data/eventName/postEventName';

const defaultURL = backURL + '/post-service';

const {
  dummyPosts,
  applicatedPosts,
  createdPosts,
  dummyPost,
  participatingPosts,
} = require('../data/dummy/postDummy');

function loadPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/${data.category}?status=${data.status}offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

const loadDummyPosts = (data) => {
  for (let p of dummyPosts) {
    if (p.currentPage === data.page) {
      return p;
    }
  }
};
//됨
function* loadPosts(action) {
  try {
    // const result = yield call(loadPostsAPI, action.data);
    const result = { data: loadDummyPosts(action.data) };
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
//됨
function loadPostAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/${data.category}?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* loadPost(action) {
  try {
    // const result = yield call(loadPostAPI, action.data);
    const result = dummyPost;
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

//저장 카테고리별로 되도록 바꾸기
function addPostAPI(data) {
  return axios({
    method: 'POST',
    url: `${defaultURL}/api/${data.category}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function* addPost(action) {
  try {
    console.log(action.data.category);
    yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
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
    url: `${defaultURL}/api/app/join?postId=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username, content: data.content },
  });
}

// 됨
function* joinPost(action) {
  try {
    console.log(action.data);
    const result = yield call(joinPostAPI, action.data);
    // const result = { data: { username: 'username' } };
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

function cancelJoinAPI(data) {
  return axios({
    method: 'DELETE',
    url: `${defaultURL}/api/app/cancle?postId=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username },
  });
}

//됨
function* cancelJoin(action) {
  try {
    console.log(action.data);
    yield call(cancelJoinAPI, action.data);
    yield put({
      type: CANCEL_JOIN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: CANCEL_JOIN_FAILURE,
      error,
    });
  }
}

function permitJoinAPI(data) {
  return axios({
    method: 'POST',
    url: `${defaultURL}/api/app/permit`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { appId: data.id, hostName: data.username },
  });
}

function* permitJoin(action) {
  try {
    console.log(action.data);
    yield call(permitJoinAPI, action.data);
    yield put({
      type: PERMIT_JOIN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: PERMIT_JOIN_FAILURE,
      error,
    });
  }
}

function loadCreatedPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/my?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
//됨
function* loadCreatedPosts(action) {
  try {
    // const result = createdPosts;
    const result = yield call(loadCreatedPostsAPI, action.data);
    yield put({
      type: LOAD_CREATED_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_CREATED_POSTS_FAILURE,
      error,
    });
  }
}

function loadParticipatingPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/participants?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
//됨
function* loadParticipatingPosts(action) {
  try {
    // const result = participatingPosts;
    const result = yield call(loadParticipatingPostsAPI, action.data);
    yield put({
      type: LOAD_PARTICIPATING_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_PARTICIPATING_POSTS_FAILURE,
      error,
    });
  }
}

function loadApplicatedPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/application?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
// 신청중인 모임들
//됨
function* loadApplicatedPosts(action) {
  try {
    const result = yield call(loadApplicatedPostsAPI, action.data);
    yield put({
      type: LOAD_APPLICATED_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_APPLICATED_POSTS_FAILURE,
      error,
    });
  }
}

function deletePostAPI(data) {
  return axios({
    method: 'DELETE',
    url: `${defaultURL}/api/post/${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* deletePost(action) {
  try {
    yield call(deletePostAPI, action.data);
    yield put({
      type: DELETE_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: DELETE_POST_FAILURE,
      error,
    });
  }
}

function updatePostAPI(data) {
  return axios({
    method: 'PUT',
    url: `${defaultURL}/api/${data.category}?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { writer, title, content, deadLine, maxNum, curNum, category },
  });
}

function* updatePost(action) {
  try {
    yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: UPDATE_POST_FAILURE,
      error,
    });
  }
}

function operatePostAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/operating?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* operatePost(action) {
  try {
    yield call(operatePostAPI, action.data);
    yield put({
      type: OPERATE_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: OPERATE_POST_FAILURE,
      error,
    });
  }
}

function searchPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/search?${data.select}=${data.input}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* searchPosts(action) {
  try {
    // yield call(searchPostsAPI, action.data);
    const result = { data: loadDummyPosts(action.data) };
    yield put({
      type: SEARCH_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SEARCH_POSTS_FAILURE,
      error,
    });
  }
}

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

function* watchCancelJoin() {
  yield takeLatest(CANCEL_JOIN_REQUEST, cancelJoin);
}

function* watchPermitJoin() {
  yield takeLatest(PERMIT_JOIN_REQUEST, permitJoin);
}

function* watchLoadCreatePosts() {
  yield takeLatest(LOAD_CREATED_POSTS_REQUEST, loadCreatedPosts);
}

function* watchLoadParticipatingPosts() {
  yield takeLatest(LOAD_PARTICIPATING_POSTS_REQUEST, loadParticipatingPosts);
}

function* watchLoadApplicatedPosts() {
  yield takeLatest(LOAD_APPLICATED_POSTS_REQUEST, loadApplicatedPosts);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchOperatePost() {
  yield takeLatest(OPERATE_POST_REQUEST, operatePost);
}

function* watchSearchPosts() {
  yield takeLatest(SEARCH_POSTS_REQUEST, searchPosts);
}

export default function* chattingSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchJoinPost),
    fork(watchCancelJoin),
    fork(watchPermitJoin),
    fork(watchLoadCreatePosts),
    fork(watchLoadParticipatingPosts),
    fork(watchLoadApplicatedPosts),
    fork(watchDeletePost),
    fork(watchUpdatePost),
    fork(watchOperatePost),
    fork(watchSearchPosts),
  ]);
}
