import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Snackbar, Slide, Alert } from "@mui/material";
import * as Icon from "@mui/icons-material";
import Cookies from "js-cookie";

import palette from "../style/palette.js";
import axios from "../utils/axios.config";
import { setUser } from "../store/userSlice.js";

import TextField from "../components/inputs/TextField.jsx";
import PasswordField from "../components/inputs/PasswordField.jsx";
import Logo from "../components/Logo.jsx";
import Button from "../components/buttons/Button.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import store from "../store/index.js";

export default () => {
  if (Cookies.get("accessToken")) {
    window.location.href = "/";
    return;
  }

  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const usernameChangeHandler = (text) => {
    setUsernameError(false);
    setUsernameErrorMessage("");
    setUsername(text);
  };

  const passwordChangeHandler = (password) => {
    setPasswordError(false);
    setPasswordErrorMessage("");
    setPassword(password);
  };

  // login
  const loginHandler = () => {
    if (username.trim() === "") {
      setUsernameError(true);
      setUsernameErrorMessage("Please fill an username");
      return;
    }

    if (password.trim() === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Please fill an username");
      return;
    }

    setLoading(true);

    axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then((res) => {
        store.dispatch(setUser(res.data.user));
        setLoading(false);
        window.location.href = "/";
      })
      .catch((err) => {
        setLoading(false);
        setShowSnackbar(true);

        if (err.response.data.message.includes("cred")) {
          setUsernameError(true);
          setPasswordError(true);
          setErrorMessage("Wrong username or password");
        } else {
          setErrorMessage(
            err.response.data.message ||
              "Something when wrong, please try again"
          );
        }
      });
  };

  return (
    <div
      className="h-screen w-screen flex flex-row justify-center items-center "
      style={{ background: palette["base-1"] }}
    >
      <div
        className="2xl:basis-5/12 basis-1/2 flex flex-col rounded-[12px] 2xl:h-4/6 h-5/6 py-20 px-32 "
        style={{ backgroundColor: palette["base-2"], alignItems: "between" }}
      >
        <div className="flex flex-col h-full justify-center">
          <div className="flex flex-col w-full 2xl:px-16 2xl:py-8 py-4 mb-20">
            <div className="mb-2">
              <h1 style={{ color: palette["content-1"] }}>Sign in</h1>
            </div>
            <div className="mb-10">
              <p style={{ color: palette["content-2"] }}>
                Identify yourself for start ask for a question to our community
              </p>
            </div>
            <div className="mb-2">
              <TextField
                value={username}
                label="Username"
                error={usernameError}
                helperText={usernameError ? usernameErrorMessage : null}
                inputProps={{
                  maxLength: 20,
                }}
                onTextChange={usernameChangeHandler}
              />
            </div>
            <div className="mb-10">
              <PasswordField
                value={password}
                label="Password"
                error={passwordError}
                helperText={passwordError ? passwordErrorMessage : null}
                inputProps={{
                  maxLength: 40,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loginHandler();
                  }
                }}
                onPasswordChange={passwordChangeHandler}
              />
            </div>
            <div className="mb-2 w-full">
              <Button
                color="primary"
                text="Login"
                onClick={loginHandler}
                fullWidth
              />
            </div>
            <div className="flex w-full justify-center">
              <div
                style={{ color: palette["content-2"], fontSize: "16px" }}
                className="mr-1"
              >
                Didn’t have account yet?
              </div>
              <RouterLink
                to="/signup"
                style={{ color: palette.secondary }}
                className="opacity-90 hover:opacity-100 transition duration-100"
              >
                Sign up
                <Icon.ArrowForward fontSize="16px" sx={{ ml: "2px" }} />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <Slide direction="up" in={showSnackbar} mountOnEnter unmountOnExit>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={5000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert
            severity="error"
            sx={{ width: "100%", border: `1px solid ${palette.wrong}` }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Slide>
      <Logo />
      <LoadingIndicator active={loading} />
    </div>
  );
};
