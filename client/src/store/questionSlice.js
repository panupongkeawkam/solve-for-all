import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios.config";

const initialState = {
  questionsList: [],
  fetchingQuestions: false,
};

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const res = await axios.get(`/api/questions`);
  return res.data.questions;
});

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    appendQuestion: (state, action) => {
      const question = action.payload
      state.questionsList = [...state.questionsList, question]
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        // console.log("fetching questions...");
        state.fetchingQuestions = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        // console.log("questions has fetched");
        state.fetchingQuestions = false;
        // action.payload are returned value from async fetchQuestions()
        state.questionsList = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        // console.log("fetch questions error!");
        state.fetchingQuestions = false;
      })
  },
});

export const { appendQuestion } = questionSlice.actions

export default questionSlice.reducer;
