import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { IconButton, Menu } from "@mui/material";
import * as Icon from "@mui/icons-material";

import store from "../store/index";

import palette from "../style/palette";

import HomePage from "../pages/HomePage";
import InterestedPage from "../pages/InterestedPage";
import ComponentTestPage from "../pages/ComponentTestPage";

import QuestionFormModal from "../components/modals/QuestionFormModal";
import DialogModal from "../components/modals/DialogModal";
import Button from "../components/buttons/Button";
import Logo from "../components/Logo";
import SearchField from "../components/inputs/SearchField";
import User from "../components/User";

export default () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const [guestMode, setGuestMode] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      setGuestMode(true);
    }
  }, [user]);

  const searchQueryChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleAddQuestionModalHandler = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };

  const toggleConfirmLogoutModalHandler = () => {
    setShowConfirmLogoutModal(!showConfirmLogoutModal);
  };

  const openNotificationAnchorHandler = (e) => {
    setNotificationAnchorEl(e.currentTarget);
  };

  const closeNotificationAnchorHandler = () => {
    setNotificationAnchorEl(null);
  };

  const logoutHandler = () => {
    window.location.href = "/";
    setShowConfirmLogoutModal(false);
  };

  return (
    <div
      className="flex flex-col w-screen h-screen overflow-x-hidden px-4"
      style={{ backgroundColor: palette["base-1"] }}
    >
      <div className="w-full flex flex-row sticky top-0 py-2">
        <div className="basis-1/6 flex items-center"></div>
        <div
          className={
            guestMode
              ? "basis-5/6 flex flex-row items-center"
              : "basis-4/6 flex flex-row items-center"
          }
          style={{ justifyContent: "space-between" }}
        >
          <div className="mr-5">
            <SearchField
              value={searchQuery}
              placeholder="Search"
              onChange={searchQueryChangeHandler}
            />
          </div>
          {/* check for guest mode then change component to display */}
          {guestMode ? (
            <div>
              <RouterLink to="/login" className="mx-3">
                <Button text="Login" variant="outlined" size="small" />
              </RouterLink>
              <RouterLink to="/signup">
                <Button text="Sign up" size="small" />
              </RouterLink>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-3">
              <div>
                <IconButton onClick={openNotificationAnchorHandler}>
                  <Icon.NotificationsOutlined />
                </IconButton>
                <Menu
                  id="test-box"
                  anchorEl={notificationAnchorEl}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  open={Boolean(notificationAnchorEl)}
                  onClose={closeNotificationAnchorHandler}
                >
                  <div
                    className="flex flex-col px-5 py-2"
                    style={{ width: 400 }}
                  >
                    <div className="flex flex-row">
                      <p
                        className="mr-2"
                        style={{ color: palette["content-1"] }}
                      >
                        Notifications
                      </p>
                      <p style={{ color: palette["content-2"] }}>12</p>
                    </div>
                  </div>
                </Menu>
              </div>
              <IconButton onClick={toggleConfirmLogoutModalHandler}>
                <Icon.LogoutOutlined />
              </IconButton>
              <Button
                text="Ask question"
                onClick={toggleAddQuestionModalHandler}
              />
            </div>
          )}
        </div>
        {/* check for guest mode then change component to display */}
        {guestMode ? null : (
          <div className="basis-1/6 flex items-center 2xl:pl-8 pl-4">
            <User
              name={"Dominic Torettoa"}
              username={"dom_family"}
              imageUrl={null}
            />
          </div>
        )}
      </div>
      <div className="w-full flex flex-row">
        <div className="basis-1/6"></div>
        <div className="basis-4/6">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/interested" element={<InterestedPage />} />
            <Route path="/test" element={<ComponentTestPage />} />
          </Routes>
        </div>
        <div className="basis-1/6 flex 2xl:pl-8 pl-4"></div>
      </div>
      <Logo />
      <QuestionFormModal
        active={showAddQuestionModal}
        submitText="Publish"
        doingMessage="Asking question..."
        onClose={toggleAddQuestionModalHandler}
      />
      <DialogModal
        active={showConfirmLogoutModal}
        confirmText="Logout"
        title={"Are you sure to logout?"}
        onConfirm={logoutHandler}
        danger
        onClose={toggleConfirmLogoutModalHandler}
      />
    </div>
  );
};
