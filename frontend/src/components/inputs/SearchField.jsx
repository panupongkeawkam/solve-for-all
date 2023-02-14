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
        px: 1,
        py: "1px",
        fontSize: "16px",
        borderRadius: 100,
      }}
      label={null}
      fullWidth
      startAdornment={
        <InputAdornment position="start" sx={{ mx: 1 }}>
          <Icon.Search />
        </InputAdornment>
      }
      size="small"
    />
  );
};
