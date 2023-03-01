import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    user: userSlice,
  },
});
