import React, { useState } from "react";
import { TextField } from "@mui/material";

export default ({ onTextChange, ...props }) => {
  const [value, setValue] = useState(props.value);

  const changeHandler = (e) => {
    let text = e.target.value;
    setValue(text);
    onTextChange(text);
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={changeHandler}
      color="content-3"
      className="inputRounded"
      sx={{
        my: 1,
        fontSize: "16px",
      }}
      fullWidth
      size="small"
      multiline
      minRows={2}
      helperText={`${value?.length} of ${props.inputProps.maxLength}`}
    />
  );
};
