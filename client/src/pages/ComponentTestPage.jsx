import React, { useRef, useState } from "react";
import {
  IconButton,
  Link,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import * as Icon from "@mui/icons-material";

import palette from "../style/palette";

import DatePicker from "../components/inputs/DatePicker";
import TextField from "../components/inputs/TextField";
import PasswordField from "../components/inputs/PasswordField";
import TextArea from "../components/inputs/TextArea";
import SearchField from "../components/inputs/SearchField";
import SmallSearchField from "../components/inputs/SmallSearchField";
import Button from "../components/buttons/Button";
import TagInput from "../components/inputs/TagInput";
import Tag from "../components/Tag";
import MultipleAction from "../components/buttons/MultipleAction";
import QuestionFormModal from "../components/modals/QuestionFormModal";
import Dialog from "../components/modals/DialogModal";

export default (props) => {
  const [birthday, setBirthday] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const tagsDummy = [
    { title: "java" },
    { title: "javascript" },
    { title: "tech" },
    { title: "cat" },
    { title: "coffee" },
    { title: "9arm" },
  ];

  const sortOptions = [
    { value: "popular", title: "Popular" },
    { value: "latest", title: "Latest" },
    { value: "oldest", title: "Oldest" },
  ];

  const actions = [
    { icon: <Icon.TitleOutlined fontSize="16" />, name: "header" },
    { icon: <Icon.Notes fontSize="16" />, name: "paragraph" },
    { icon: <Icon.CodeOutlined fontSize="16" />, name: "code" },
    { icon: <Icon.ImageOutlined fontSize="16" />, name: "image" },
  ];

  const [selectedTags, setSelectedTags] = useState([]);

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

  const tagChangeHandler = (tags) => {
    setSelectedTags([...tags]);
  };

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  const openAnchorHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeAnchorHandler = () => {
    setAnchorEl(null);
  };

  const actionChangeHandler = (actionName) => {
    if (actionName === "header") {
      console.log("Add header");
    } else if (actionName === "paragraph") {
      console.log("Add paragraph");
    } else if (actionName === "code") {
      console.log("Add code");
    } else if (actionName === "image") {
      console.log("Add image");
    }
  };

  const toggleAddQuestionModalHandler = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };

  const addQuestionSubmitHandler = (question) => {
    // POST to server
  };

  const toggleDialogHandler = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="p-5 flex flex-row flex-wrap mb-10">
      <div className="basis-full" style={{ color: palette["content-1"] }}>
        <h1>Title</h1>
        <h2>Header</h2>
        <p>Content</p>
        <span style={{ color: palette["content-2"] }}>Sub-content</span>
      </div>
      <div className="2xl:basis-1/4 md:basis-3/4">
        <DatePicker
          date={birthday}
          label="Birthday"
          onDateChange={(date) => setBirthday(date.$d)}
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
        <Button
          fullWidth
          text="Submit"
          onClick={() => {
            console.log(selectedTags);
          }}
        />
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
          <Icon.NotificationsOutlined />
        </IconButton>
        <div>
          <IconButton
            aria-controls="test-box"
            aria-haspopup="true"
            onClick={openAnchorHandler}
          >
            <Icon.MoreVertOutlined />
          </IconButton>
          <Menu
            id="test-box"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "left",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={closeAnchorHandler}
          >
            <MenuItem onClick={closeAnchorHandler}>
              <ListItemIcon>
                <Icon.EditOutlined fontSize="20px" />
              </ListItemIcon>
              <ListItemText sx={{ mr: 3 }}>
                <p>Edit</p>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={closeAnchorHandler}>
              <ListItemIcon>
                <Icon.DeleteOutlined fontSize="20px" color="wrong" />
              </ListItemIcon>
              <ListItemText sx={{ mr: 3, color: palette.wrong }}>
                <p>Delete</p>
              </ListItemText>
            </MenuItem>
            {/* <div style={{ width: 240 }} className="px-3">
              <p>Notifications</p>
            </div> */}
          </Menu>
        </div>

        <Link
          color="secondary"
          underline="hover"
          onClick={() => alert("Hello")}
        >
          Link
          <Icon.ArrowForward fontSize="16px" sx={{ ml: "2px" }} />
        </Link>
        <Tag title={"python"} onClick={() => {}} />
        <TagInput options={tagsDummy} onTagChange={tagChangeHandler} />
        <Select value={sortBy} onChange={sortChangeHandler}>
          {sortOptions.map((sortOption, index) => (
            <MenuItem value={sortOption.value} key={index}>
              {sortOption.title}
            </MenuItem>
          ))}
        </Select>
        <MultipleAction
          actions={actions}
          onActionChange={actionChangeHandler}
        />

        <Button text="Add question" onClick={toggleAddQuestionModalHandler} />
        <QuestionFormModal
          active={showAddQuestionModal}
          submitText="Publish"
          onSubmit={addQuestionSubmitHandler}
          onClose={toggleAddQuestionModalHandler}
        />
        <Button
          text="Show confirm modal"
          size="small"
          variant="outlined"
          color="correct"
          onClick={toggleDialogHandler}
        />
        <Dialog
          active={showDialog}
          title="This is a alert modal"
          description={
            "simply dummy text of the printing and typesetting industry."
          }
          danger
          onClose={toggleDialogHandler}
          // confirmText="Logout"
          // onConfirm={toggleDialogHandler}
        />
      </div>
    </div>
  );
};
