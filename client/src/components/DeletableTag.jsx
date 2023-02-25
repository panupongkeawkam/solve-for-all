import { Chip } from "@mui/material";

export default (props) => {
  return (
    <Chip
      {...props}
      className="p-2 border"
      label={props.label}
      variant="outlined"
      onDelete={() => {
        props.onDelete();
      }}
      sx={{
        fontSize: "12px",
        borderRadius: "8px",
        mr: "4px",
        mt: "4px"
      }}
      size="small"
    ></Chip>
  );
};
