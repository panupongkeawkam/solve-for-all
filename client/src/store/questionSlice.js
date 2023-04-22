import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios.config";

const initialState = {
  questionsList: [],
  fetchingQuestions: false,
};

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const response = await axios.get("/posts", {
    baseURL: "https://jsonplaceholder.typicode.com",
  });
  return response.data;
});

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
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
      });
  },
});

export default questionSlice.reducer;
