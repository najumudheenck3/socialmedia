import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import { alertSlice } from "./alertSlice";

const rootReducer=combineReducers({
    alerts:alertSlice.reducer,
    user:userSlice.reducer,
    admin:adminSlice.reducer

})

const store=configureStore({
    reducer:rootReducer
})

export default store;