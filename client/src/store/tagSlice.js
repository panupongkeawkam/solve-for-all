import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../utils/axios.config";

const initialState = {
  tags: [],
  fetchingTags: false,
  tagsPageTagSearchQuery: "",
};

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const res = await axios.get(`/api/tags`);
  return res.data.tags;
});

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTagsPageTagSearchQuery: (state, action) => {
      const searchQuery = action.payload;
      state.tagsPageTagSearchQuery = searchQuery.trim();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTags.pending, (state, action) => {
        state.fetchingTags = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.fetchingTags = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.fetchingTags = false;
      });
  },
});

export const { setTagsPageTagSearchQuery } = tagSlice.actions;

export default tagSlice.reducer;
