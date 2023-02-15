import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
  IconButton,
} from "@mui/material";
import * as Icon from "@mui/icons-material";

import palette from "../../style/palette";

import Button from "../buttons/Button";
import InvisibleTextArea from "../inputs/InvisibleTextArea";
import MultipleAction from "../buttons/MultipleAction";
import TagInput from "../inputs/TagInput";
import CodeInput from "../inputs/CodeInput";

export default ({
  active = false,
  submitText = "Submit",
  doingMessage,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [questionBodies, setQuestionBodies] = useState([
    { type: "paragraph", msg: "" },
  ]);

  const actions = [
    { icon: <Icon.TitleOutlined fontSize="16" />, name: "header" },
    { icon: <Icon.Notes fontSize="16" />, name: "paragraph" },
    { icon: <Icon.CodeOutlined fontSize="16" />, name: "code" },
    { icon: <Icon.ImageOutlined fontSize="16" />, name: "image" },
  ];

  const tagsDummy = [
    { title: "java" },
    { title: "javascript" },
    { title: "tech" },
    { title: "cat" },
    { title: "coffee" },
    { title: "9arm" },
  ];

  function parseBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    var result = null;
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
      var header = {
        type: "header",
        msg: "",
      };

      setQuestionBodies([...questionBodies, header]);
    } else if (actionName === "paragraph") {
      var paragraph = {
        type: "paragraph",
        msg: "",
      };

      setQuestionBodies([...questionBodies, paragraph]);
    } else if (actionName === "code") {
      var code = {
        type: "code",
        language: "javascript",
        code: "",
      };

      setQuestionBodies([...questionBodies, code]);
    } else if (actionName === "image") {
      var input = document.createElement("input");

      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e) => {
        if (!e.target.files[0].type.includes("image")) {
          alert("Invalid file type");
          return;
        }
        var image = {
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
    var questionBodiesVar = questionBodies;
    questionBodiesVar[index].msg = msg;
    setQuestionBodies([...questionBodiesVar]);
  };

  const codeChangeHandler = (code, index) => {
    var questionBodiesVar = questionBodies;
    questionBodiesVar[index].code = code;
    setQuestionBodies([...questionBodiesVar]);
  };

  const languageChangeHandler = (language, index) => {
    var questionBodiesVar = questionBodies;
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
    var questionBodiesVar = questionBodies;
    questionBodiesVar.splice(index, 1);
    setQuestionBodies([...questionBodiesVar]);
  };

  const tagChangeHandler = (tags) => {
    setSelectedTags([...tags]);
  };

  const submitHandler = () => {
    onSubmit({
      title,
      ...{ body: [...questionBodies] },
      ...{ tags: [...selectedTags] },
    });
  };

  return (
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
        }}
      >
        <DialogContentText
          style={{ marginLeft: "56px", marginBottom: "200px" }}
        >
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
              />
            </div>
          </div>

          {/* question bodies */}
          {questionBodies.map((body, index) => {
            switch (body.type) {
              case "header":
                return (
                  <div className="basis-full flex flex-row mb-3">
                    <div className="basis-5/6">
                      <InvisibleTextArea
                        message={body.msg}
                        bold
                        maxLength={256}
                        placeholder={"Header"}
                        onTextChange={(text) =>
                          headerOrParagraphChangeHandler(text, index)
                        }
                        fontSize="20px"
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
                  <div className="basis-full flex flex-row mb-3">
                    <div className="basis-5/6">
                      <InvisibleTextArea
                        message={body.msg}
                        placeholder={"Write a paragraph here..."}
                        onTextChange={(text) =>
                          headerOrParagraphChangeHandler(text, index)
                        }
                        fontSize="16px"
                        onDelete={() => deleteHandler(index)}
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
                  <div className="basis-full flex flex-row mb-3">
                    <div className="basis-5/6">
                      <CodeInput
                        code={body.code}
                        onCodeChange={(code) => codeChangeHandler(code, index)}
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
                  <div className="basis-full flex flex-row mb-3">
                    <div className="basis-5/6">
                      <img
                        className="w-full rounded-[8px] my-2"
                        src={imageToObjectURL(body.image)}
                        alt="Not found"
                      />
                    </div>
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
          <p style={{ color: palette["content-1"] }}>Select tag of question</p>
          <span style={{ color: palette["content-2"] }}>
            Add tags to this question, will make people who interest in this
            topic easily find it.
          </span>
          <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-3/4">
            <TagInput options={tagsDummy} onTagChange={tagChangeHandler} />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
