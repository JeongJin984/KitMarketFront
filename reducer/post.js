import produce from 'immer';

const initialState = {
  isLoadingPosts: false,
  isLoadedPosts: false,
  isLoadingPost: false,
  isLoadedPost: false,
  singlePost: {
    createdAt: '',
    applications: [],
    participants: [],
  },
  meta: {},
  mainPosts: [],
  isPosting: false,
  isPosted: false,
  isJoiningPost: false,
  isJoinedPost: false,
  isCancellingJoin: false,
  isCancelledJoin: false,
  createdPosts: {
    data: [],
  },
  participatingPosts: {
    data: [],
  },
  applicatedPosts: {
    data: [],
  },
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

export const CANCEL_JOIN_REQUEST = 'CANCEL_JOIN_REQUEST';
export const CANCEL_JOIN_SUCCESS = 'CANCEL_JOIN_SUCCESS';
export const CANCEL_JOIN_FAILURE = 'CANCEL_JOIN_FAILURE';

export const LOAD_CREATED_POSTS_REQUEST = 'LOAD_CREATED_POSTS_REQUEST';
export const LOAD_CREATED_POSTS_SUCCESS = 'LOAD_CREATED_POSTS_SUCCESS';
export const LOAD_CREATED_POSTS_FAILURE = 'LOAD_CREATED_POSTs_FAILURE';

export const LOAD_PARTICIPATING_POSTS_REQUEST =
  'LOAD_PARTICIPATING_POSTS_REQUEST';
export const LOAD_PARTICIPATING_POSTS_SUCCESS =
  'LOAD_PARTICIPATING_POSTS_SUCCESS';
export const LOAD_PARTICIPATING_POSTS_FAILURE =
  'LOAD_PARTICIPATING_POSTS_FAILURE';

export const LOAD_APPLICATED_POSTS_REQUEST = 'LOAD_APPLICATED_POSTS_REQUEST';
export const LOAD_APPLICATED_POSTS_SUCCESS = 'LOAD_APPLICATED_POSTS_SUCCESS';
export const LOAD_APPLICATED_POSTS_FAILURE = 'LOAD_APPLICATED_POSTS_FAILURE';

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

export const cancelJoinRequest = (data) => {
  return {
    type: CANCEL_JOIN_REQUEST,
    data,
  };
};

export const loadCreatedPostsRequest = (data) => {
  return {
    type: LOAD_CREATED_POSTS_REQUEST,
    data,
  };
};

export const loadParticipatingPostsRequest = (data) => {
  return {
    type: LOAD_PARTICIPATING_POSTS_REQUEST,
    data,
  };
};

export const loadApplicatedPostsRequest = (data) => {
  return {
    type: LOAD_APPLICATED_POSTS_REQUEST,
    data,
  };
};

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST:
        console.log('qwerqwerqwer');
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        break;

      case LOAD_MAIN_POSTS_SUCCESS:
        console.log('zxcvzxcvzxcv');
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
        draft.singlePost.participants.push(action.data);
        draft.error = '';
        break;

      case JOIN_POST_FAILURE:
        draft.isJoiningPost = false;
        draft.isJoinedPost = false;
        draft.error = action.error;
        break;

      case CANCEL_JOIN_REQUEST:
        draft.isCancellingJoin = true;
        draft.isCancelledJoin = false;
        draft.error = '';
        break;

      case CANCEL_JOIN_SUCCESS:
        draft.isCancellingJoin = false;
        draft.isCancelledJoin = true;
        draft.error = '';
        break;

      case CANCEL_JOIN_FAILURE:
        draft.isCancellingJoin = false;
        draft.isCancelledJoin = false;
        draft.error = '';
        break;

      case LOAD_CREATED_POSTS_REQUEST:
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
        break;

      case LOAD_CREATED_POSTS_SUCCESS:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.createdPosts = action.data;
        draft.error = '';
        break;

      case LOAD_CREATED_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      case LOAD_PARTICIPATING_POSTS_REQUEST:
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
        break;

      case LOAD_PARTICIPATING_POSTS_SUCCESS:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.participatingPosts = action.data;
        draft.error = '';
        break;

      case LOAD_PARTICIPATING_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      case LOAD_APPLICATED_POSTS_REQUEST:
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
        break;

      case LOAD_APPLICATED_POSTS_SUCCESS:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.applicatedPosts = action.data;
        draft.error = '';
        break;

      case LOAD_APPLICATED_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
