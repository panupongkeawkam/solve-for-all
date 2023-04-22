import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    question: questionReducer,
    user: userSlice,
  },
});
