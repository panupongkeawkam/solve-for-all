import React, { useState } from "react";
import {
  IconButton,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import * as Icon from "@mui/icons-material";

import palette from "../style/palette";

import Button from "../components/buttons/Button";
import Tag from "../components/Tag";
import Dialog from "../components/modals/DialogModal";

export default () => {
  const [sortBy, setSortBy] = useState("popular");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { testId } = useParams();

  const sortOptions = [
    { value: "popular", title: "Popular" },
    { value: "latest", title: "Latest" },
    { value: "oldest", title: "Oldest" },
  ];

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  const openAnchorHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeAnchorHandler = () => {
    setAnchorEl(null);
  };

  const toggleDialogHandler = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="p-5 flex flex-row flex-wrap mb-10">
      <div className="2xl:basis-1/4 md:basis-3/4">
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
