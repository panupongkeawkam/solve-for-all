import React, { useState, useEffect } from "react";
import { OutlinedInput, InputAdornment } from "@mui/material";
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
      setValue("");
    }
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
        px: "4px",
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
      size="small"
    />
  );
};
