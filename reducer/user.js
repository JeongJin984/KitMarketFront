import produce from 'immer';

const initialState = {
  error: '',
  isLoggedIn: false,
  isLogginIn: false,
  isSignedUp: false,
  isSigningUp: false,
  me: null,
  isLoadingProfile: false,
  isLoadedProfile: false,
  profile: null,
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOAD_PROFILE_REQUEST = 'LOAD_PROFILE_REQUEST';
export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
export const LOAD_PROFILE_FAILURE = 'LOAD_PROFILE_FAILURE';

export const loginRequest = (data) => {
  console.log('loginRequest', data);
  return {
    type: LOGIN_REQUEST,
    data,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const signUpRequest = (data) => {
  return {
    type: SIGNUP_REQUEST,
    data,
  };
};

export const loadProfileRequest = (data) => {
  return {
    type: LOAD_PROFILE_REQUEST,
    data,
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
        break;

      case SIGNUP_REQUEST:
        draft.isSigningUp = true;
        draft.isSignedUp = false;
        draft.error = '';
        break;

      case SIGNUP_SUCCESS:
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        draft.me = action.data;
        break;

      case SIGNUP_FAILURE:
        draft.isSigningUp = false;
        draft.isSignedUp = false;
        draft.error = action.error;
        break;

      case LOAD_PROFILE_REQUEST:
        draft.isLoadingProfile = true;
        draft.isLoadedProfile = false;
        draft.error = '';
        break;

      case LOAD_PROFILE_SUCCESS:
        draft.isLoadingProfile = false;
        draft.isLoadedProfile = true;
        draft.profile = action.data;
        break;

      case LOAD_PROFILE_FAILURE:
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default userReducer;
