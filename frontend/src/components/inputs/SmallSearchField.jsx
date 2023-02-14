import React from "react";
import { OutlinedInput, InputAdornment } from "@mui/material";
import * as Icon from "@mui/icons-material";

export default (props) => {
  return (
    <OutlinedInput
      {...props}
      color="content-3"
      sx={{
        my: 1,
        px: "4px",
        fontSize: "12px",
        borderRadius: "8px",
      }}
      label={null}
      fullWidth
      startAdornment={
        <InputAdornment position="start" sx={{ mx: 1 }}>
          {props.icon || <Icon.Search fontSize="12px" />}
        </InputAdornment>
      }
      size="small"
    />
  );
};
