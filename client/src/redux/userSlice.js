import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:"user",
    initialState:{
        userToken:null,
        userName:null
    },
    reducers:{
        setUserDetails:(state,action)=>{
            console.log(action.payload,'peylodad data');
            const userData=action.payload;
            state.userName=userData.name;
            state.userToken=userData.token;
        },
        userDataClear:(state)=>{
            state.userToken=null;
            state.userName=null;
        }
    }
})

export const userActions=userSlice.actions;

export default userSlice;