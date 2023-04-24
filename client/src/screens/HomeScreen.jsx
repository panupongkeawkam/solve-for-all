import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link as RouterLink,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { IconButton, Menu, Badge } from "@mui/material";
import * as Icon from "@mui/icons-material";
import Cookies from "js-cookie";

import palette from "../style/palette";
import store from "../store/index";
import { fetchSuggestedUsers } from "../store/userSlice";

import QuestionFormModal from "../components/modals/QuestionFormModal";
import DialogModal from "../components/modals/DialogModal";
import Button from "../components/buttons/Button";
import Logo from "../components/Logo";
import SearchField from "../components/inputs/SearchField";
import User from "../components/User";
import SideBarNavigatorButton from "../components/buttons/SideBarNavigatorButton";
import SmallSearchField from "../components/inputs/SmallSearchField";
import EmptyData from "../components/EmptyData";
import LoadingIndicator from "../components/LoadingIndicator";

export default () => {
  const user = useSelector((state) => state.user.user);
  const authenticatingUser = useSelector(
    (state) => state.user.authenticatingUser
  );
  const suggestedUsers = useSelector((state) => state.user.suggestedUsers);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(fetchSuggestedUsers());
    // test()
  }, []);

  useEffect(() => {
    setGuestMode(!user);
  }, [user]);

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const [guestMode, setGuestMode] = useState(!Boolean(user));

  const filterSuggestedUsers = (suggestedUsersArg) => {
    return suggestedUsersArg
      .filter((suggestedUser) => suggestedUser?._id !== user?._id)
      .slice(0, 2);
  };

  // const test = () => {
  //   // Define an empty object to store the colors
  //   const colors = {};

  //   // Loop through ASCII codes for A-Z
  //   for (let i = 65; i <= 90; i++) {
  //     // Generate a random hue value between 0 and 360
  //     const hue = Math.floor(Math.random() * 360);

  //     // Convert the hue to an HSL color string
  //     const color = `hsl(${hue}, 60%, 70%)`;

  //     // Convert the ASCII code to a character
  //     const char = String.fromCharCode(i);

  //     // Add the color to the object with the character as the key
  //     colors[char] = color;
  //   }

  //   // Example usage: get the color for the letter 'G'
  //   const colorG = colors['G'];
  //   console.log(colors); // Output: "hsl(215, 60%, 70%)"
  // }

  const searchSubmitHandler = (searchQuery) => {
    console.log(searchQuery);
  };

  const userSearchSubmitHandler = (searchQuery) => {
    console.log(searchQuery);
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
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    setShowConfirmLogoutModal(false);
    window.location.href = "/";
  };

  const NotificationAnchor = () => (
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
      <div className="flex flex-col px-5 py-2" style={{ width: 400 }}>
        <div className="flex flex-row">
          <p className="mr-2" style={{ color: palette["content-1"] }}>
            Notifications
          </p>
          <p style={{ color: palette["content-2"] }}>12</p>
        </div>
        <div className="h-[360px]">
          <EmptyData
            title={"No notifications"}
            description={"People didn't answer your questions"}
            minimized
          />
        </div>
      </div>
    </Menu>
  );

  return (
    <div
      className="flex flex-col w-screen h-screen overflow-hidden"
      style={{ backgroundColor: palette["base-1"] }}
    >
      {/* nav bar */}
      <div className="w-full flex flex-row py-2">
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
              placeholder="Search"
              onSearchSubmit={searchSubmitHandler}
            />
          </div>
          {/* check for guest mode then change component to display */}
          {guestMode ? (
            <div className="2xl:px-8 px-4">
              <RouterLink to="/login" className="mx-3">
                <Button text="Login" variant="outlined" />
              </RouterLink>
              <RouterLink to="/signup">
                <Button text="Sign up" />
              </RouterLink>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-3">
              <div>
                <IconButton onClick={openNotificationAnchorHandler}>
                  <Badge color="wrong" badgeContent={2}>
                    <Icon.NotificationsOutlined />
                  </Badge>
                </IconButton>
                <NotificationAnchor />
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
          <div className="basis-1/6 flex items-center 2xl:px-8 px-4">
            <a href={`/users/${user._id}`}>
              <User
                name={user.name}
                username={user.username}
                imageUrl={user.image}
              />
            </a>
          </div>
        )}
      </div>
      {/* body */}
      <div className="w-full flex flex-row">
        {/* left side bar */}
        <div className="basis-1/6 2xl:px-8 px-4">
          <RouterLink to="/">
            <SideBarNavigatorButton
              label={"Home"}
              activeIcon={<Icon.Home />}
              inactiveIcon={<Icon.HomeOutlined />}
              active={location.pathname === "/"}
            />
          </RouterLink>
          {guestMode ? null : (
            <RouterLink to="/interested">
              <SideBarNavigatorButton
                label={"Interested"}
                activeIcon={<Icon.Grade />}
                inactiveIcon={<Icon.GradeOutlined />}
                active={location.pathname === "/interested"}
              />
            </RouterLink>
          )}
          <RouterLink to="/tags">
            <SideBarNavigatorButton
              label={"Tags"}
              activeIcon={<Icon.LocalOffer />}
              inactiveIcon={<Icon.LocalOfferOutlined />}
              active={location.pathname === "/tags"}
            />
          </RouterLink>
        </div>
        {/* content pages */}
        <div className="basis-4/6 h-screen overflow-y-auto pr-3 pb-40">
          {/* for pages (routes children) */}
          <Outlet />
        </div>
        {/* right side bar */}
        <div className="basis-1/6 flex flex-col 2xl:px-8 px-4">
          <div className="mb-5">
            <SmallSearchField
              icon={<Icon.PeopleAltOutlined sx={{ fontSize: "16px" }} />}
              placeholder="Find people"
              onSearchSubmit={userSearchSubmitHandler}
            />
          </div>
          <div className="mb-5">
            <p style={{ color: palette["content-1"] }}>Suggested people</p>
          </div>
          {/* suggested users */}
          {filterSuggestedUsers(suggestedUsers).map((suggestedUser, index) => (
            <div className="mb-3" key={index}>
              <User
                name={suggestedUser.name}
                username={suggestedUser.username}
                onClick={() =>
                  (window.location.href = `/users/${suggestedUser._id}`)
                }
                imageUrl={suggestedUser.image}
              />
            </div>
          ))}
        </div>
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
      <LoadingIndicator active={authenticatingUser} />
    </div>
  );
};
