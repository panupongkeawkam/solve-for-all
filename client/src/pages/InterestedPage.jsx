import React, { useState } from "react";
import { IconButton, Link } from "@mui/material";
import * as Icon from "@mui/icons-material";

import DatePicker from "../components/inputs/DatePicker";
import TextField from "../components/inputs/TextField";
import PasswordField from "../components/inputs/PasswordField";
import TextArea from "../components/inputs/TextArea";
import SearchField from "../components/inputs/SearchField";
import SmallSearchField from "../components/inputs/SmallSearchField";
import Button from "../components/buttons/Button";

export default (props) => {
  const [birthday, setBirthday] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(false);

  const usernameChangeHandler = (e) => {
    setError(false);
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const bioChangeHandler = (e) => {
    setBio(e.target.value);
  };

  const searchQueryChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-5 flex flex-row flex-wrap">
      <div className="basis-full">
        <h1 className="text-6xl text-white font-bold">
          This is interested page!
        </h1>
      </div>
      <div className="basis-1/4">
        <DatePicker
          date={birthday}
          label="Birthday"
          onDateChange={setBirthday}
        />
        <TextField
          value={username}
          label="Username"
          error={error}
          helpertext={error ? "Invalid username" : null}
          inputProps={{
            maxLength: 10,
          }}
          onChange={usernameChangeHandler}
        />
        <PasswordField
          value={password}
          label="Password"
          error={error}
          helpertext={error ? "Invalid password" : null}
          inputProps={{
            maxLength: 10,
          }}
          onChange={passwordChangeHandler}
        />
        <TextArea
          value={bio}
          label="Bio"
          error={error}
          inputProps={{
            maxLength: 256,
          }}
          onChange={bioChangeHandler}
        />
        <SearchField
          value={searchQuery}
          placeholder="Search"
          error={error}
          helpertext={error ? "Invalid username" : null}
          inputProps={{
            maxLength: 10,
          }}
          onChange={searchQueryChangeHandler}
        />
        <SmallSearchField
          value={searchQuery}
          placeholder="Find people by @username"
          error={error}
          helpertext={error ? "Invalid username" : null}
          inputProps={{
            maxLength: 10,
          }}
          onChange={searchQueryChangeHandler}
          icon={<Icon.People fontSize="12px" />}
        />
        <Button fullWidth text="Submit" />
        <Button variant="outlined" text="Submit" />
        <Button size="small" text="Submit" />
        <Button
          color="content-1"
          size="small"
          text="Next"
          endIcon={<Icon.ArrowForward />}
        />
        <Button variant="outlined" size="small" text="Submit" />
        <IconButton>
          <Icon.Search />
        </IconButton>
        <Link
          color="secondary"
          underline="hover"
          onClick={() => alert("Hello")}
        >
          Link
          <Icon.ArrowForward fontSize="16px" sx={{ ml: "2px" }} />
        </Link>
      </div>
    </div>
  );
};
