import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:"user",
    initialState:{
        userDetails:null,
    },
    reducers:{
        setUserDetails:(state,action)=>{
            console.log(action.payload,'peylodad data');
            const userData=action.payload;
            userData.password=undefined
            state.userDetails=userData;
        },
        userDataClear:(state)=>{
            state.userDetails=null;
        }
    }
})

export const userActions=userSlice.actions;

export default userSlice;