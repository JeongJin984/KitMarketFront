import {
  LOAD_PROFILE_REQUEST,
  LOAD_USER_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  UPDATE_PROFILE_REQUEST,
} from '../eventName/userEventName';

export const loginRequest = (data) => {
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

export const loadUserRequest = () => {
  console.log('load');
  return {
    type: LOAD_USER_REQUEST,
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

export const updateProfileRequest = (data) => {
  return {
    type: UPDATE_PROFILE_REQUEST,
    data,
  };
};
