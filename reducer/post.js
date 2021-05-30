import produce from 'immer';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  CANCEL_JOIN_FAILURE,
  CANCEL_JOIN_REQUEST,
  CANCEL_JOIN_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  JOIN_POST_FAILURE,
  JOIN_POST_REQUEST,
  JOIN_POST_SUCCESS,
  PERMIT_JOIN_REQUEST,
  PERMIT_JOIN_SUCCESS,
  PERMIT_JOIN_FAILURE,
  LOAD_APPLICATED_POSTS_FAILURE,
  LOAD_APPLICATED_POSTS_REQUEST,
  LOAD_APPLICATED_POSTS_SUCCESS,
  LOAD_CREATED_POSTS_FAILURE,
  LOAD_CREATED_POSTS_REQUEST,
  LOAD_CREATED_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_PARTICIPATING_POSTS_FAILURE,
  LOAD_PARTICIPATING_POSTS_REQUEST,
  LOAD_PARTICIPATING_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  OPERATE_POST_FAILURE,
  OPERATE_POST_REQUEST,
  OPERATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from '../data/eventName/postEventName';

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
  isPermittingJoin: false,
  isPermittedJoin: false,
  createdPosts: {
    data: [],
  },
  participatingPosts: {
    data: [],
  },
  applicatedPosts: {
    data: [],
  },
  isDeletingPost: false,
  isDeletedPost: false,
  isUpdatingPost: false,
  isUpdatedPost: false,
  isOperatingPost: false,
  isOperatedPost: false,
  error: '',
};

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST:
        console.log('qwerqwerqwer');
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
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
        draft.singlePost.applications.push(action.data);
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
        draft.isJoinedPost = false;
        draft.singlePost.applications.pop();
        draft.error = '';
        break;

      case CANCEL_JOIN_FAILURE:
        draft.isCancellingJoin = false;
        draft.isCancelledJoin = false;
        draft.error = action.error;
        break;

      case PERMIT_JOIN_REQUEST:
        draft.isPermittingJoin = true;
        draft.isPermittedJoin = false;
        draft.error = '';
        break;

      case PERMIT_JOIN_SUCCESS:
        draft.isPermittingJoin = false;
        draft.isPermittedJoin = true;
        draft.error = '';
        break;

      case PERMIT_JOIN_FAILURE:
        draft.isPermittingJoin = false;
        draft.isPermittedJoin = false;
        draft.error = action.error;
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

      case DELETE_POST_REQUEST:
        draft.isDeletingPost = true;
        draft.isDeletedPost = false;
        draft.error = '';
        break;

      case DELETE_POST_SUCCESS:
        draft.isDeletingPost = false;
        draft.isDeletedPost = true;
        draft.error = '';
        break;

      case DELETE_POST_FAILURE:
        draft.isDeletingPost = false;
        draft.isDeletedPost = false;
        draft.error = action.error;
        break;

      case UPDATE_POST_REQUEST:
        draft.isUpdatingPost = true;
        draft.isUpdatedPost = false;
        draft.error = '';
        break;

      case UPDATE_POST_SUCCESS:
        draft.isUpdatingPost = false;
        draft.isUpdatedPost = true;
        draft.error = '';
        break;

      case UPDATE_POST_FAILURE:
        draft.isUpdatingPost = false;
        draft.isUpdatedPost = false;
        draft.error = action.error;
        break;

      case OPERATE_POST_REQUEST:
        draft.isOperatingPost = true;
        draft.isOperatedPost = false;
        draft.error = '';
        break;

      case OPERATE_POST_SUCCESS:
        draft.isOperatingPost = false;
        draft.isOperatedPost = true;
        draft.error = '';
        break;

      case OPERATE_POST_FAILURE:
        draft.isOperatingPost = false;
        draft.isOperatedPost = false;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
