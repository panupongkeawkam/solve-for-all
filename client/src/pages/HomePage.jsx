import React, { useState, useEffect } from "react";
import { Select, MenuItem, RadioGroup, Radio } from "@mui/material";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import palette from "../style/palette";
import store from "../store/index"
import { fetchQuestions } from "../store/questionSlice";

import { sortOptions, filterOptions } from "../utils/dummy";

import EmptyData from "../components/EmptyData";
import Question from "../components/Question";

export default (props) => {
  const [sortBy, setSortBy] = useState("popular");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const questionsList = useSelector(state => state.question.questionsList)

  useEffect(() => {
    store.dispatch(fetchQuestions())
  }, [])

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  const filterChangeHandler = (e) => {
    let filterValue = e.target.value;
    setFilter(filterValue === filter ? "" : filterValue);
  };

  const viewQuestionHandler = (questionId) => {
    navigate(`/questions/${questionId}`);
    // do something
  };

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
        {questionsList.length > 0 ? (
          questionsList.map((question, index) => (
            <Question
              key={index}
              title={question.title}
              authorProfilePicture={question.createdBy.image}
              authorName={question.createdBy.name}
              authorUsername={question.createdBy.username}
              totalAnswers={question.answered}
              totalParticipants={question.participant}
              totalViewed={question.viewed}
              isSolved={Boolean(question.solvedBy)}
              createdAt={new Date(question.createdAt)}
              rating={question.rating}
              tags={question.tags}
              onView={() => viewQuestionHandler(question._id)}
            />
          ))
        ) : (
          <div className="w-full 2xl:h-[720px] h-[480px]">
            <EmptyData
              title={"No questions"}
              description={"There is no questions to recommend for you"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
