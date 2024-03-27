import { combineReducers } from "redux";
import searchReducer from "./search/reducer";
import cartReducer from "./cart/reducer";
import userReducer from "./login/reducer";

const rootReducer = combineReducers({ searchReducer, cartReducer, userReducer });

export default rootReducer;
