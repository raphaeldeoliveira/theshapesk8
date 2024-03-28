import * as types from './action-types';

export const storeUserId = (userId) => ({
  type: types.STORE_USER_ID,
  payload: userId,
});

export const checkUserId = () => ({
  type: types.CHECK_USER_ID,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

export const isUserLoggedIn = () => ({
  type: types.IS_USER_LOGGED_IN,
});