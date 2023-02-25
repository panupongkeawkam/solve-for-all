import React, { useState, useEffect } from "react";
import { OutlinedInput, InputAdornment } from "@mui/material";
import * as Icon from "@mui/icons-material";

export default ({ searchQuery, onSearchQueryChange, ...props }) => {
  const [value, setValue] = useState(searchQuery);

  const changeHandler = (e) => {
    let searchQuery = e.target.value;
    setValue(searchQuery);
    onSearchQueryChange(searchQuery);
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
      onChange={changeHandler}
      value={value}
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
