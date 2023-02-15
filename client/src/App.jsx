import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from "./axios/axios.config";

import theme from "./style/mui.config";
import store from "./store/index";
import { fetchPosts } from "./store/postSlice";

import SignUpScreen from "./containers/SignUpScreen";
import LoginScreen from "./containers/LoginScreen";
import HomeScreen from "./containers/HomeScreen";

export default () => {
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette["base-1"].main;
    store.dispatch(fetchPosts());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route index path="/*" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
