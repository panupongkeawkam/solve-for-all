import React, { useState } from "react";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import * as Icon from "@mui/icons-material";

export default ({ onSearchSubmit = () => {}, ...props }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchQueryChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const clearSearchQueryHandler = () => {
    setSearchQuery("");
    onSearchSubmit("");
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
        pl: 1,
        pr: 0,
        py: "1px",
        fontSize: "16px",
        borderRadius: 100,
        width: 320,
      }}
      label={null}
      fullWidth
      startAdornment={
        <InputAdornment position="start" sx={{ mx: 1 }}>
          <Icon.Search className="cursor-pointer" onClick={() => onSearchSubmit(searchQuery)} />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="start" sx={{ mx: 1 }}>
          {searchQuery.trim() ? (
            <IconButton onClick={clearSearchQueryHandler}>
              <Icon.Close fontSize="small" />
            </IconButton>
          ) : null}
        </InputAdornment>
      }
      size="small"
    />
  );
};
