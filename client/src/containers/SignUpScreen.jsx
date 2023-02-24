import { useState } from "react";
import { Stepper, Step, StepLabel, Link } from "@mui/material";
import * as Icon from "@mui/icons-material";

import palette from "../style/palette.js";

import TextField from "../components/inputs/TextField.jsx";
import PasswordField from "../components/inputs/PasswordField.jsx";
import TextArea from "../components/inputs/TextArea.jsx";
import DatePicker from "../components/inputs/DatePicker.jsx";
import Button from "../components/buttons/Button.jsx";

export default () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepComponent, setCurrentStepComponent] = useState(
    <AccountStepForm />
  );

  // for a step 1
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);

  // for a step 2
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState(null);

  const stepsLabel = ["Account", "Details", "Interesting"];
  const stepsComponent = [
    <AccountStepForm />,
    <DetailsStepForm />,
    <InterestingStepForm />,
  ];

  // for a step 1
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const rePasswordChangeHandler = (e) => {
    setRePassword(e.target.value);
  };

  // for a step 2
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const bioChangeHandler = (e) => {
    setBio(e.target.value);
  };

  const birthdayChangeHandler = (date) => {
    setBirthday(date.$d);
  };

  // previous and next button
  const previousHandler = () => {
    setCurrentStepIndex(currentStepIndex - 1);
    setCurrentStepComponent(stepsComponent[currentStepIndex - 1]);
  };

  const nextHandler = () => {
    setCurrentStepIndex(currentStepIndex + 1);
    setCurrentStepComponent(stepsComponent[currentStepIndex + 1]);
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
            helpertext={usernameError ? "Invalid username" : null}
            inputProps={{
              maxLength: 10,
            }}
            onChange={usernameChangeHandler}
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
            helpertext={passwordError ? "Invalid password" : null}
            inputProps={{
              maxLength: 10,
            }}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className="mb-5">
          <PasswordField
            value={rePassword}
            label="Re-enter password"
            error={rePasswordError}
            helpertext={rePasswordError ? "Invalid password" : null}
            inputProps={{
              maxLength: 10,
            }}
            onChange={rePasswordChangeHandler}
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
            // error={usernameError}
            // helpertext={usernameError ? "Invalid username" : null}
            inputProps={{
              maxLength: 10,
            }}
            onChange={nameChangeHandler}
          />
        </div>
        <div className="mb-2">
          <TextField
            value={email}
            label="Email"
            // error={usernameError}
            // helpertext={usernameError ? "Invalid username" : null}
            inputProps={{
              maxLength: 10,
            }}
            onChange={emailChangeHandler}
          />
        </div>
        <div className="mb-2">
          <TextArea
            value={bio}
            label="Bio"
            // error={error}
            inputProps={{
              maxLength: 256,
            }}
            onChange={bioChangeHandler}
          />
        </div>
        <div className="mb-2">
          <DatePicker
            date={birthday}
            label={birthday?.getDay()}
            onDateChange={birthdayChangeHandler}
          />
          {birthday?.$d}
        </div>
      </div>
    );
  }

  // step 3
  function InterestingStepForm() {}

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
              <Link
                color="secondary"
                underline="hover"
                onClick={() => alert("Hello")}
              >
                Login
                <Icon.ArrowForward fontSize="16px" sx={{ ml: "2px" }} />
              </Link>
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
              <Button
                color="content-1"
                text="Next"
                onClick={nextHandler}
                endIcon={<Icon.ArrowForward />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
