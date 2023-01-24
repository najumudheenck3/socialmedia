import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'AddPost',
  initialState: {
    AddPost: false,
  },
  reducers: {
    postAdd(state) {
        state.AddPost = true;
    },
    Update(state) {
      state.AddPost = false;
    },
  },
});

export const AddPostActions = postSlice.actions;
export default postSlice;
