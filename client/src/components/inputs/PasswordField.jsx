import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import * as Icon from "@mui/icons-material";

export default ({ onPasswordChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(props.value);

  const changeHandler = (e) => {
    let password = e.target.value;
    setValue(password);
    onPasswordChange(password);
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
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <Icon.VisibilityOffOutlined />
              ) : (
                <Icon.VisibilityOutlined />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
