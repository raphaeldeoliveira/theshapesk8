import { combineReducers } from "redux";
import searchReducer from "./search/reducer";
import cartReducer from "./cart/reducer";
import userReducer from "./login/reducer";
import languageReducer from "./language/reducer";

const rootReducer = combineReducers({ searchReducer, cartReducer, userReducer, languageReducer });

export default rootReducer;
