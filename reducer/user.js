import produce from 'immer';
import {
  LOAD_PROFILE_FAILURE,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from '../data/eventName/userEventName';

export const initialState = {
  error: null,
  isLoggedIn: false,
  isLogginIn: false,
  isSignedUp: false,
  isSigningUp: false,
  me: null,
  isLoadingProfile: false,
  isLoadedProfile: false,
  profile: null,
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
        break;

      case LOGIN_FAILURE:
        draft.isLogginIn = false;
        draft.isLoggedIn = false;
        draft.error = action.error;
        draft.me = null;
        break;

      case LOAD_USER_REQUEST:
        draft.isLoggedIn = false;
        draft.isLoggingIn = true;
        draft.error = '';
        break;

      case LOAD_USER_SUCCESS:
        draft.isLoggedIn = true;
        draft.isLogginIn = false;
        draft.me = action.data;
        break;

      case LOAD_USER_FAILURE:
        draft.isLoggedIn = false;
        draft.isLogginIn = false;
        draft.error = action.error;
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
