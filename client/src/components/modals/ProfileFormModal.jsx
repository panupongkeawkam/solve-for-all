import { useEffect, useState } from "react";
import { Dialog, DialogContent, IconButton, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import * as Icon from "@mui/icons-material";

import palette from "../../style/palette";
import { imageToObjectURL } from "../../utils/lamda";
import { authAxios } from "../../utils/axios.config";

import SideBarNavigatorButton from "../buttons/SideBarNavigatorButton";
import TextField from "../inputs/TextField";
import PasswordField from "../inputs/PasswordField";
import TextArea from "../inputs/TextArea";
import DatePicker from "../inputs/DatePicker";
import Button from "../buttons/Button";
import TagInput from "../inputs/TagInput";
import LoadingIndicator from "../LoadingIndicator";

export default ({ active = false, onClose, user }) => {
  const tags = useSelector((state) => state.tag.tags);
  const [loading, setLoading] = useState(false);
  const [editingPage, setEditingPage] = useState("profile");

  const [profilePicture, setProfilePicture] = useState(user?.image);

  const [name, setName] = useState(user?.name);

  const [email, setEmail] = useState(user?.email);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [bio, setBio] = useState(user?.bio);

  const [birthday, setBirthday] = useState(user?.birthday);

  const [selectedTags, setSelectedTags] = useState(user?.tags);

  const [username, setUsername] = useState(user?.username);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const profilePictureChangeHandler = () => {
    let input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      if (!e.target.files[0].type.includes("image")) {
        return;
      }
      let imageFile = e.target.files[0];
      console.log(imageFile);
      setProfilePicture(imageFile);
    };

    input.click();
  };

  const nameChangeHandler = (text) => {
    setName(text);
  };

  const emailChangeHandler = (text) => {
    setEmailError(false);
    setEmailErrorMessage("");
    setEmail(text);
  };

  const bioChangeHandler = (text) => {
    setBio(text);
  };

  const birthdayChangeHandler = (date) => {
    setBirthday(date);
  };

  const tagChangeHandler = (tags) => {
    setSelectedTags(tags);
  };

  useEffect(() => {
    setProfilePicture(user?.image);
    setName(user?.name);
    setEmail(user?.email);
    setBio(user?.bio);
    setBirthday(user?.birthday);
    setSelectedTags(user?.tags);

    setUsername(user?.username);
  }, [user]);

  const oldPasswordChangeHandler = (text) => {
    setOldPassword(text);
  };

  const newPasswordChangeHandler = (text) => {
    setNewPassword(text);
  };

  const reNewPasswordChangeHandler = (text) => {
    setReNewPassword(text);
  };

  const submitEditProfileHandler = async () => {
    console.log(name, email, bio, birthday, selectedTags);
    // setLoading(true);
    // const formData = new FormData();
    // formData.append("name", JSON.stringify(name));
    // formData.append("email", JSON.stringify(email));
    // formData.append("bio", JSON.stringify(bio));
    // // formData.append("birthday", JSON.stringify(birthday));
    // formData.append("tags", JSON.stringify(selectedTags));
    // if (typeof image === "string") {
    //   formData.append("image", JSON.stringify(profilePicture));
    // } else {
    //   formData.append("image", profilePicture);
    // }

    // const res = await authAxios.put(`/api/users/${user?._id}`, formData);
    // window.location.href = `/users/${user?._id}`;
  };

  return (
    <>
      <Dialog
        open={active}
        closeAfterTransition
        maxWidth="xl"
        style={{ backdropFilter: "blur(40px)" }}
        PaperProps={{
          style: { borderRadius: 12, background: "none" },
        }}
      >
        <DialogContent
          dividers
          style={{
            height: "88vh",
            width: "55vw",
            padding: 0,
            background: palette["base-2"],
            borderBottom: "none",
            borderTop: "none",
          }}
        >
          <div className="flex flex-row h-full overflow-y-hidden">
            <div
              className="basis-3/12 h-full p-7 border-r"
              style={{
                borderColor: palette["content-3"],
                backgroundColor: palette["base-1"],
              }}
            >
              <SideBarNavigatorButton
                label={"Profile"}
                activeIcon={<Icon.AccountBox />}
                inactiveIcon={<Icon.AccountBoxOutlined />}
                active={editingPage === "profile"}
                onClick={() => setEditingPage("profile")}
              />
              <SideBarNavigatorButton
                label={"Account"}
                activeIcon={<Icon.VpnKey />}
                inactiveIcon={<Icon.VpnKeyOutlined />}
                active={editingPage === "account"}
                onClick={() => setEditingPage("account")}
              />
            </div>
            <div className="basis-9/12 h-full p-7 pl-16 overflow-y-auto">
              {editingPage === "profile" ? (
                <section className="flex flex-col">
                  <div
                    className="flex flex-row mb-6"
                    style={{ alignItems: "space-between" }}
                  >
                    <div className="basis-3/4 flex flex-col">
                      <h2 style={{ color: palette["content-2"] }}>
                        Profile information
                      </h2>
                    </div>
                    <div className="basis-1/4 flex flex-col items-end">
                      <IconButton onClick={onClose}>
                        <Icon.CloseOutlined />
                      </IconButton>
                    </div>
                  </div>
                  <div className="flex flex-col 2xl:pr-16 lg:pr-12">
                    <div className="mb-4">
                      <p style={{ color: palette["content-1"] }}>
                        Profile picture
                      </p>
                    </div>
                    <div className="flex flex-row items-center mb-6">
                      <div className="flex flex-col">
                        {profilePicture ? (
                          <Avatar
                            sx={{ width: "80px", height: "80px" }}
                            src={
                              typeof profilePicture === "string"
                                ? profilePicture
                                : imageToObjectURL(profilePicture)
                            }
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: "80px",
                              height: "80px",
                              fontSize: 48,
                            }}
                          >
                            {user?.username[0]?.toUpperCase()}
                          </Avatar>
                        )}
                      </div>
                      <div className="flex flex-col ml-5">
                        <Button
                          text="Change"
                          size="small"
                          variant="outlined"
                          color="content-1"
                          onClick={profilePictureChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <p style={{ color: palette["content-1"] }}>Details</p>
                    </div>
                    <div className="mb-2">
                      <TextField
                        value={name}
                        label="Display name"
                        inputProps={{
                          maxLength: 20,
                        }}
                        onTextChange={nameChangeHandler}
                      />
                    </div>
                    <div className="mb-2">
                      <TextField
                        value={email}
                        label="Email"
                        error={emailError}
                        helperText={emailError ? emailErrorMessage : null}
                        inputProps={{
                          maxLength: 30,
                        }}
                        onTextChange={emailChangeHandler}
                      />
                    </div>
                    <div className="mb-2">
                      <TextArea
                        value={bio}
                        label="Bio"
                        inputProps={{
                          maxLength: 300,
                        }}
                        onTextChange={bioChangeHandler}
                      />
                    </div>
                    <div className="mb-6">
                      <DatePicker
                        date={birthday}
                        label={"Birthday"}
                        onDateChange={birthdayChangeHandler}
                      />
                    </div>
                    <div>
                      <p
                        style={{ color: palette["content-1"] }}
                        className="mb-2"
                      >
                        Interesting tags
                      </p>
                      <TagInput
                        selectedTags={selectedTags}
                        tags={tags}
                        onTagChange={tagChangeHandler}
                        limitLength={5}
                      />
                    </div>
                    <div className="mt-6">
                      <Button
                        text="Submit"
                        size="small"
                        onClick={submitEditProfileHandler}
                      />
                    </div>
                  </div>
                </section>
              ) : (
                <section className="flex flex-col">
                  <div
                    className="flex flex-row mb-6"
                    style={{ alignItems: "space-between" }}
                  >
                    <div className="basis-full flex flex-col">
                      <h2 style={{ color: palette["content-2"] }}>
                        Security & Account
                      </h2>
                    </div>
                    <div className="basis-full flex flex-col items-end">
                      <IconButton onClick={onClose}>
                        <Icon.CloseOutlined />
                      </IconButton>
                    </div>
                  </div>
                  <div className="flex flex-col 2xl:pr-16 lg:pr-12">
                    <div className="mb-3">
                      <p style={{ color: palette["content-1"] }}>Username</p>
                    </div>
                    <TextField
                      value={username}
                      label="Username"
                      inputProps={{
                        maxLength: 20,
                      }}
                      disabled
                    />
                    <div className="mb-6">
                      <span style={{ color: palette["content-2"] }}>
                        You can’t change an username because this will be
                        identify yourself
                      </span>
                    </div>
                    <div className="mb-3">
                      <p style={{ color: palette["content-1"] }}>
                        Change password
                      </p>
                    </div>
                    <PasswordField
                      value={oldPassword}
                      label="Old password"
                      // error={passwordError}
                      // helperText={passwordError ? passwordErrorMessage : null}
                      inputProps={{
                        maxLength: 40,
                      }}
                      onPasswordChange={oldPasswordChangeHandler}
                    />
                    <PasswordField
                      value={newPassword}
                      label="New password"
                      // error={passwordError}
                      // helperText={passwordError ? passwordErrorMessage : null}
                      inputProps={{
                        maxLength: 40,
                      }}
                      onPasswordChange={newPasswordChangeHandler}
                    />
                    <PasswordField
                      value={reNewPassword}
                      label="Confirm new password"
                      // error={passwordError}
                      // helperText={passwordError ? passwordErrorMessage : null}
                      inputProps={{
                        maxLength: 40,
                      }}
                      onPasswordChange={reNewPasswordChangeHandler}
                    />
                    <div className="mb-6">
                      <span style={{ color: palette["content-2"] }}>
                        Password contain only A-Z, a-z, 0-9 or _, 8-20 length
                        characters and includes at least 2 character and 2
                        numeric
                      </span>
                    </div>
                    <div>
                      <Button
                        text="Submit"
                        size="small"
                        // onClick={submitEditProfileHandler}
                      />
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <LoadingIndicator active={loading} />
    </>
  );
};
