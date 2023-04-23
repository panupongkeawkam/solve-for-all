import { Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import palette from "../style/palette";
import Tag from "./Tag";

import { getTimeDiffString } from "../utils/lamda";

export default ({
  title,
  authorProfilePicture,
  authorName,
  authorUsername,
  totalAnswers,
  totalParticipants,
  totalViewed,
  isSolved,
  createdAt,
  rating,
  tags,
  onView,
}) => {
  return (
    <div
      className="flex flex-row rounded-[12px] py-5 px-8 my-2 cursor-pointer hover:brightness-110 transition duration-300 active:brightness-95 active:scale-[0.99]"
      style={{ backgroundColor: palette["base-2"] }}
      onClick={() => onView()}
    >
      <div className="basis-auto mr-8">
        {authorProfilePicture ? (
          <Avatar alt={authorUsername} src={authorProfilePicture} sx={{ width: 64, height: 64 }} />
        ) : (
          <Avatar alt={authorUsername} sx={{ width: 64, height: 64, fontSize: "1.8em" }}>{authorUsername[0]?.toUpperCase()}</Avatar>
        )}
      </div>
      <div className="basis-full flex flex-col">
        <div className="basis-full flex flex-row mb-1">
          <p className="mr-2" style={{ color: palette["content-1"] }}>
            {authorName}
          </p>
          <span style={{ color: palette["content-2"] }}>@{authorUsername}</span>
        </div>
        <div className="basis-full flex flex-row mb-3">
          <span style={{ color: palette["content-2"] }}>
            {getTimeDiffString(createdAt)}
          </span>
        </div>
        <div className="basis-full flex flex-row mb-3">
          <h2 style={{ color: palette["content-1"] }}>{title}</h2>
        </div>
        <div className="basis-full flex flex-row flex-wrap mb-5">
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
        <div className="basis-full flex flex-row flex-wrap">
          <div className="flex flex-row mr-12">
            <ChatBubbleOutlineIcon color={"content-2"} fontSize="small" />
            <span className="ml-2" style={{ color: palette["content-2"] }}>
              {totalAnswers}
            </span>
          </div>
          <div className="flex flex-row mr-12">
            <PeopleOutlineIcon color={"content-2"} fontSize="small" />
            <span className="ml-2" style={{ color: palette["content-2"] }}>
              {totalParticipants}
            </span>
          </div>
          <div className="flex flex-row mr-12">
            <VisibilityOutlinedIcon color={"content-2"} fontSize="small" />
            <span className="ml-2" style={{ color: palette["content-2"] }}>
              {totalViewed}
            </span>
          </div>
          <div className="flex flex-row">
            {rating > 0 ? (
              <TrendingUpIcon color={"content-2"} fontSize="small" />
            ) : (
              <TrendingDownIcon color={"content-2"} fontSize="small" />
            )}
            <span className="ml-2" style={{ color: palette["content-2"] }}>
              {rating}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-3/12 flex flex-row justify-end items-start">
        {isSolved && (
          <div className="flex fled-row items-center">
            <TaskAltOutlinedIcon color="correct" />
            <p className="ml-2" style={{ color: palette.correct }}>
              Solved
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
