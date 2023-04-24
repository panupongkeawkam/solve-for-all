import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios.config";

const initialState = {
  answersList: [],
  fetchingAnswers: false,
};

// export const fetchAnswersByQuestionId = createAsyncThunk("answers/fetchAnswersByQuestionId", async () => {
//   const res = await axios.get(`/api/answers`);
//   return res.data.questions;
// });

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    appendAnswer: (state, action) => {
      const answer = action.payload
      state.answersList = [...state.answersList, answer]
    }
  },
  extraReducers(builder) {
    // builder
    //   .addCase(fetchQuestions.pending, (state, action) => {
    //   // console.log("fetching questions...");
    //   state.fetchingQuestions = true;
    //   })
    //   .addCase(fetchQuestions.fulfilled, (state, action) => {
    //   // console.log("questions has fetched");
    //   state.fetchingQuestions = false;
    //   // action.payload are returned value from async fetchQuestions()
    //   state.questionsList = action.payload;
    //   })
    //   .addCase(fetchQuestions.rejected, (state, action) => {
    //   // console.log("fetch questions error!");
    //   state.fetchingQuestions = false;
    //   })
  },
});

export const { appendAnswer } = answerSlice.actions

export default answerSlice.reducer;
