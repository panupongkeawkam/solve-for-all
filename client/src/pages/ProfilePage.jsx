import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import palette from "../style/palette";

import UserDetail from "../components/UserDetail";
import EmptyData from "../components/EmptyData";
import ProfileFormModal from "../components/modals/ProfileFormModal";

export default () => {
  const user = useSelector((state) => state.user.user);
  const params = useParams();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    if (params.userId !== user._id) {
      // fetch for userId
    }
  }, []);

  const toggleEditProfileModalHandler = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  return (
    <>
      <div className="flex flex-col w-full pt-3">
        <div className="w-full">
          <UserDetail {...user} onEdit={toggleEditProfileModalHandler} />
        </div>
        <div className="w-full py-5">
          <p style={{ color: palette["content-2"] }}>
            Question
            <span
              style={{
                color: palette["content-1"],
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              0
            </span>
          </p>
        </div>
        <div className="w-full">
          <div className="w-full h-[160px]">
            <EmptyData
              title="No questions"
              description="This user didn't ask any questions"
              minimized
            />
          </div>
        </div>
      </div>
      <ProfileFormModal
        active={showEditProfileModal}
        onClose={toggleEditProfileModalHandler}
        user={user}
      />
    </>
  );
};
