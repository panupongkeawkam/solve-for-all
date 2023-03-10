import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios.config";

const initialState = {
  postsList: [],
  fetchingPosts: false,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("/posts", {
    baseURL: "https://jsonplaceholder.typicode.com",
  });
  return response.data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        // console.log("fetching posts...");
        state.fetchingPosts = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // console.log("posts has fetched");
        state.fetchingPosts = false;
        // action.payload are returned value from async fetchPosts()
        state.postsList = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // console.log("fetch posts error!");
        state.fetchingPosts = false;
      });
  },
});

export default postSlice.reducer;
