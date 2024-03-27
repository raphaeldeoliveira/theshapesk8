import * as types from './action-types';

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: types.LOGIN_FAILURE,
});

export const logout = () => ({
  type: types.LOGOUT,
});
