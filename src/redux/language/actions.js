import * as types from './action-types';

export const setLanguage = (language) => ({
  type: types.SET_LANGUAGE,
  payload: language,
});
