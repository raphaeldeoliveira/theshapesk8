import * as types from './action-types';

const initialState = {
  userId: localStorage.getItem('userId') || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_USER_ID:
      localStorage.setItem('userId', action.payload);
      return {
        ...state,
        userId: action.payload,
      };
    case types.CHECK_USER_ID:
      return {
        ...state,
        userId: localStorage.getItem('userId') || null,
      };
    case types.LOGOUT_USER:
      localStorage.removeItem('userId');
      return {
        ...state,
        userId: null,
      };
    case types.IS_USER_LOGGED_IN:
      return {
        ...state,
        loggedIn: !!localStorage.getItem('userId'),
      };
    default:
      return state;
  }
};

export default userReducer;