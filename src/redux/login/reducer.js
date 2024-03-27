import * as types from './action-types';

const initialState = {
  loggedIn: false,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
