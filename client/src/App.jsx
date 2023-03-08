import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import axios from "./utils/axios.config";

import store from "./store/index";
import theme from "./style/mui.config";
import { fetchPosts } from "./store/postSlice";

// app screens
import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import SignUpScreen from "./containers/SignUpScreen";
import NotFoundScreen from "./containers/NotFoundScreen";

// children of HomeScreen
import HomePage from "./pages/HomePage";
import InterestedPage from "./pages/InterestedPage";
import TagsPage from "./pages/TagsPage";
import ComponentTestPage from "./pages/ComponentTestPage";
import ProfilePage from "./pages/ProfilePage";

export default () => {
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette["base-1"].main;
    store.dispatch(fetchPosts());
  }, []);

  // set up router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/interested",
          element: <InterestedPage />,
        },
        {
          path: "/tags",
          element: <TagsPage />,
        },
        {
          path: "/users/:userId",
          element: <ProfilePage />,
        },
        {
          path: "/test",
          element: <ComponentTestPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/signup",
      element: <SignUpScreen />,
    },
    {
      path: "*",
      element: <NotFoundScreen />,
    },
  ]);

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StoreProvider>
  );
};
