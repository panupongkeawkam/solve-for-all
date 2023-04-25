import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { authAxios } from "../utils/axios.config";

const initialState = {
  questionsList: [],
  fetchingQuestions: false,
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const res = await axios.get(`/api/questions`);
    return res.data.questions;
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    appendQuestion: (state, action) => {
      const question = action.payload;
      state.questionsList = [...state.questionsList, question];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.fetchingQuestions = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.fetchingQuestions = false;
        state.questionsList = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.fetchingQuestions = false;
      });
  },
});

export const { appendQuestion } = questionSlice.actions;

export default questionSlice.reducer;
