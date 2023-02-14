import React from "react";
import { TextField, OutlinedInput } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default ({ date, label = "Label", onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={date}
        openTo="year"
        onChange={onDateChange}
        views={["year", "month", "day"]}
        renderInput={(params) => (
          <TextField
            {...params}
            className="inputRounded"
            sx={{ borderRadius: "8px", my: 1, fontSize: "16px" }}
            fullWidth
            color="content-3"
            label={label}
            size="small"
          />
        )}
      />
    </LocalizationProvider>
  );
};
