import produce from 'immer';

const initialState = {
  isLoadingPosts: false,
  isLoadedPosts: false,
  isLoadingPost: false,
  isLoadedPost: false,
  singlePost: {
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
        id: 10,
        content: '댓글 2입니다.',
        chatDate: null,
      },
      {
        id: 12,
        content: '댓글 1입니다.',
        chatDate: null,
      },
      {
        id: 11,
        content: '댓글 3입니다.',
        chatDate: null,
      },
    ],
  },
  meta: { size: 8, currentPage: 0, maxPage: 12 },
  mainPosts: [
    {
      id: 9,
      writer: 'Account0',
      title: 'Contest25',
      content: "I'm Contest25",
      deadLine: 4,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 3,
      curNum: 1,
      category: 'contest',
    },
    {
      id: 326,
      writer: 'Account1',
      title: 'Study25',
      content: "I'm Study25",
      deadLine: 10,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 4,
      curNum: 1,
      category: 'study',
    },
    {
      id: 306,
      writer: 'Account2',
      title: 'Contest25',
      content: "I'm Contest25",
      deadLine: 13,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 2,
      curNum: 1,
      category: 'contest',
    },
    {
      id: 286,
      writer: 'Account3',
      title: 'Contest25',
      content: "I'm Contest25",
      deadLine: 21,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 3,
      curNum: 2,
      category: 'contest',
    },
    {
      id: 266,
      writer: 'Account0',
      title: 'Contest25',
      content: "I'm Contest25",
      deadLine: 24,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 4,
      curNum: 3,
      category: 'contest',
    },
    {
      id: 267,
      writer: 'Account0',
      title: 'Contest25',
      content: "I'm Contest25",
      deadLine: 27,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 4,
      curNum: 1,
      category: 'contest',
    },
    {
      id: 268,
      writer: 'Account0',
      title: 'Contest25',
      content: "I'm Contest25",
      deadLine: 28,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 5,
      curNum: 1,
      category: 'contest',
    },
    {
      id: 269,
      writer: 'Account0',
      title: 'Contest25',
      content: "I'm Contest25",
      deadLine: 28,
      createdAt: '2021-04-10T12:56:18.583858',
      maxNum: 3,
      curNum: 1,
      category: 'contest',
    },
  ],
  isPosting: false,
  isPosted: false,
  isJoiningPost: false,
  isJoinedPost: false,
  error: '',
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const JOIN_POST_REQUEST = 'JOIN_POST_REQUEST';
export const JOIN_POST_SUCCESS = 'JOIN_POST_SUCCESS';
export const JOIN_POST_FAILURE = 'JOIN_POST_FAILURE';

export const loadMainPostsRequest = (category) => {
  return {
    type: LOAD_MAIN_POSTS_REQUEST,
    category,
  };
};

export const loadPostRequest = (data) => {
  return {
    type: LOAD_POST_REQUEST,
    data,
  };
};

export const addPostRequest = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};

export const joinPostRequest = (data) => {
  return {
    type: JOIN_POST_REQUEST,
    data,
  };
};

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST:
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        break;

      case LOAD_MAIN_POSTS_SUCCESS:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.mainPosts = action.data.data;
        draft.meta.size = action.data.size;
        draft.meta.currentPage = action.data.currentPage;
        draft.meta.maxPage = action.data.maxPage;
        break;

      case LOAD_MAIN_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.isLoadingPost = true;
        draft.isLoadedPost = false;
        break;

      case LOAD_POST_SUCCESS:
        draft.isLoadingPost = false;
        draft.isLoadedPost = true;
        draft.singlePost = action.data;
        break;

      case LOAD_POST_FAILURE:
        draft.isLoadingPost = false;
        draft.isLoadedPost = false;
        draft.error = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.isPosting = true;
        draft.isPosted = false;
        draft.error = '';
        break;

      case ADD_POST_SUCCESS:
        draft.isPosting = false;
        draft.isPosted = true;
        draft.error = '';
        break;

      case ADD_POST_FAILURE:
        draft.isPosting = false;
        draft.isPosted = false;
        draft.error = action.error;
        break;

      case JOIN_POST_REQUEST:
        draft.isJoiningPost = true;
        draft.isJoinedPost = false;
        draft.error = '';

      case JOIN_POST_SUCCESS:
        draft.isJoiningPost = false;
        draft.isJoinedPost = true;
        draft.error = '';

      case JOIN_POST_FAILURE:
        draft.isJoiningPost = false;
        draft.isJoinedPost = false;
        draft.error = action.error;

      default:
        break;
    }
  });
};

export default postReducer;
