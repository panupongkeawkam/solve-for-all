import React from "react";
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Tooltip,
} from "@mui/material";

export default ({ actions, onActionChange }) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      icon={<SpeedDialIcon />}
      sx={{
        background: "transparent",
      }}
      direction="right"
    >
      {actions.map((action, index) => (
        <SpeedDialAction
          key={index}
          icon={action.icon}
          tooltipTitle={`${action.name[0].toUpperCase()}${action.name.slice(
            1
          )}`}
          onClick={() => onActionChange(action.name)}
        />
      ))}
    </SpeedDial>
  );
};
