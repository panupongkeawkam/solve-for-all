import { useState } from "react";
import { Avatar } from "@mui/material";

import palette from "../../style/palette";

import Button from "../buttons/Button";
import InvisibleTextArea from "./InvisibleTextArea";

export default ({ image, username, name, onSubmit }) => {
  const [message, setMessage] = useState("");

  return (
    <div
      className="basis-full flex flex-row py-5 px-6 rounded-[12px]"
      style={{ border: `1px solid ${palette["content-2"]}` }}
    >
      <div className="mr-6">
        {image ? (
          <Avatar alt={username} src={image} />
        ) : (
          <Avatar alt={username}>{username[0]?.toUpperCase()}</Avatar>
        )}
      </div>
      <div className="basis-full flex flex-col mb-1">
        <div className="flex flex-row">
          <div className="basis-1/2">
            <div className="flex flex-row mb-1">
              <p className="mr-2" style={{ color: palette["content-1"] }}>
                {name}
              </p>
              <span style={{ color: palette["content-2"] }}>@{username}</span>
            </div>
            <div className="mb-3">
              <span style={{ color: palette["content-2"] }}>Replying...</span>
            </div>
          </div>
          <div className="basis-1/2 flex flex-row justify-end items-start">
            <Button
              text="Submit"
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => onSubmit(message)}
            />
          </div>
        </div>
        <InvisibleTextArea
          message={message}
          maxLength={512}
          placeholder={"Reply message..."}
          onTextChange={setMessage}
          fontSize="16px"
          fontFamily={"Lora, serif, IBM Plex Sans Thai, sans-serif"}
        />
      </div>
    </div>
  );
};
