import { Avatar } from "@mui/material";
import palette from "../style/palette";

export default ({ name, username, imageUrl, onClick = () => {} }) => {
  return (
    <div
      className="flex flex-row cursor-pointer active:opacity-90 transition duration-100"
      onClick={() => onClick()}
    >
      <div className="mr-2">
        {imageUrl ? (
          <Avatar alt={username} src={imageUrl} />
        ) : (
          <Avatar alt={username}>{username[0]?.toUpperCase()}</Avatar>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <p style={{ color: palette["content-1"] }}>{name}</p>
        <span style={{ color: palette["content-2"] }}>@{username}</span>
      </div>
    </div>
  );
};
