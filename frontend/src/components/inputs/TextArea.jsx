import React from "react";
import { TextField } from "@mui/material";

export default (props) => {
  return (
    <TextField
      {...props}
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
      helperText={`${props.value.length} of 256`}
    />
  );
};
