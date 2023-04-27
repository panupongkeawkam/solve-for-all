import { Avatar } from "@mui/material";

import palette from "../style/palette";
import { getTimeDiffString } from "../utils/lamda";
import { avatarColors } from "../utils/dummy";

export default ({ message, name, username, image, userId, createdAt }) => {
  return (
    <div
      className="basis-full flex flex-row py-5 px-6 rounded-[12px]"
      style={{ border: `1px solid ${palette["content-2"]}` }}
    >
      <div className="mr-6">
        {image ? (
          <Avatar
            alt={username}
            src={image}
            sx={{ backgroundColor: avatarColors[username[0]?.toUpperCase()] }}
          />
        ) : (
          <Avatar alt={username}>{username[0]?.toUpperCase()}</Avatar>
        )}
      </div>
      <div className="basis-full flex flex-col mb-1">
        <div className="flex flex-row mb-1">
          <p className="mr-2" style={{ color: palette["content-1"] }}>
            {name}
          </p>
          <span style={{ color: palette["content-2"] }}>@{username}</span>
        </div>
        <div className="mb-3">
          <span style={{ color: palette["content-2"] }}>
            {getTimeDiffString(createdAt)}
          </span>
        </div>
        <p style={{ color: palette["content-1"] }}>{message}</p>
      </div>
    </div>
  );
};
