import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios.config";

const initialState = {
  questionsList: [],
  fetchingQuestions: false,
  homePageQuestionSearchQuery: "",
  interestedPageQuestionSearchQuery: "",
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
    setHomePageQuestionSearchQuery: (state, action) => {
      const searchQuery = action.payload;
      state.homePageQuestionSearchQuery = searchQuery.trim();
    },
    setInterestedPageQuestionSearchQuery: (state, action) => {
      const searchQuery = action.payload;
      state.interestedPageQuestionSearchQuery = searchQuery.trim();
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

export const {
  appendQuestion,
  setHomePageQuestionSearchQuery,
  setInterestedPageQuestionSearchQuery,
} = questionSlice.actions;

export default questionSlice.reducer;
