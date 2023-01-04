import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";

const rootReducer=combineReducers({
    user:userSlice.reducer,
    admin:adminSlice.reducer

})

const store=configureStore({
    reducer:rootReducer
})

export default store;