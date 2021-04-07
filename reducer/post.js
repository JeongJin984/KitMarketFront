import produce from 'immer';

const initialState = {
  isLoadingPosts: false,
  isLoadedPosts: false,
  mainPosts: [
    {
      id: 346,
      account: 'Account0',
      title: 'Contest25',
      content: "I'm Contest25",
      applications: null,
    },
    {
      id: 326,
      account: 'Account0',
      title: 'Contest20',
      content: "I'm Contest20",
      applications: null,
    },
    {
      id: 306,
      account: 'Account0',
      title: 'Contest15',
      content: "I'm Contest15",
      applications: null,
    },
    {
      id: 286,
      account: 'Account0',
      title: 'Contest10',
      content: "I'm Contest10",
      applications: null,
    },
    {
      id: 266,
      account: 'Account0',
      title: 'Contest5',
      content: "I'm Contest5",
      applications: null,
    },
  ],
  isPosting: false,
  isPosted: false,
  error: '',
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const loadMainPostsRequest = (category) => {
  return {
    type: LOAD_MAIN_POSTS_REQUEST,
    category,
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
        draft.mainPosts = action.data;
        break;
      case LOAD_MAIN_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
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
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
