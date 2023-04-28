import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import * as Icon from "@mui/icons-material";
import Cookies from "js-cookie";

import palette from "../style/palette.js";
import axios from "../utils/axios.config";
import store from "../store/index.js";
import { setUser } from "../store/userSlice";
import { fetchTags } from "../store/tagSlice.js";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "../utils/lamda.js";

import TextField from "../components/inputs/TextField.jsx";
import PasswordField from "../components/inputs/PasswordField.jsx";
import TextArea from "../components/inputs/TextArea.jsx";
import DatePicker from "../components/inputs/DatePicker.jsx";
import Button from "../components/buttons/Button.jsx";
import TagInput from "../components/inputs/TagInput.jsx";
import Logo from "../components/Logo.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";

export default () => {
  if (Cookies.get("accessToken")) {
    window.location.href = "/";
    return;
  }

  useEffect(() => {
    store.dispatch(fetchTags());
  }, []);

  const tags = useSelector((state) => state.tag.tags);

  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepComponent, setCurrentStepComponent] = useState(
    <AccountStepForm />
  );

  // for a step 1
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState(false);
  const [rePasswordErrorMessage, setRePasswordErrorMessage] = useState("");

  // for a step 2
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [bio, setBio] = useState("");

  const [birthday, setBirthday] = useState(null);

  // for a step 3
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();

  const stepsLabel = ["Account", "Details", "Interesting"];
  const stepsComponent = [
    <AccountStepForm />,
    <DetailsStepForm />,
    <InterestingStepForm />,
  ];

  // for a step 1
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

  const rePasswordChangeHandler = (password) => {
    setRePasswordError(false);
    setRePasswordErrorMessage("");
    setRePassword(password);
  };

  // for a step 2
  const nameChangeHandler = (text) => {
    setName(text);
  };

  const emailChangeHandler = (text) => {
    setEmailError(false);
    setEmailErrorMessage("");
    setEmail(text);
  };

  const bioChangeHandler = (text) => {
    setBio(text);
  };

  const birthdayChangeHandler = (date) => {
    setBirthday(date);
  };

  // for a step 3
  const tagChangeHandler = (tags) => {
    setSelectedTags(tags);
  };

  // previous button
  const previousHandler = () => {
    setCurrentStepIndex(currentStepIndex - 1);
    setCurrentStepComponent(stepsComponent[currentStepIndex - 1]);
  };

  // next button
  const nextHandler = () => {
    if (currentStepIndex === 0 && !validateUsername(username.trim())) {
      setShowSnackbar(true);
      setErrorMessage("Invalid username");
      return;
    }

    if (currentStepIndex === 0 && !validatePassword(password.trim())) {
      setShowSnackbar(true);
      setErrorMessage("Invalid password");
      return;
    } else if (
      currentStepIndex === 0 &&
      password.trim() !== rePassword.trim()
    ) {
      setShowSnackbar(true);
      setErrorMessage("Password not match each other");
      return;
    }

    if (currentStepIndex === 1 && name.trim() === "") {
      setShowSnackbar(true);
      setErrorMessage("Name cannot empty");
      return;
    } else if (currentStepIndex === 1 && name.trim().length < 4) {
      setShowSnackbar(true);
      setErrorMessage("Name length minimum is 4");
      return;
    }

    if (currentStepIndex === 1 && !validateEmail(email.trim())) {
      setShowSnackbar(true);
      setErrorMessage("Invalid email");
      return;
    }

    if (currentStepIndex === 1 && birthday === null) {
      setShowSnackbar(true);
      setErrorMessage("Birthday cannot empty");
      return;
    } else if (currentStepIndex === 1 && new Date(birthday) > new Date()) {
      setShowSnackbar(true);
      setErrorMessage("Birthday can't be future");
      return;
    }

    setCurrentStepIndex(currentStepIndex + 1);
    setCurrentStepComponent(stepsComponent[currentStepIndex + 1]);
  };

  // sign up
  const signupHandler = () => {
    setLoading(true);
    axios
      .post("/api/users/signup", {
        username: username,
        password: password,
        name: name,
        email: email,
        bio: bio,
        birthday: birthday,
        tags: selectedTags,
      })
      .then((res) => {
        store.dispatch(setUser(res.data.user));
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setShowSnackbar(true);
        setErrorMessage(
          err.response.data.message || "Something when wrong, please try again"
        );
      });
  };

  // step 1
  function AccountStepForm() {
    return (
      <div className="2xl:px-16 2xl:py-8 py-4">
        <div className="mb-5">
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
          <p style={{ color: palette["content-2"] }} className="mt-2">
            Username is for logging in to account, it’s cant’ be change later,
            be careful to define
          </p>
        </div>
        <div className="mb-2">
          <PasswordField
            value={password}
            label="Password"
            error={passwordError}
            helperText={passwordError ? passwordErrorMessage : null}
            inputProps={{
              maxLength: 40,
            }}
            onPasswordChange={passwordChangeHandler}
          />
        </div>
        <div className="mb-5">
          <PasswordField
            value={rePassword}
            label="Re-enter password"
            error={rePasswordError}
            helperText={rePasswordError ? "Invalid password" : null}
            inputProps={{
              maxLength: 40,
            }}
            onPasswordChange={rePasswordChangeHandler}
          />
          <p style={{ color: palette["content-2"] }} className="mt-2">
            Password contain only A-Z, a-z, 0-9 or _, 8-20 length characters and
            includes at least 2 character and 2 numeric
          </p>
        </div>
      </div>
    );
  }

  // step 2
  function DetailsStepForm() {
    return (
      <div className="2xl:px-16 2xl:py-8 py-4">
        <div className="mb-2">
          <TextField
            value={name}
            label="Display name"
            inputProps={{
              maxLength: 20,
            }}
            onTextChange={nameChangeHandler}
          />
        </div>
        <div className="mb-2">
          <TextField
            value={email}
            label="Email"
            error={emailError}
            helperText={emailError ? emailErrorMessage : null}
            inputProps={{
              maxLength: 30,
            }}
            onTextChange={emailChangeHandler}
          />
        </div>
        <div className="mb-2">
          <TextArea
            value={bio}
            label="Bio"
            inputProps={{
              maxLength: 300,
            }}
            onTextChange={bioChangeHandler}
          />
        </div>
        <div className="mb-2">
          <DatePicker
            date={birthday}
            label={"Birthday"}
            onDateChange={birthdayChangeHandler}
          />
        </div>
      </div>
    );
  }

  // step 3
  function InterestingStepForm() {
    return (
      <div className="2xl:px-16 2xl:py-8 py-4">
        <p style={{ color: palette["content-1"] }} className="mt-2">
          Interesting tags
        </p>
        <p style={{ color: palette["content-2"] }} className="mt-2 mb-5">
          Select you interesting tags then we can recommend questions topic that
          what to interest
        </p>
        <TagInput
          selectedTags={selectedTags}
          tags={tags}
          onTagChange={tagChangeHandler}
          limitLength={5}
        />
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen flex flex-row justify-center items-center "
      style={{ background: palette["base-1"] }}
    >
      <div
        className="2xl:basis-5/12 basis-1/2 flex flex-col rounded-[12px] h-5/6 py-20 px-32 "
        style={{ backgroundColor: palette["base-2"], alignItems: "between" }}
      >
        <div
          className="flex flex-col h-full items-end"
          style={{ justifyContent: "space-between" }}
        >
          <div className="flex flex-col w-full">
            <Stepper activeStep={currentStepIndex} alternativeLabel>
              {stepsLabel.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {currentStepComponent}
          </div>
          <div className="w-full flex flex-col items-end">
            <div className="flex w-full justify-center py-3">
              <div
                style={{ color: palette["content-2"], fontSize: "16px" }}
                className="mr-1"
              >
                Have an account?
              </div>
              <RouterLink
                to="/login"
                style={{ color: palette.secondary }}
                className="opacity-90 hover:opacity-100 transition duration-100"
              >
                {/* <Link color="secondary" underline="hover"> */}
                Login
                <Icon.ArrowForward fontSize="16px" sx={{ ml: "2px" }} />
                {/* </Link> */}
              </RouterLink>
            </div>
            <div>
              {currentStepIndex !== 0 ? (
                <span className="mr-2">
                  <Button
                    color="content-1"
                    text="Previous"
                    variant="outlined"
                    onClick={previousHandler}
                    startIcon={<Icon.ArrowBack />}
                  />
                </span>
              ) : null}
              {currentStepIndex === 2 ? (
                <Button
                  color="primary"
                  text="Sign up"
                  onClick={signupHandler}
                />
              ) : (
                <Button
                  color="content-1"
                  text="Next"
                  onClick={nextHandler}
                  endIcon={<Icon.ArrowForward />}
                />
              )}
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
      <LoadingIndicator active={loading} />
      <Logo />
    </div>
  );
};
