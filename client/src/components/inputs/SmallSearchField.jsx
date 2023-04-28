import React, { useState, useEffect } from "react";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import * as Icon from "@mui/icons-material";

export default ({
  searchQuery = "",
  onSearchQueryChange = () => {},
  onSearchSubmit = () => {},
  icon,
  ...props
}) => {
  const [value, setValue] = useState(searchQuery);

  const changeHandler = (e) => {
    let searchQuery = e.target.value;
    setValue(searchQuery);
    onSearchQueryChange(searchQuery);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit(value.trim());
    }
  };

  const clearSearchQueryHandler = () => {
    setValue("");
    onSearchSubmit("");
  };

  useEffect(() => {
    setValue(searchQuery);
  }, [searchQuery]);

  return (
    <OutlinedInput
      {...props}
      color="content-3"
      sx={{
        my: 1,
        pl: "4px",
        pr: "0px",
        fontSize: "12px",
        borderRadius: "8px",
      }}
      onKeyDown={keyDownHandler}
      onChange={changeHandler}
      value={value}
      fullWidth
      startAdornment={
        <InputAdornment position="start" sx={{ mx: 1 }}>
          {icon || <Icon.Search sx={{ fontSize: "16px" }} />}
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="start" sx={{ mx: 1 }}>
          {value.trim() ? (
            <IconButton onClick={clearSearchQueryHandler}>
              {<Icon.Close sx={{ fontSize: "12px" }} />}
            </IconButton>
          ) : null}
        </InputAdornment>
      }
      size="small"
    />
  );
};
