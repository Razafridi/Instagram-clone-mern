import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    addPosts: (state, action) => {
      state.posts = action.payload;
    },
    addLike: (state, action) => {
      for (let post in state.posts) {
        if (state.posts[post]._id === action.payload.id) {
          state.posts[post] = action.payload.post;
        }
      }
    },

    addCommentToPost: (state, action) => {
      for (let post in state.posts) {
        if (state.posts[post]._id === action.payload.id) {
          state.posts[post] = action.payload.post;
        }
      }
    },
  },
});

export const { addPosts, addLike, addCommentToPost } = postsSlice.actions;
export default postsSlice.reducer;
