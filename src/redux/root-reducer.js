import { combineReducers } from "redux";
import searchReducer from "./search/reducer";
import cartReducer from "./cart/reducer";

const rootReducer = combineReducers({ searchReducer, cartReducer });

export default rootReducer;
