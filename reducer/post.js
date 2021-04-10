import produce from 'immer';

const initialState = {
  isLoadingPosts: false,
  isLoadedPosts: false,
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
      id: 266,
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
      id: 266,
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
      id: 266,
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
