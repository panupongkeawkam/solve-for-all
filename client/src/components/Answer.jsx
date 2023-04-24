import React, { useState } from "react";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import palette from "../style/palette";
import { getTimeDiffString } from "../utils/lamda";

import Button from "./buttons/Button";

export default ({
  authorProfilePicture,
  authorName,
  authorUsername,
  solvable,
  isSolved,
  createdAt,
  rating,
  answerBody,
  replies,
}) => {
  const likeHandler = () => {};

  const dislikeHandler = () => {};

  const answerSolvedHandler = () => {};

  return (
    <>
      <div
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
          </div>
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
              onClick={answerSolvedHandler}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row px-8 mt-3 mb-5">
        <div className="w-[64px] mr-8" />
        <p style={{ color: palette["content-1"] }}>
          {replies.length === 0 ? "No " : replies.length}{" "}
          {replies.length > 1 ? "replies" : "reply"}
        </p>
      </div>
    </>
  );
};