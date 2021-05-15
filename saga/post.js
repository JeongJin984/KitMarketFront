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
  CANCEL_JOIN_REQUEST,
  CANCEL_JOIN_SUCCESS,
  CANCEL_JOIN_FAILURE,
  LOAD_CREATED_POSTS_REQUEST,
  LOAD_CREATED_POSTS_SUCCESS,
  LOAD_CREATED_POSTS_FAILURE,
  LOAD_PARTICIPATING_POSTS_REQUEST,
  LOAD_PARTICIPATING_POSTS_SUCCESS,
  LOAD_PARTICIPATING_POSTS_FAILURE,
  LOAD_APPLICATED_POSTS_REQUEST,
  LOAD_APPLICATED_POSTS_SUCCESS,
  LOAD_APPLICATED_POSTS_FAILURE,
} from '../reducer/post';

const dummyPosts = [
  {
    size: 8,
    currentPage: 0,
    maxPage: 3,
    data: [
      {
        id: 1,
        writer: 'Account0',
        title: 'Dummy',
        content: "I'm Dummy",
        deadLine: 4,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 2,
        writer: 'Account1',
        title: 'Dummy2',
        content: "I'm Dummy2",
        deadLine: 10,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'study',
      },
      {
        id: 3,
        writer: 'Account2',
        title: 'Dummy3',
        content: "I'm Dummy3",
        deadLine: 13,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 2,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 4,
        writer: 'Account3',
        title: 'Dummy4',
        content: "I'm Dummy4",
        deadLine: 21,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 2,
        category: 'contest',
      },
      {
        id: 5,
        writer: 'Account0',
        title: 'Dummy5',
        content: "I'm Dummy5",
        deadLine: 24,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 3,
        category: 'contest',
      },
      {
        id: 6,
        writer: 'Account0',
        title: 'Dummy6',
        content: "I'm Dummy6",
        deadLine: 27,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 7,
        writer: 'Account0',
        title: 'Dummy7',
        content: "I'm Dummy7",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 5,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 8,
        writer: 'Account0',
        title: 'Dummy8',
        content: "I'm Dummy8",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
    ],
  },
  {
    size: 8,
    currentPage: 1,
    maxPage: 3,
    data: [
      {
        id: 9,
        writer: 'Account0',
        title: 'Dummy9',
        content: "I'm Dummy9",
        deadLine: 4,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 10,
        writer: 'Account1',
        title: 'Dummy10',
        content: "I'm Dummy10",
        deadLine: 10,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'study',
      },
      {
        id: 11,
        writer: 'Account2',
        title: 'Carpool11',
        content: "I'm Carpool11",
        deadLine: 13,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 2,
        curNum: 1,
        category: 'carpool',
      },
      {
        id: 12,
        writer: 'Account3',
        title: 'Dummy2',
        content: "I'm Dummy2",
        deadLine: 21,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 2,
        category: 'contest',
      },
      {
        id: 13,
        writer: 'Account0',
        title: 'Dummy3',
        content: "I'm Dummy3",
        deadLine: 24,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 3,
        category: 'contest',
      },
      {
        id: 14,
        writer: 'Account0',
        title: 'Dummy4',
        content: "I'm Dummy4",
        deadLine: 27,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 15,
        writer: 'Account0',
        title: 'Dummy5',
        content: "I'm Dummy5",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 5,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 16,
        writer: 'Account0',
        title: 'Dummy6',
        content: "I'm Dummy6",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
    ],
  },
  {
    size: 8,
    currentPage: 2,
    maxPage: 3,
    data: [
      {
        id: 17,
        writer: 'Account0',
        title: 'Dummy7',
        content: "I'm Dummy7",
        deadLine: 4,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 18,
        writer: 'Account1',
        title: 'Dummy18',
        content: "I'm Dummy18",
        deadLine: 10,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'study',
      },
      {
        id: 19,
        writer: 'Account2',
        title: 'Dummy9',
        content: "I'm Dummy9",
        deadLine: 13,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 2,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 20,
        writer: 'Account3',
        title: 'Dummy20',
        content: "I'm Dummy20",
        deadLine: 21,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 2,
        category: 'contest',
      },
      {
        id: 21,
        writer: 'Account0',
        title: 'Dummy21',
        content: "I'm Dummy21",
        deadLine: 24,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 3,
        category: 'contest',
      },
      {
        id: 22,
        writer: 'Account0',
        title: 'Dummy22',
        content: "I'm Dummy22",
        deadLine: 27,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 23,
        writer: 'Account0',
        title: 'Dummy23',
        content: "I'm Dummy23",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 5,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 24,
        writer: 'Account0',
        title: 'Dummy24',
        content: "I'm Dummy24",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
    ],
  },
];

const dummyPost = {
  data: {
    id: 9,
    writer: 'Account0',
    title: 'Dummy0',
    content: "I'm Dummy00",
    deadLine: 21,
    createdAt: '2021-04-10T15:05:44.373372',
    maxNum: 3,
    curNum: 0,
    category: 'study',
    participants: [
      {
        username: 'participant1',
        email: 'partEmail1',
        age: 2,
      },
      {
        username: 'participant0',
        email: 'partEmail0',
        age: 1,
      },
      {
        username: 'participant2',
        email: 'partEmail2',
        age: 3,
      },
    ],
    applications: [
      {
        id: 1,
        username: 'user1',
        chatDate: null,
      },
      {
        id: 2,
        username: 'user2',
        chatDate: null,
      },
      {
        id: 3,
        username: 'user3',
        chatDate: null,
      },
    ],
  },
};

const participatingPosts = {
  data: {
    size: 8,
    currentPage: 0,
    maxPage: 1,
    data: [
      {
        id: 10,
        category: 'study',
        title: 'participant0',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'participant0',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
    ],
  },
};

const applicatedPosts = {
  data: {
    size: 8,
    currentPage: 0,
    maxPage: 2,
    data: [
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'application',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
    ],
  },
};

const createdPosts = {
  data: {
    size: 8,
    currentPage: 0,
    maxPage: 1,
    data: [
      {
        id: 10,
        category: 'study',
        title: 'Study0',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
      {
        id: 10,
        category: 'study',
        title: 'Study0',
        writer: 'user',
        createdAt: '2021-05-02T23:22:00.452893',
      },
    ],
  },
};

function loadPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `/api/${data.category}?offset=${data.page}`,
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
    console.log('awefawefawefawef');
    const result = yield call(loadPostsAPI, action.data);
    //const result = { data: loadDummyPosts(action.data) };
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
    url: `/api/${data.category}?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    //const result = dummyPost;
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
    url: `/api/post`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
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
    url: `/api/app/join?postId=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username },
  });
}

// 됨
function* joinPost(action) {
  try {
<<<<<<< HEAD
    //console.log(action.data);
    const result = yield call(joinPostAPI, action.data);
    //const result = { data: { username: 'username' } };

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
    url: `/api/app/cancle?postId=${data.postId}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username },
  });
}

//됨
function* cancelJoin(action) {
  try {
    //console.log(action.data);
    const result = yield call(cancelJoinAPI, action.data);
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

function loadCreatedPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `/api/post/my?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
//됨
function* loadCreatedPosts(action) {
  try {
    const result = createdPosts;
    //const result = yield call(loadCreatedPostsAPI, action.data);
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
    url: `/api/post/participants?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
//됨
function* loadParticipatingPosts(action) {
  try {
    const result = participatingPosts;
    //const result = yield call(loadParticipatingPostsAPI, action.data);
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
    url: `/api/post/application?username=${data.username}&offset=${data.page}`,
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

function* watchCancleJoin() {
  yield takeLatest(CANCEL_JOIN_REQUEST, cancelJoin);
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

// function* watchPostChat() {
//   yield takeLatest(ADD_POST_REQUEST, postChat);
// }

export default function* chattingSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchJoinPost),
    fork(watchCancleJoin),
    fork(watchLoadCreatePosts),
    fork(watchLoadParticipatingPosts),
    fork(watchLoadApplicatedPosts),
  ]);
}
