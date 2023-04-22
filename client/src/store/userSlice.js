import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "63ec5a42ae5dba49b35b6e0d",
    username: "helloworld123",
    email: "helloworld@gmail.com",
    name: "Hello World",
    birthday: "2023-02-15T05:09:24.216Z",
    image: null,
    bio: "Hello everyone my name is Hello nice to meet you",
    reputation: 0,
    tags: [{ _id: "flsiunso4u45", name: "react-native" }],
    answered: 0,
    solved: 0,
    createdAt: "2023-02-15T05:19:27.355Z",
    updatedAt: "2023-02-15T05:19:27.355Z",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default userSlice.reducer;
