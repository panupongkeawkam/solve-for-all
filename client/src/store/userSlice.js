import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

import axios from "../utils/axios.config";

const initialState = {
  user: null,
  authenticatingUser: false,
  suggestedUsers: [],
  suggestingUsers: false,
};

export const authenticateUser = createAsyncThunk("users/authenticateUser", async () => {
  const userId = Cookies.get("userId")

  if (userId) {
    try {
      const res = await axios.get(`/api/users/${userId}`)
      return res.data.user
    } catch (err) {
      // when it not found user
      return null
    }
  }

  return null
});

export const fetchSuggestedUsers = createAsyncThunk("users/fetchSuggestedUsers", async () => {
  const res = await axios.get(`/api/users/suggest`)
  return res.data.users
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload
      Cookies.set("userId", user._id, { expires: 1 })
      state.user = user
    }
  },
  extraReducers(builder) {
    builder
      .addCase(authenticateUser.pending, (state, action) => {
        state.authenticatingUser = true
      }).addCase(authenticateUser.fulfilled, (state, action) => {
        state.authenticatingUser = false
        state.user = action.payload
      }).addCase(authenticateUser.rejected, (state, action) => {
        state.authenticatingUser = false
        state.user = null
      })
      .addCase(fetchSuggestedUsers.pending, (state, action) => {
        state.suggestingUsers = true
      }).addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.suggestingUsers = false
        state.suggestedUsers = action.payload
      }).addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.suggestingUsers = false
        state.suggestedUsers = []
      })
  },
});

export const { setUser } = userSlice.actions

export default userSlice.reducer;
