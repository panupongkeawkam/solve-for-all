import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../utils/axios.config";

const initialState = {
  tags: [],
  tagsPageTagSearchQuery: "",
};

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (arg, { getState }) => {
    const res = await axios.get(`/api/tags`);
    return res.data.tags;
  }
);

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
      .addCase(fetchTags.pending, (state, action) => {})
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {});
  },
});

export const { setTagsPageTagSearchQuery } = tagSlice.actions;

export default tagSlice.reducer;
