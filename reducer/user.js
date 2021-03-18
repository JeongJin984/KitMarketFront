import produce from 'immer';

const initialState = {
  error: '',
  isLoggedIn: false,
  isLogginIn: false,
  me: {
    username: '',
    password: '',
  },
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const loginRequest = (data) => {
  console.log('loginRequest', data);
  return {
    type: LOGIN_REQUEST,
    data,
  };
};

export const loginSuccess = (data) => {
  console.log('loginsucc');
  sessionStorage.setItem('user', data.username);
  return {
    type: LOGIN_SUCCESS,
    data,
  };
};

export const loginFailure = (error) => {
  console.log('fail');
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const logoutRequest = () => {
  sessionStorage.removeItem('user');
  return {
    type: LOGOUT_REQUEST,
  };
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.isLogginIn = true;
        draft.isLoggedIn = false;
        draft.error = '';
        break;

      case LOGIN_SUCCESS:
        draft.isLogginIn = false;
        draft.isLoggedIn = true;
        draft.error = '';
        draft.me = action.data;
        break;

      case LOGIN_FAILURE:
        draft.isLogginIn = false;
        draft.isLoggedIn = false;
        draft.error = action.error;
        draft.me = null;
        break;

      case LOGOUT_REQUEST:
        draft.isLoggedIn = false;
        draft.me = null;
      default:
        break;
    }
  });
};

export default userReducer;
