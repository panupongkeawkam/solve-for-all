import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";

import palette from "../style/palette";

import EmptyData from "../components/EmptyData";

export default (props) => {
  const [sortBy, setSortBy] = useState("popular");

  const sortOptions = [
    { value: "popular", title: "Popular" },
    { value: "latest", title: "Latest" },
    { value: "oldest", title: "Oldest" },
  ];

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex flex-col">
      {/* sort section */}
      <div className="w-full flex flex-row justify-end items-center py-2">
        <Select
          value={sortBy}
          onChange={sortChangeHandler}
          sx={{ width: "120px" }}
        >
          {sortOptions.map((sortOption, index) => (
            <MenuItem value={sortOption.value} key={index}>
              {sortOption.title}
            </MenuItem>
          ))}
        </Select>
      </div>
      {/* content section */}
      <div className="flex flex-col w-full mb-10">
        {
          <div className="w-full 2xl:h-[720px] h-[480px]">
            <EmptyData
              title={"No tags"}
              description={"There is no any tags created"}
            />
          </div>
        }
      </div>
    </div>
  );
};
