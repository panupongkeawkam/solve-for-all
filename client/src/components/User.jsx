import { Avatar } from "@mui/material";

import palette from "../style/palette";
import { avatarColors } from "../utils/dummy";

export default ({ name, username, imageUrl, onClick = () => {}, ...props }) => {
  if (window.screen.width < 1500 && name?.length > 15) {
    name = name.slice(0, 12) + "...";
  }

  if (window.screen.width < 1500 && username?.length > 15) {
    username = username.slice(0, 12) + "...";
  }

  return (
    <div
      className="flex flex-row w-full cursor-pointer active:opacity-90 transition duration-100"
      onClick={() => onClick()}
    >
      <div className="mr-2">
        {imageUrl ? (
          <Avatar alt={username} src={imageUrl} />
        ) : (
          <Avatar
            alt={username}
            sx={{ backgroundColor: avatarColors[username[0]?.toUpperCase()] }}
          >
            {username[0]?.toUpperCase()}
          </Avatar>
        )}
      </div>
      <div className="flex flex-col w-full justify-center">
        <p style={{ color: palette["content-1"] }}>{name ? name : username}</p>
        <span style={{ color: palette["content-2"] }}>@{username}</span>
      </div>
    </div>
  );
};
