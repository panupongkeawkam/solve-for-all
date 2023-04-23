import { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import palette from "../style/palette";
import Tag from "./Tag";

import { getTimeDiffString } from "../utils/lamda";

export default ({
  title,
  authorProfilePicture,
  authorName,
  authorUsername,
  totalParticipants,
  totalViewed,
  isSolved,
  createdAt,
  rating,
  tags,
  questionBody,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openAnchorHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeAnchorHandler = () => {
    setAnchorEl(null);
  };

  const toggleDialogHandler = () => {
    setShowDialog(!showDialog);
  };

  const likeHandler = () => {};

  const dislikeHandler = () => {};

  return (
    <div
      className="flex flex-row rounded-[12px] py-5 px-8 my-2"
      style={{ backgroundColor: palette["base-2"] }}
    >
      <div className="basis-auto flex flex-col mr-8">
        <Avatar
          alt={authorUsername}
          src={authorProfilePicture}
          sx={{ width: 64, height: 64 }}
        />
        <div className="flex flex-col items-center mt-8">
          <ArrowDropUpIcon
            className="cursor-pointer transition duration-300 hover:text-[#00D25B] hover:scale-110"
            color="content-1"
            sx={{ fontSize: 48 }}
            onClick={likeHandler}
          />
          <p style={{ color: palette["content-1"] }}>{rating}</p>
          <ArrowDropDownIcon
            className="cursor-pointer transition duration-300 hover:text-[#DC3545] hover:scale-110"
            color="content-1"
            sx={{ fontSize: 48 }}
            onClick={dislikeHandler}
          />
        </div>
      </div>
      <div className="basis-full flex flex-col">
        <div className="basis-full flex flex-row mb-1">
          <div className="basis-1/2 flex flex-row mb-1">
            <p className="mr-2" style={{ color: palette["content-1"] }}>
              {authorName}
            </p>
            <span style={{ color: palette["content-2"] }}>
              @{authorUsername}
            </span>
          </div>
          <div className="basis-1/2 flex flex-row flex-wrap justify-end">
            <div className="flex flex-row mr-8">
              {isSolved ? (
                <div className="flex flex-row justify-center items-center">
                  <TaskAltOutlinedIcon color={"correct"} fontSize="small" />
                  <span className="ml-2" style={{ color: palette.correct }}>
                    Solved
                  </span>
                </div>
              ) : (
                <div className="flex flex-row">
                  <AccessTimeIcon color={"content-2"} fontSize="small" />
                  <span
                    className="ml-2"
                    style={{ color: palette["content-2"] }}
                  >
                    Asking
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-row mr-8">
              <PeopleOutlineIcon color={"content-2"} fontSize="small" />
              <span className="ml-2" style={{ color: palette["content-2"] }}>
                {totalParticipants}
              </span>
            </div>
            <div className="flex flex-row">
              <VisibilityOutlinedIcon color={"content-2"} fontSize="small" />
              <span className="ml-2" style={{ color: palette["content-2"] }}>
                {totalViewed}
              </span>
            </div>
            <div className="ml-12">
              <IconButton
                aria-controls="test-box"
                aria-haspopup="true"
                onClick={openAnchorHandler}
              >
                <MoreHorizIcon />
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
                    <EditOutlinedIcon fontSize="20px" />
                  </ListItemIcon>
                  <ListItemText sx={{ mr: 3 }}>
                    <div style={{ fontSize: "16px" }}>Edit</div>
                  </ListItemText>
                </MenuItem>
                <MenuItem onClick={closeAnchorHandler}>
                  <ListItemIcon>
                    <DeleteOutlineOutlinedIcon fontSize="20px" color="wrong" />
                  </ListItemIcon>
                  <ListItemText sx={{ mr: 3, color: palette.wrong }}>
                    <div style={{ fontSize: "16px" }}>Delete</div>
                  </ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="basis-full flex flex-row mb-3">
          <span style={{ color: palette["content-2"] }}>
            {getTimeDiffString(createdAt)}
          </span>
        </div>
        <div className="basis-full flex flex-row mb-3">
          <h1 style={{ color: palette["content-1"] }}>{title}</h1>
        </div>
        <div className="basis-full flex flex-row flex-wrap mb-10">
          {tags.map((tag, index) => (
            <Tag
              title={tag.name}
              key={index}
              onClick={(e) => {
                alert("Clicked " + tag.name + " tag");
                e.stopPropagation();
              }}
            />
          ))}
        </div>
        <div className="basis-full flex flex-col mb-8">
          {questionBody.map((body, index) => {
            switch (body.type) {
              case "header":
                return (
                  <h2
                    key={index}
                    className="mb-5"
                    style={{
                      color: palette["content-1"],
                      fontWeight: 800,
                      fontFamily: "Lora, serif",
                    }}
                  >
                    {body.msg}
                  </h2>
                );
              case "paragraph":
                return (
                  <p
                    key={index}
                    className="mb-4"
                    style={{
                      color: palette["content-1"],
                      lineHeight: "initial",
                      fontFamily: "Lora, serif",
                    }}
                  >
                    {body.msg}
                  </p>
                );
              case "image":
                return (
                  <div className="basis-full mb-8" key={index}>
                    <img
                      width="100%"
                      className="rounded-[8px] my-2 flex-1 flex"
                      src={body.image}
                    />
                  </div>
                );
              case "code":
                return (
                  <div
                    className="rounded-[8px] p-5 flex flex-col mb-5"
                    style={{ backgroundColor: palette["base-3"] }}
                    key={index}
                  >
                    <SyntaxHighlighter
                      language={body.language}
                      style={monokai}
                      customStyle={{
                        backgroundColor: "transparent",
                        padding: 0,
                        marginBottom: "3px",
                        lineHeight: "16px",
                        OverflowY: "visible",
                      }}
                      onClick={() => setCodeState("edit")}
                    >
                      {body.code}
                    </SyntaxHighlighter>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};
