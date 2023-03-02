import React, { useState } from "react";
import { OutlinedInput, InputAdornment } from "@mui/material";
import * as Icon from "@mui/icons-material";

export default ({ onSearchSubmit = () => {}, ...props }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchQueryChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit(searchQuery.trim());
      setSearchQuery("");
    }
  };

  return (
    <OutlinedInput
      {...props}
      color="content-3"
      value={searchQuery}
      onChange={searchQueryChangeHandler}
      onKeyDown={keyDownHandler}
      sx={{
        my: 1,
        px: 1,
        py: "1px",
        fontSize: "16px",
        borderRadius: 100,
        width: 320,
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
