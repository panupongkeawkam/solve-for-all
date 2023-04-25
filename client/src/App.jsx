import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import axios from "./utils/axios.config";

import store from "./store/index";
import theme from "./style/mui.config";
import { fetchQuestions } from "./store/questionSlice";
import { authenticateUser } from "./store/userSlice";

// app screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

// children of HomeScreen
import HomePage from "./pages/HomePage";
import InterestedPage from "./pages/InterestedPage";
import TagsPage from "./pages/TagsPage";
import ComponentTestPage from "./pages/ComponentTestPage";
import ProfilePage from "./pages/ProfilePage";
import QuestionPage from "./pages/QuestionPage";
import TagDetailPage from "./pages/TagDetailPage";

export default () => {
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette["base-1"].main;

    store.dispatch(fetchQuestions());
    store.dispatch(authenticateUser());
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
          path: "/questions/:questionId",
          element: <QuestionPage />,
        },
        {
          path: "/tags/:tagId",
          element: <TagDetailPage />,
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
