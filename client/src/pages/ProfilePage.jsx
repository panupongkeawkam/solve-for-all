import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import palette from "../style/palette";
import axios from "../utils/axios.config"

import UserDetail from "../components/UserDetail";
import UserDetailSkeleton from "../components/skeletons/UserDetailSkeleton";
import EmptyData from "../components/EmptyData";
import ProfileFormModal from "../components/modals/ProfileFormModal";

export default () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate()
  const { userId } = useParams();
  const [viewingUser, setViewingUser] = useState(null)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    if (userId !== user?._id) {
      axios.get(`/api/users/${userId}`)
        .then(res => {
          if (res.data.user !== null) {
            setViewingUser(res.data.user)
          } else {
            navigate('/notfound')
          }
        })
        .catch(err => {
          navigate('/notfound')
        })
    } else {
      setViewingUser(user)
    }
  }, []);

  const toggleEditProfileModalHandler = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  return (
    <>
      <div className="flex flex-col w-full pt-3">
        <div className="w-full">
          {Boolean(viewingUser) ?
            <UserDetail {...viewingUser} onEdit={toggleEditProfileModalHandler} /> : <UserDetailSkeleton />}
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
