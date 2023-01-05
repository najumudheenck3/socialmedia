import {createSlice} from '@reduxjs/toolkit'

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        adminToken:null,
        adminName:null
    },
    reducers:{
        setadminDetails:(state,action)=>{
            console.log(action.payload,'peylodad data');
            const adminData=action.payload;
            state.adminName=adminData.name;
            state.adminToken=adminData.token;
        },
        adminDataClear:(state)=>{
            state.adminToken=null;
            state.adminName=null;
        }
    }
})

export const adminActions=adminSlice.actions;

export default adminSlice;