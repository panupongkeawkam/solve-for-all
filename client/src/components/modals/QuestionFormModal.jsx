import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import * as Icon from "@mui/icons-material";

import palette from "../../style/palette";

import Button from "../buttons/Button";
import InvisibleTextArea from "../inputs/InvisibleTextArea";
import MultipleAction from "../buttons/MultipleAction";
import TagInput from "../inputs/TagInput";
import CodeInput from "../inputs/CodeInput";
import LoadingIndicator from "../LoadingIndicator";

export default ({
  active = false,
  submitText = "Submit",
  doingMessage,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [questionBodies, setQuestionBodies] = useState([
    { type: "paragraph", msg: "" },
  ]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const actions = [
    { icon: <Icon.TitleOutlined fontSize="16" />, name: "header" },
    { icon: <Icon.Notes fontSize="16" />, name: "paragraph" },
    { icon: <Icon.CodeOutlined fontSize="16" />, name: "code" },
    { icon: <Icon.ImageOutlined fontSize="16" />, name: "image" },
  ];

  const tagsDummy = [
    { _id: "1", name: "java" },
    { _id: "2", name: "javascript" },
    { _id: "3", name: "tech" },
    { _id: "4", name: "cat" },
    { _id: "5", name: "coffee" },
    { _id: "6", name: "9arm" },
  ];

  function parseBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    let result = null;
    reader.onload = function () {
      result = reader.result;
    };
    reader.onerror = function (error) {
      throw error;
    };

    return result;
  }

  const actionChangeHandler = (actionName) => {
    if (actionName === "header") {
      let header = {
        type: "header",
        msg: "",
      };

      setQuestionBodies([...questionBodies, header]);
    } else if (actionName === "paragraph") {
      let paragraph = {
        type: "paragraph",
        msg: "",
      };

      setQuestionBodies([...questionBodies, paragraph]);
    } else if (actionName === "code") {
      let code = {
        type: "code",
        language: "javascript",
        code: "",
      };

      setQuestionBodies([...questionBodies, code]);
    } else if (actionName === "image") {
      let input = document.createElement("input");

      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e) => {
        if (!e.target.files[0].type.includes("image")) {
          setShowSnackbar(true);
          // alert("Invalid file type");
          return;
        }
        let image = {
          type: "image",
          image: e.target.files[0],
        };
        // parseBase64(e.target.files[0]);
        setQuestionBodies([...questionBodies, image]);
      };

      input.click();
    }
  };

  const headerOrParagraphChangeHandler = (msg, index) => {
    let questionBodiesVar = questionBodies;
    questionBodiesVar[index].msg = msg;
    setQuestionBodies([...questionBodiesVar]);
  };

  const codeChangeHandler = (code, index) => {
    let questionBodiesVar = questionBodies;
    questionBodiesVar[index].code = code;
    setQuestionBodies([...questionBodiesVar]);
  };

  const languageChangeHandler = (language, index) => {
    let questionBodiesVar = questionBodies;
    questionBodiesVar[index].language = language;
    setQuestionBodies([...questionBodiesVar]);
  };

  const imageToObjectURL = (imageArg) => {
    if (typeof imageArg !== "object") {
      return imageArg;
    } else if (imageArg) {
      return URL.createObjectURL(imageArg);
    }
  };

  const deleteHandler = (index) => {
    let questionBodiesVar = questionBodies;
    questionBodiesVar.splice(index, 1);
    setQuestionBodies([...questionBodiesVar]);
  };

  const tagChangeHandler = (tags) => {
    setSelectedTags(tags);
  };

  const submitHandler = () => {
    console.log(title, questionBodies, selectedTags);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
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
            <div className="basis-3/4">
              <div className="w-full flex flex-row">
                <div className="w-auto ">
                  <Avatar sx={{ width: "40px", height: "40px" }}>D</Avatar>
                </div>
                <div className="w-auto flex flex-col ml-[16px]">
                  <div className="flex flex-row items-end ">
                    <p
                      style={{ color: palette["content-1"] }}
                      className="mr-[8px]"
                    >
                      Dominic Toretto
                    </p>
                    <span style={{ color: palette["content-2"] }}>
                      @dom_family
                    </span>
                  </div>
                  <div>
                    <span style={{ color: palette["content-2"] }}>
                      {doingMessage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* button section */}
            <div className="basis-1/4 flex justify-end">
              <span className="mr-2">
                <Button
                  text="Cancel"
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
            {/* question title */}
            <div className="basis-full flex flex-row mb-3">
              <div className="basis-5/6">
                <InvisibleTextArea
                  message={title}
                  maxLength={128}
                  bold
                  placeholder={"Title"}
                  onTextChange={setTitle}
                  fontSize="32px"
                  fontFamily={"Lora, serif"}
                />
              </div>
            </div>

            {/* question bodies */}
            {questionBodies.map((body, index) => {
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
                          fontFamily={"Lora, serif"}
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
                          fontFamily={"Lora, serif"}
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
            <p style={{ color: palette["content-1"] }}>
              Select tag of question
            </p>
            <span style={{ color: palette["content-2"] }}>
              Add tags to this question, will make people who interest in this
              topic easily find it.
            </span>
            <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-3/4">
              <TagInput
                selectedTags={selectedTags}
                tags={tagsDummy}
                onTagChange={tagChangeHandler}
                limitLength={5}
                creatable
              />
            </div>
          </div>
        </DialogContent>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={5000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            Invalid file type, require image only
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  );
};
