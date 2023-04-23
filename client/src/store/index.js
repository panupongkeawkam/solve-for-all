import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import userSlice from "./userSlice";
import tagSlice from "./tagSlice";

export default configureStore({
  reducer: {
    question: questionReducer,
    user: userSlice,
    tag: tagSlice
  },
});
