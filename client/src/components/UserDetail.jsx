import { Avatar, Link } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icon from "@mui/icons-material";

import palette from "../style/palette";

import Tag from "../components/Tag";

export default ({
  imageUrl,
  name,
  username,
  bio,
  email,
  birthday,
  reputation,
  solved,
  answered,
  tags,
  onEdit = () => {},
  ...props
}) => {
  const user = useSelector((state) => state.user.user);
  const params = useParams();
  const navigate = useNavigate();

  const tagClickHandler = (tag) => {
    navigate("/tags/" + tag._id);
  };

  return (
    <div
      className="w-full flex flex-row rounded-[12px] py-8  2xl:px-16 px-12"
      style={{ backgroundColor: palette["base-2"] }}
    >
      <div className="basis-full flex flex-row">
        <div className="2xl:pr-16 pr-12">
          {imageUrl ? (
            <Avatar
              sx={{ width: "120px", height: "120px" }}
              alt={username}
              src={imageUrl}
            />
          ) : (
            <Avatar
              sx={{ width: "120px", height: "120px", fontSize: 64 }}
              alt={username}
            >
              {username[0]?.toUpperCase()}
            </Avatar>
          )}
        </div>
        <div className="w-full flex flex-row flex-wrap">
          <div className="basis-8/12">
            <h1 style={{ color: palette["content-1"] }}>{name}</h1>
            <p className="mb-5" style={{ color: palette["content-2"] }}>
              @{username}
            </p>
            <p className="mb-12" style={{ color: palette["content-1"] }}>
              {bio}
            </p>
          </div>
          <div className="basis-4/12 flex flex-row justify-end">
            {params.userId === user._id ? (
              <Link onClick={onEdit} color="secondary" underline="none">
                <Icon.EditOutlined sx={{ mr: 1 }} />
                Edit
              </Link>
            ) : null}
          </div>
          <div className="basis-1/2 mb-8">
            <div style={{ color: palette["content-2"] }}>Reputation point</div>
            <h1 style={{ color: palette["content-1"] }}>{reputation}</h1>
          </div>
          <div className="basis-1/2 mb-8">
            <div style={{ color: palette["content-2"] }}>Solved</div>
            <h1 style={{ color: palette["content-1"] }}>{solved}</h1>
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Email
            </div>
            <p style={{ color: palette["content-1"] }}>{email}</p>
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Answered
            </div>
            <p style={{ color: palette["content-1"] }}>{answered}</p>
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Birthday
            </div>
            <p style={{ color: palette["content-1"] }}>{birthday}</p>
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Interest tags
            </div>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Tag
                  key={tag._id}
                  title={tag.name}
                  onClick={() => tagClickHandler(tag)}
                />
              ))
            ) : (
              <p style={{ color: palette["content-1"] }}>-</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
