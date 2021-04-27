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

const dummyPosts = [
  {
    size: 8,
    currentPage: 0,
    maxPage: 3,
    data: [
      {
        id: 1,
        writer: 'Account0',
        title: 'Contest1',
        content: "I'm Contest1",
        deadLine: 4,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 2,
        writer: 'Account1',
        title: 'Study2',
        content: "I'm Study2",
        deadLine: 10,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'study',
      },
      {
        id: 3,
        writer: 'Account2',
        title: 'Contest3',
        content: "I'm Contest3",
        deadLine: 13,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 2,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 4,
        writer: 'Account3',
        title: 'Contest4',
        content: "I'm Contest4",
        deadLine: 21,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 2,
        category: 'contest',
      },
      {
        id: 5,
        writer: 'Account0',
        title: 'Contest5',
        content: "I'm Contest5",
        deadLine: 24,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 3,
        category: 'contest',
      },
      {
        id: 6,
        writer: 'Account0',
        title: 'Contest6',
        content: "I'm Contest6",
        deadLine: 27,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 7,
        writer: 'Account0',
        title: 'Contest7',
        content: "I'm Contest7",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 5,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 8,
        writer: 'Account0',
        title: 'Contest8',
        content: "I'm Contest8",
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
        title: 'Contest9',
        content: "I'm Contest9",
        deadLine: 4,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 10,
        writer: 'Account1',
        title: 'Study10',
        content: "I'm Study10",
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
        title: 'Contest12',
        content: "I'm Contest12",
        deadLine: 21,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 2,
        category: 'contest',
      },
      {
        id: 13,
        writer: 'Account0',
        title: 'Contest13',
        content: "I'm Contest13",
        deadLine: 24,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 3,
        category: 'contest',
      },
      {
        id: 14,
        writer: 'Account0',
        title: 'Contest14',
        content: "I'm Contest14",
        deadLine: 27,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 15,
        writer: 'Account0',
        title: 'Contest15',
        content: "I'm Contest15",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 5,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 16,
        writer: 'Account0',
        title: 'Contest16',
        content: "I'm Contest16",
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
        title: 'Contest17',
        content: "I'm Contest17",
        deadLine: 4,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 18,
        writer: 'Account1',
        title: 'Study18',
        content: "I'm Study18",
        deadLine: 10,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'study',
      },
      {
        id: 19,
        writer: 'Account2',
        title: 'Contest19',
        content: "I'm Contest19",
        deadLine: 13,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 2,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 20,
        writer: 'Account3',
        title: 'Contest20',
        content: "I'm Contest20",
        deadLine: 21,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 2,
        category: 'contest',
      },
      {
        id: 21,
        writer: 'Account0',
        title: 'Contest21',
        content: "I'm Contest21",
        deadLine: 24,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 3,
        category: 'contest',
      },
      {
        id: 22,
        writer: 'Account0',
        title: 'Contest22',
        content: "I'm Contest22",
        deadLine: 27,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 4,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 23,
        writer: 'Account0',
        title: 'Contest23',
        content: "I'm Contest23",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 5,
        curNum: 1,
        category: 'contest',
      },
      {
        id: 24,
        writer: 'Account0',
        title: 'Contest24',
        content: "I'm Contest24",
        deadLine: 28,
        createdAt: '2021-04-10T12:56:18.583858',
        maxNum: 3,
        curNum: 1,
        category: 'contest',
      },
    ],
  },
];

const loadDummyPost = (data) => {
  for (let p of dummyPosts) {
    if (p.currentPage === data.page) {
      console.log('p', data);
      return p;
    }
  }
};

function* loadPosts(action) {
  try {
    // const result = yield call(loadPostsAPI, action.data);
    const result = { data: loadDummyPost(action.data) };
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
    url: `/api/${data.category}?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* loadPost(action) {
  try {
    //const result = yield call(loadPostAPI, action.data);
    const result = {
      data: {
        id: 9,
        writer: 'Account0',
        title: 'Study0',
        content: "I'm Study0",
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
            content: '댓글 1입니다.',
            chatDate: null,
          },
          {
            id: 2,
            content: '댓글 2입니다.',
            chatDate: null,
          },
          {
            id: 3,
            content: '댓글 3입니다.',
            chatDate: null,
          },
        ],
      },
    };
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
    url: `/api/join`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username, postId: data.id },
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
