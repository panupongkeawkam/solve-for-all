import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import userSlice from "./userSlice";
import tagSlice from "./tagSlice";
import answerSlice from "./answerSlice";

export default configureStore({
  reducer: {
    question: questionReducer,
    user: userSlice,
    tag: tagSlice,
    answer: answerSlice
  },
});
