import {createSlice} from '@reduxjs/toolkit'

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        userToken:null,
        userName:null
    },
    reducers:{
        setAdminDetails:(state,action)=>{
            const userData=action.payload;
            state.userName=userData.name;
            state.userToken=userData.token;
        },
        adminDataClear:(state)=>{
            state.userToken=null;
            state.userName=null;
        }
    }
})

export const adminActions=adminSlice.actions;

export default adminSlice;