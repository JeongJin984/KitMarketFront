import produce from 'immer';

const initialState = {
  isLoadingPosts: false,
  isLoadedPosts: false,
  isLoadingPost: false,
  isLoadedPost: false,
  singlePost: {
    id: '',
    writer: '',
    title: '',
    content: '',
    deadLine: '',
    createdAt: '',
    maxNum: '',
    curNum: '',
    category: '',
    applications: [],
    participants: [],
  },
  meta: {},
  mainPosts: [],
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

export const loadMainPostsRequest = (data) => {
  return {
    type: LOAD_MAIN_POSTS_REQUEST,
    data,
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
        break;

      case JOIN_POST_SUCCESS:
        draft.isJoiningPost = false;
        draft.isJoinedPost = true;
        draft.singlePost.applications.push(action.data);
        draft.error = '';
        break;

      case JOIN_POST_FAILURE:
        draft.isJoiningPost = false;
        draft.isJoinedPost = false;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
