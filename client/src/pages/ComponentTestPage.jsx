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
import SearchField from "../components/inputs/SearchField";
import SmallSearchField from "../components/inputs/SmallSearchField";
import Button from "../components/buttons/Button";
// import TagInput from "../components/inputs/TagInput";
import Tag from "../components/Tag";
import MultipleAction from "../components/buttons/MultipleAction";
import QuestionFormModal from "../components/modals/QuestionFormModal";
import Dialog from "../components/modals/DialogModal";

export default (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

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

  const searchQueryChangeHandler = (e) => {
    setSearchQuery(e.target.value);
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
    console.log(question);
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
        <Button fullWidth text="Submit" onClick={() => {}} />
        <Button variant="outlined" text="Submit" />
        <Button size="small" text="Submit" />
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
              horizontal: "left",
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeAnchorHandler}
          >
            <MenuItem onClick={closeAnchorHandler}>
              <ListItemIcon>
                <Icon.EditOutlined fontSize="20px" />
              </ListItemIcon>
              <ListItemText sx={{ mr: 3 }}>
                <div style={{ fontSize: "16px" }}>Edit</div>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={closeAnchorHandler}>
              <ListItemIcon>
                <Icon.DeleteOutlined fontSize="20px" color="wrong" />
              </ListItemIcon>
              <ListItemText sx={{ mr: 3, color: palette.wrong }}>
                <div style={{ fontSize: "16px" }}>Delete</div>
              </ListItemText>
            </MenuItem>
            {/* <div style={{ width: 240 }} className="px-3">
              <p>Notifications</p>
            </div> */}
          </Menu>
        </div>
        <Tag title={"python"} onClick={() => {}} />
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
          doingMessage="Asking question..."
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
