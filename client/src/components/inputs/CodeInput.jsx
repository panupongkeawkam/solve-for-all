import { useState } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai, githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";

import palette from "../../style/palette";
import { languages } from "../../utils/dummy";

import InvisibleTextArea from "./InvisibleTextArea";

export default ({ code, onCodeChange, language, onLanguageChange }) => {
  const [codeState, setCodeState] = useState("edit");

  return (
    <div
      className="rounded-[8px] p-5 flex flex-col my-2"
      style={{ backgroundColor: palette["base-3"] }}
    >
      <div className="basis-full flex flex-row mb-4">
        <ToggleButtonGroup
          size="small"
          value={codeState}
          sx={{ mt: "2px", mr: 2 }}
        >
          <ToggleButton
            value={"edit"}
            sx={{ px: 2, fontSize: "16px", textTransform: "none" }}
            onClick={() => setCodeState("edit")}
          >
            Edit
          </ToggleButton>
          <ToggleButton
            value={"preview"}
            sx={{ px: 2, fontSize: "16px", textTransform: "none" }}
            onClick={() => setCodeState("preview")}
          >
            Preview
          </ToggleButton>
        </ToggleButtonGroup>
        <Select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          sx={{ m: 0 }}
        >
          {languages.map((language, index) => (
            <MenuItem value={language.name} key={index}>
              {language.title}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="basis-full">
        {codeState === "edit" ? (
          <InvisibleTextArea
            message={code}
            placeholder={"place code here..."}
            fontSize={"12px"}
            onTextChange={onCodeChange}
            fontFamily={
              "source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace"
            }
          />
        ) : (
          <SyntaxHighlighter
            language={language}
            style={monokai}
            customStyle={{
              backgroundColor: "transparent",
              padding: 0,
              marginBottom: "3px",
              lineHeight: "16px",
              OverflowY: "visible",
            }}
            onClick={() => setCodeState("edit")}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};
