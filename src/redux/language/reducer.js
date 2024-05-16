import * as types from './action-types';

// reducers/languageReducer.js
//import { SET_LANGUAGE } from '../actions/languageActions';

const initialState = {
  language: 'en', // idioma padrão
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
