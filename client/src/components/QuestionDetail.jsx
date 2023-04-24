import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { authAxios } from "../utils/axios.config";
import { getTimeDiffString } from "../utils/lamda";

import DialogModal from "./modals/DialogModal";

export default ({
  title,
  authorProfilePicture,
  authorName,
  authorUsername,
  authorId,
  totalParticipants,
  totalViewed,
  isSolved,
  createdAt,
  rating,
  tags,
  questionBody,
  questionId,
  likedBy,
  dislikedBy,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
  const [displayedRating, setDisplayedRating] = useState(rating);
  const [likable, setLikable] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    const likedExist = likedBy.includes(user?._id);
    const dislikedExist = dislikedBy.includes(user?._id);
    setHasLiked(Boolean(likedExist));
    setHasDisliked(Boolean(dislikedExist));

    setLikable(!likedExist && !dislikedExist && authorId !== user?._id);
  }, [user]);

  const openAnchorHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeAnchorHandler = () => {
    setAnchorEl(null);
  };

  const toggleDeleteQuestionModalHandler = () => {
    closeAnchorHandler();
    setShowDeleteQuestionModal(!showDeleteQuestionModal);
  };

  const deleteQuestionHandler = async () => {
    try {
      await authAxios.delete(`/api/questions/${questionId}`);
      window.location.href = "/";
      toggleDeleteQuestionModalHandler();
    } catch (err) {
      window.location.href = "/";
      toggleDeleteQuestionModalHandler();
    }
  };

  const likeHandler = () => {
    setDisplayedRating(displayedRating + 1);
    setHasLiked(true);
    setLikable(false);
    authAxios.put(`/api/questions/${questionId}?like=true`);
  };

  const dislikeHandler = () => {
    setDisplayedRating(displayedRating - 1);
    setHasDisliked(true);
    setLikable(false);
    authAxios.put(`/api/questions/${questionId}?like=false`);
  };

  return (
    <div
      className="flex flex-row rounded-[12px] py-5 px-8 my-2"
      style={{ backgroundColor: palette["base-2"] }}
    >
      <div className="basis-auto flex flex-col mr-8">
        {authorProfilePicture ? (
          <Avatar
            alt={authorUsername}
            src={authorProfilePicture}
            sx={{ width: 64, height: 64 }}
          />
        ) : (
          <Avatar
            alt={authorUsername}
            sx={{ width: 64, height: 64, fontSize: "1.8em" }}
          >
            {authorUsername[0]?.toUpperCase()}
          </Avatar>
        )}
        <div className="flex flex-col items-center mt-8">
          {likable ? (
            <>
              <ArrowDropUpIcon
                className="cursor-pointer transition duration-300 hover:text-[#00D25B] hover:scale-110"
                color="content-1"
                sx={{ fontSize: 48 }}
                onClick={likeHandler}
              />
              <p style={{ color: palette["content-1"] }}>{displayedRating}</p>
              <ArrowDropDownIcon
                className="cursor-pointer transition duration-300 hover:text-[#DC3545] hover:scale-110"
                color="content-1"
                sx={{ fontSize: 48 }}
                onClick={dislikeHandler}
              />
            </>
          ) : (
            <>
              <ArrowDropUpIcon
                className="cursor-not-allowed"
                color={hasLiked ? "correct" : "content-3"}
                sx={{ fontSize: 48 }}
              />
              <p style={{ color: palette["content-1"] }}>{displayedRating}</p>
              <ArrowDropDownIcon
                className="cursor-not-allowed"
                color={hasDisliked ? "wrong" : "content-3"}
                sx={{ fontSize: 48 }}
              />
            </>
          )}
        </div>
      </div>
      <div className="basis-full flex flex-col">
        <div className="basis-full flex flex-row mb-1">
          <div className="basis-1/2 flex flex-col mb-1">
            <div className="flex flex-row mb-1">
              <p className="mr-2" style={{ color: palette["content-1"] }}>
                {authorName}
              </p>
              <span style={{ color: palette["content-2"] }}>
                @{authorUsername}
              </span>
            </div>
            <div className="basis-full flex flex-row mb-3">
              <span style={{ color: palette["content-2"] }}>
                {getTimeDiffString(createdAt)}
              </span>
            </div>
          </div>
          <div className="basis-1/2 flex flex-row flex-wrap justify-end">
            <div className="flex flex-row mr-8">
              <div className="flex flex-row">
                {isSolved ? (
                  <div>
                    <TaskAltOutlinedIcon color={"correct"} fontSize="small" />
                    <span className="ml-2" style={{ color: palette.correct }}>
                      Solved
                    </span>
                  </div>
                ) : (
                  <div>
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
            </div>
            <div className="flex flex-row mr-8">
              <div>
                <PeopleOutlineIcon color={"content-2"} fontSize="small" />
                <span className="ml-2" style={{ color: palette["content-2"] }}>
                  {totalParticipants}
                </span>
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <VisibilityOutlinedIcon color={"content-2"} fontSize="small" />
                <span className="ml-2" style={{ color: palette["content-2"] }}>
                  {totalViewed}
                </span>
              </div>
            </div>
            {authorId === user?._id && (
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
                  <MenuItem onClick={toggleDeleteQuestionModalHandler}>
                    <ListItemIcon>
                      <DeleteOutlineOutlinedIcon
                        fontSize="20px"
                        color="wrong"
                      />
                    </ListItemIcon>
                    <ListItemText sx={{ mr: 3, color: palette.wrong }}>
                      <div style={{ fontSize: "16px" }}>Delete</div>
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
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
                        overflowY: "hidden",
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
      <DialogModal
        active={showDeleteQuestionModal}
        confirmText="Delete"
        title={"Delete this question?"}
        description={
          "This action cannot be redo, please make sure your decision"
        }
        onConfirm={deleteQuestionHandler}
        danger
        onClose={toggleDeleteQuestionModalHandler}
      />
    </div>
  );
};
