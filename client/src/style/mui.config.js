import { createTheme } from "@mui/material/styles";
import palette from "./palette";

export default createTheme({
  typography: {
    fontFamily: "Tajawal, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: palette.primary,
      contrastText: palette["content-1"],
    },
    secondary: {
      main: palette.secondary,
    },
    correct: {
      main: palette.correct,
    },
    wrong: {
      main: palette.wrong,
    },
    "content-1": {
      main: palette["content-1"],
    },
    "content-2": {
      main: palette["content-2"],
    },
    "content-3": {
      main: palette["content-3"],
    },
    "base-1": {
      main: palette["base-1"],
    },
    "base-2": {
      main: palette["base-2"],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          var defaultStyleConfig = {
            borderRadius: "1000px",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
          };

          if (ownerState.variant === "outlined") {
            defaultStyleConfig.borderWidth = "2px";
            defaultStyleConfig[":hover"].borderWidth = "2px";
          }

          if (ownerState.size === "small") {
            defaultStyleConfig.fontSize = "12px";
          }

          return defaultStyleConfig;
        },
      },
      variants: [
        {
          props: {},
          style: {},
        },
      ],
      defaultProps: {
        variant: "contained",
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          ":hover": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
        color: "content-1",
        sx: {
          my: 1,
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          background: "transparent",
          border: `1px solid ${palette.secondary}`,
          color: palette.secondary,
          ":hover": {
            background: "transparent",
          },
          width: "36px",
          height: "36px",
          minHeight: "0px",
        },
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        fab: {
          background: "transparent",
          border: `1px solid ${palette["content-2"]}`,
          color: palette["content-2"],
          ":hover": {
            background: "transparent",
            border: `1px solid ${palette["content-1"]}`,
            color: palette["content-1"],
          },
          width: "32px",
          height: "32px",
          minHeight: "0px",
        },
      },
    },
  },
});
