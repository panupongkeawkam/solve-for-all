import { Input } from "@mui/material";

export default ({
  message,
  placeholder,
  maxLength,
  fontSize = "16px",
  onTextChange,
  bold,
  fontFamily,
}) => {
  return (
    <Input
      sx={{
        fontSize: fontSize,
        fontWeight: bold ? "600" : "400",
        fontFamily: fontFamily,
      }}
      multiline
      fullWidth
      placeholder={placeholder}
      value={message}
      inputProps={{
        maxlength: maxLength,
      }}
      onChange={(e) => onTextChange(e.target.value)}
    />
  );
};
