import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: { username: "microsoftazure" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
