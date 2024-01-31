import { configureStore } from "@reduxjs/toolkit";
import postsReducers from "./postsReducers";

const store = configureStore({
  reducer: {
    posts: postsReducers,
  },
});

export default store;
