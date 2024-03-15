import { combineReducers } from "redux";

import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import searchReducer from "./search/reducer";

const rootReducer = combineReducers({ userReducer, cartReducer, searchReducer });

export default rootReducer;
