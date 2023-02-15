import { Chip } from "@mui/material";

export default ({ title, onClick }) => {
  return (
    <Chip
      className="p-2 border"
      label={title}
      variant="outlined"
      onClick={onClick}
      sx={{
        fontSize: "12px",
        borderRadius: "8px",
        mr: "4px"
      }}
      size="small"
    ></Chip>
  );
};
