import React from "react";
import { Button } from "@mui/material";

export default (props) => {
  return (
    <Button
      color={props.variant === "outlined" ? "content-1" : "primary"}
      {...props}
      sx={{
        my: 1,
        py: props.size === "small" ? "6px" : undefined,
        px: 2,
      }}
    >
      {props.text}
    </Button>
  );
};
