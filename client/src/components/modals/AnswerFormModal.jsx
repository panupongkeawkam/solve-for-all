import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import * as Icon from "@mui/icons-material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import palette from "../../style/palette";
import store from "../../store/index";
import { authAxios } from "../../utils/axios.config";
import { avatarColors } from "../../utils/dummy";
import { imageToObjectURL } from "../../utils/lamda";

import Button from "../buttons/Button";
import InvisibleTextArea from "../inputs/InvisibleTextArea";
import MultipleAction from "../buttons/MultipleAction";
import CodeInput from "../inputs/CodeInput";
import LoadingIndicator from "../LoadingIndicator";

export default ({
  active = false,
  submitText = "Submit",
  doingMessage,
  targetQuestion,
  onClose,
}) => {
  const user = useSelector((state) => state.user.user);

  const [answerBodies, setAnswerBodies] = useState([
    { type: "paragraph", msg: "" },
  ]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [loading, setLoading] = useState(false);

  const actions = [
    { icon: <Icon.TitleOutlined fontSize="16" />, name: "header" },
    { icon: <Icon.Notes fontSize="16" />, name: "paragraph" },
    { icon: <Icon.CodeOutlined fontSize="16" />, name: "code" },
    { icon: <Icon.ImageOutlined fontSize="16" />, name: "image" },
  ];

  const actionChangeHandler = (actionName) => {
    if (actionName === "header") {
      let header = {
        type: "header",
        msg: "",
      };

      setAnswerBodies([...answerBodies, header]);
    } else if (actionName === "paragraph") {
      let paragraph = {
        type: "paragraph",
        msg: "",
      };

      setAnswerBodies([...answerBodies, paragraph]);
    } else if (actionName === "code") {
      let code = {
        type: "code",
        language: "javascript",
        code: "",
      };

      setAnswerBodies([...answerBodies, code]);
    } else if (actionName === "image") {
      let input = document.createElement("input");

      input.type = "file";
      input.accept = "image/png, image/jpg, image/jpeg, image/gif";

      input.onchange = (e) => {
        if (!e.target.files[0].type.includes("image")) {
          setShowSnackbar(true);
          setErrorMessage("Invalid file type, require image only");
          return;
        }
        let image = {
          type: "image",
          image: e.target.files[0],
        };
        setAnswerBodies([...answerBodies, image]);
      };

      input.click();
    }
  };

  const headerOrParagraphChangeHandler = (msg, index) => {
    let answerBodiesVar = answerBodies;
    answerBodiesVar[index].msg = msg;
    setAnswerBodies([...answerBodiesVar]);
  };

  const codeChangeHandler = (code, index) => {
    let answerBodiesVar = answerBodies;
    answerBodiesVar[index].code = code;
    setAnswerBodies([...answerBodiesVar]);
  };

  const languageChangeHandler = (language, index) => {
    let answerBodiesVar = answerBodies;
    answerBodiesVar[index].language = language;
    setAnswerBodies([...answerBodiesVar]);
  };

  const deleteHandler = (index) => {
    let answerBodiesVar = answerBodies;
    answerBodiesVar.splice(index, 1);
    setAnswerBodies([...answerBodiesVar]);
  };

  const submitHandler = async () => {
    const formData = new FormData();

    const filteredAnswerBodies = answerBodies.filter((answerBody) => {
      if (answerBody.type === "paragraph" || answerBody.type === "header") {
        return answerBody.msg.trim() !== "";
      } else if (answerBody.type === "code") {
        return answerBody.code.trim() !== "";
      } else {
        return true;
      }
    });

    if (filteredAnswerBodies.length === 0) {
      setShowSnackbar(true);
      setErrorMessage("Your answer is empty of content");
      return;
    }

    formData.append("body", JSON.stringify(filteredAnswerBodies));
    formData.append(
      "question",
      JSON.stringify({
        _id: targetQuestion._id,
        createdBy: targetQuestion.createdBy._id,
      })
    );
    answerBodies.forEach((answerBody, index) => {
      if (answerBody.type === "image") {
        formData.append("images", answerBody.image);
      }
    });
    try {
      setLoading(true);
      const res = await authAxios.post(`/api/answers`, formData);
      const answer = res.data.answer;
      store.dispatch(appendAnswer(answer));
      setAnswerBodies([{ type: "paragraph", msg: "" }]);
      setLoading(false);
      onClose();
      window.location.reload();
    } catch (err) {
      setLoading(false);
      setShowSnackbar(true);
      setErrorMessage(
        err.response.data.message || "Something when wrong, please try again"
      );
    }
  };

  return (
    <>
      <LoadingIndicator active={loading} />
      <Dialog
        open={active}
        closeAfterTransition
        maxWidth="xl"
        style={{ backdropFilter: "blur(40px)" }}
        PaperProps={{
          style: { borderRadius: 12, background: "none" },
        }}
      >
        {/* modal header */}
        <DialogTitle
          style={{
            width: "66vw",
            padding: 0,
            backgroundColor: palette["base-2"],
          }}
        >
          <div
            className="w-full h-full flex flex-row items-center shadow-2xl px-7 pt-7 pb-2"
            style={{ backgroundColor: palette["base-2"] }}
          >
            {/* user section */}
            <div className="basis-3/4 flex flex-row">
              <div className="flex flex-row">
                <div className="w-auto">
                  {user?.image ? (
                    <Avatar
                      alt={user?.username}
                      src={user?.image}
                      sx={{ width: "40px", height: "40px" }}
                    />
                  ) : (
                    <Avatar
                      alt={user?.username}
                      sx={{
                        width: "40px",
                        height: "40px",
                        backgroundColor:
                          avatarColors[user?.username[0]?.toUpperCase()],
                      }}
                    >
                      {user?.username[0]?.toUpperCase()}
                    </Avatar>
                  )}
                </div>
                <div className="w-auto flex flex-col ml-[16px]">
                  <div className="flex flex-row items-end ">
                    <p
                      style={{ color: palette["content-1"] }}
                      className="mr-[8px]"
                    >
                      {user?.name}
                    </p>
                    <span style={{ color: palette["content-2"] }}>
                      @{user?.username}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: palette["content-2"] }}>
                      {doingMessage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mx-12">
                <KeyboardDoubleArrowRightIcon color={"content-2"} />
              </div>
              <div className="flex flex-row">
                <div className="w-auto">
                  {targetQuestion?.createdBy?.image ? (
                    <Avatar
                      alt={targetQuestion?.createdBy?.username}
                      src={targetQuestion?.createdBy?.image}
                      sx={{ width: "40px", height: "40px" }}
                    />
                  ) : (
                    <Avatar
                      alt={targetQuestion?.createdBy?.username}
                      sx={{
                        width: "40px",
                        height: "40px",
                        backgroundColor:
                          avatarColors[
                            targetQuestion?.createdBy?.username[0]?.toUpperCase()
                          ],
                      }}
                    >
                      {targetQuestion?.createdBy?.username[0]?.toUpperCase()}
                    </Avatar>
                  )}
                </div>
                <div className="w-auto flex flex-col ml-[16px]">
                  <div className="flex flex-row items-end ">
                    <p
                      style={{ color: palette["content-1"] }}
                      className="mr-[8px]"
                    >
                      {targetQuestion?.createdBy?.name}
                    </p>
                    <span style={{ color: palette["content-2"] }}>
                      @{targetQuestion?.createdBy?.username}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: palette["content-2"] }}>
                      Asking question...
                      {/* {targetQuestion?.title.slice(0, 20)}
                      {targetQuestion?.title?.length > 17 ? "..." : ""} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* button section */}
            <div className="basis-1/4 flex justify-end">
              <span className="mr-2">
                <Button
                  text="Close"
                  size="small"
                  variant="outlined"
                  onClick={onClose}
                />
              </span>
              <Button text={submitText} size="small" onClick={submitHandler} />
            </div>
          </div>
        </DialogTitle>
        {/* modal body */}
        <DialogContent
          dividers
          style={{
            height: "80vh",
            background: palette["base-2"],
            borderBottom: "none",
            borderTop: "none",
            paddingLeft: "1.75rem",
          }}
        >
          {/* modal content */}
          <div className="pl-[56px] mb-[200px]">
            {/* answer bodies */}
            {answerBodies.map((body, index) => {
              switch (body.type) {
                case "header":
                  return (
                    <div className="basis-full flex flex-row mb-5" key={index}>
                      <div className="basis-5/6">
                        <InvisibleTextArea
                          message={body.msg}
                          bold
                          maxLength={256}
                          placeholder={"Header"}
                          onTextChange={(text) =>
                            headerOrParagraphChangeHandler(text, index)
                          }
                          fontSize="24px"
                          fontFamily={
                            "Lora, serif, IBM Plex Sans Thai, sans-serif"
                          }
                        />
                      </div>
                      <div className="basis-1/6 pl-2">
                        <IconButton onClick={() => deleteHandler(index)}>
                          <Icon.Close color="content-1" />
                        </IconButton>
                      </div>
                    </div>
                  );
                case "paragraph":
                  return (
                    <div className="basis-full flex flex-row mb-5" key={index}>
                      <div className="basis-5/6">
                        <InvisibleTextArea
                          message={body.msg}
                          placeholder={"Write a paragraph here..."}
                          onTextChange={(text) =>
                            headerOrParagraphChangeHandler(text, index)
                          }
                          fontSize="18px"
                          onDelete={() => deleteHandler(index)}
                          fontFamily={
                            "Lora, serif, IBM Plex Sans Thai, sans-serif"
                          }
                        />
                      </div>
                      <div className="basis-1/6 pl-2">
                        <IconButton onClick={() => deleteHandler(index)}>
                          <Icon.Close color="content-1" />
                        </IconButton>
                      </div>
                    </div>
                  );
                case "code":
                  return (
                    <div className="basis-full flex flex-row mb-5" key={index}>
                      <div className="basis-5/6">
                        <CodeInput
                          code={body.code}
                          onCodeChange={(code) =>
                            codeChangeHandler(code, index)
                          }
                          language={body.language}
                          onLanguageChange={(language) =>
                            languageChangeHandler(language, index)
                          }
                        />
                      </div>
                      <div className="basis-1/6 pl-2">
                        <IconButton onClick={() => deleteHandler(index)}>
                          <Icon.Close color="content-1" />
                        </IconButton>
                      </div>
                    </div>
                  );
                case "image":
                  return (
                    <div className="basis-full flex flex-row mb-5" key={index}>
                      <img
                        width="100"
                        className="rounded-[8px] my-2 flex-1 flex"
                        src={imageToObjectURL(body.image)}
                        alt="Not found"
                      />
                      <div className="basis-1/6 pl-2">
                        <IconButton onClick={() => deleteHandler(index)}>
                          <Icon.Close color="content-1" />
                        </IconButton>
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}

            <div className="mb-10">
              <MultipleAction
                actions={actions}
                onActionChange={actionChangeHandler}
              />
            </div>
          </div>
        </DialogContent>
        <Slide direction="up" in={showSnackbar} mountOnEnter unmountOnExit>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={5000}
            onClose={() => setShowSnackbar(false)}
          >
            <Alert
              severity="error"
              sx={{ width: "100%", border: `1px solid ${palette.wrong}` }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </Slide>
      </Dialog>
    </>
  );
};
