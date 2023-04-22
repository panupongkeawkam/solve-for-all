import React, { useState } from "react";
import { Select, MenuItem, RadioGroup, Radio } from "@mui/material";

import palette from "../style/palette";

import EmptyData from "../components/EmptyData";
import Question from "../components/Question";

export default (props) => {
  const [sortBy, setSortBy] = useState("popular");
  const [filter, setFilter] = useState("");

  const questions = [{}, {}]

  const sortOptions = [
    { value: "popular", title: "Popular" },
    { value: "latest", title: "Latest" },
    { value: "oldest", title: "Oldest" },
  ];

  const filterOptions = [
    { value: "unsolved", title: "Unsolved" },
    { value: "solved", title: "Solved" },
  ];

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  const filterChangeHandler = (e) => {
    let filterValue = e.target.value;
    setFilter(filterValue === filter ? "" : filterValue);
  };

  const viewQuestionHandler = (questionId) => {
    // do something
  }

  return (
    <div className="flex flex-col">
      {/* filter and sort section */}
      <div className="w-full flex flex-row justify-end items-center py-2">
        <RadioGroup
          row
          value={filter}
          name="radio-buttons-group"
          sx={{ color: palette["content-1"], mr: 4 }}
        >
          {filterOptions.map((filterOption, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center mr-4"
            >
              <Radio
                color="content-1"
                value={filterOption.value}
                checked={filter === filterOption.value}
                onClick={filterChangeHandler}
              />
              <div style={{ color: palette["content-1"] }}>
                {filterOption.title}
              </div>
            </div>
          ))}
        </RadioGroup>
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
          questions.length > 0 ?
            questions.map((question, index) => <Question
              key={index}
              title={"มีใครสามารถตอบได้ไหมว่าทำไมธนาคารไทยถึงมักล่มทุกๆ เที่ยงคืนถึงประมาณตี 4 ครับ ผมสงสัย"}
              authorProfilePicture={"https://yt3.googleusercontent.com/ytc/AGIKgqNZtlbC1ShH090eSfk0IXuQP4R9PQ5y8x4CeSnotA=s900-c-k-c0x00ffffff-no-rj"}
              authorName={"นายอาร์ม"}
              authorUsername={"9arm"}
              totalAnswers={412}
              totalParticipants={1135}
              totalViewed={4701}
              isSolved={true}
              createdAt={new Date("2023-02-15T09:40:08.111Z")}
              rating={214}
              tags={[{
                _id: "63ec5a42ae5dba4au5x12svy",
                name: "9arm"
              }, {
                _id: "64ec5a42ae5dba4au5x12svy",
                name: "bank"
              }, {
                _id: "65ec5a42ae5dba4au5x12svy",
                name: "tech"
              }, {
                _id: "66ec5a42ae5dba4au5x12svy",
                name: "thai"
              }]}
              onView={() => viewQuestionHandler("63ec5a42ae5dba49b343gd4d")}
            />)
            : <div className="w-full 2xl:h-[720px] h-[480px]">
              <EmptyData
                title={"No questions"}
                description={"There is no questions to recommend for you"}
              />
            </div>
        }
      </div>
    </div>
  );
};
