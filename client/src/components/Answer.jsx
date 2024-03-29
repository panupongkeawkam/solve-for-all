import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import palette from "../style/palette";
import { authAxios } from "../utils/axios.config";
import { getTimeDiffString } from "../utils/lamda";
import { avatarColors } from "../utils/dummy";

import Button from "./buttons/Button";
import DialogModal from "./modals/DialogModal";
import InvisibleTextArea from "./inputs/InvisibleTextArea";
import ReplyForm from "./inputs/ReplyForm";
import Reply from "./Reply";

export default ({
  authorProfilePicture,
  authorName,
  authorUsername,
  authorId,
  solvable,
  isSolved,
  createdAt,
  rating,
  answerBody,
  replies,
  likedBy,
  dislikedBy,
  answerId,
  questionId,
}) => {
  const user = useSelector((state) => state.user.user);
  const [displayedRating, setDisplayedRating] = useState(rating);
  const [likable, setLikable] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [showConfirmSolveAnswerModal, setShowConfirmSolveAnswerModal] =
    useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyField, setShowReplyField] = useState(false);
  const [replyMessage, setRelyMessage] = useState("");

  useEffect(() => {
    const likedExist = likedBy.includes(user?._id);
    const dislikedExist = dislikedBy.includes(user?._id);
    setHasLiked(Boolean(likedExist));
    setHasDisliked(Boolean(dislikedExist));
    setDisplayedRating(rating);

    setLikable(!likedExist && !dislikedExist && authorId !== user?._id);
  }, [user, rating]);

  const likeHandler = () => {
    setDisplayedRating(displayedRating + 1);
    setHasLiked(true);
    setLikable(false);
    authAxios.put(`/api/answers/${answerId}?like=true`);
  };

  const dislikeHandler = () => {
    setDisplayedRating(displayedRating - 1);
    setHasDisliked(true);
    setLikable(false);
    authAxios.put(`/api/answers/${answerId}?like=false`);
  };

  const toggleSolveAnswerModalHandler = () => {
    setShowConfirmSolveAnswerModal(!showConfirmSolveAnswerModal);
  };

  const answerSolvedHandler = async () => {
    const res = await authAxios.put(`/api/questions/${questionId}/solved`, {
      answerId: answerId,
      answerOwnerId: authorId,
    });
    window.location.reload();
  };

  const toggleShowRepliesHandler = () => {
    setShowReplies(!showReplies);
    setShowReplyField(false);
  };

  const toggleShowReplyFieldHandler = () => {
    setShowReplyField(!showReplyField);
    setShowReplies(false);
  };

  const submitReplyHandler = async (message) => {
    const res = await authAxios.post(`/api/replies`, {
      repliedIn: answerId,
      message: message.trim(),
      questionId: questionId,
    });
    window.location.reload();
  };

  return (
    <>
      <div
        id={answerId}
        className="flex flex-row rounded-[12px] py-5 px-8 my-2"
        style={{
          backgroundColor: palette["base-2"],
          border: isSolved && `solid 1px ${palette.correct}`,
        }}
      >
        <div className="basis-auto mr-8">
          <div>
            {authorProfilePicture ? (
              <Avatar
                alt={authorUsername}
                src={authorProfilePicture}
                sx={{
                  width: 64,
                  height: 64,
                  fontSize: 64,
                  backgroundColor:
                    avatarColors[authorUsername[0]?.toUpperCase()],
                }}
              />
            ) : (
              <Avatar
                alt={authorUsername}
                sx={{ width: 64, height: 64, fontSize: "1.8em" }}
              >
                {authorUsername[0]?.toUpperCase()}
              </Avatar>
            )}
          </div>
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
            <div
              className="basis-1/2 flex flex-col mb-1 cursor-pointer hover:brightness-110 transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/users/${authorId}`;
              }}
            >
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
          </div>
          <div className="basis-full flex flex-row mb-3">
            <div className="basis-full flex flex-col mb-8">
              {answerBody.map((body, index) => {
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
        </div>
        <div className="basis-3/12 flex flex-row justify-end items-start">
          {solvable && (
            <Button
              text="Solve"
              size="small"
              variant="outlined"
              color="correct"
              onClick={toggleSolveAnswerModalHandler}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row px-8 mt-3 mb-5">
        <div className="w-[64px] mr-8" />
        <div
          className={
            replies.length > 0
              ? "flex flew-row mr-5 items-center cursor-pointer"
              : "flex flew-row mr-5 items-center cursor-not-allowed brightness-50"
          }
          onClick={() => {
            if (replies.length > 0) {
              toggleShowRepliesHandler();
            }
          }}
        >
          <p className="mr-2" style={{ color: palette["content-1"] }}>
            {replies.length === 0 ? "No " : replies.length}{" "}
            {replies.length > 1 ? "replies" : "reply"}
          </p>
          {showReplies ? (
            <KeyboardArrowDownIcon color="content-1" />
          ) : (
            <KeyboardArrowUpIcon color="content-1" />
          )}
        </div>
        <div className="flex flex-row items-center">
          <Link
            onClick={toggleShowReplyFieldHandler}
            color="secondary"
            underline="none"
            className="flex flex-row items-center"
          >
            <p>Reply</p>
            {showReplyField ? (
              <CloseIcon color="secondary" sx={{ fontSize: "18px", ml: 1 }} />
            ) : (
              <></>
            )}
          </Link>
        </div>
      </div>
      {showReplies ? (
        replies.map((reply, index) => (
          <section key={index} className="flex flex-row pl-8 mt-3 mb-5">
            <div className="w-[64px] mr-8" />
            <Reply
              message={reply.message}
              name={reply.repliedBy.name}
              username={reply.repliedBy.username}
              image={reply.repliedBy.image}
              userId={reply.repliedBy._id}
              createdAt={reply.createdAt}
            />
          </section>
        ))
      ) : (
        <></>
      )}
      {showReplyField ? (
        <div className="flex flex-row pl-8 mt-3 mb-5">
          <div className="w-[64px] mr-8" />
          <ReplyForm
            name={user?.name}
            username={user?.username}
            image={user?.image}
            onSubmit={submitReplyHandler}
          />
        </div>
      ) : (
        <></>
      )}
      <DialogModal
        active={showConfirmSolveAnswerModal}
        confirmText="Solve"
        title={"Are you sure, it's solve?"}
        description={
          "Make sure this answer is solved your problem on this question, because this action cannot redo"
        }
        onConfirm={answerSolvedHandler}
        correct
        onClose={toggleSolveAnswerModalHandler}
      />
    </>
  );
};
