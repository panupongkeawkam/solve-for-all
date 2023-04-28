import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select, MenuItem, RadioGroup, Radio } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import palette from "../style/palette";
import axios from "../utils/axios.config";
import { sortOptions, filterOptions } from "../utils/dummy";
import { sortQuestions, filterQuestions } from "../utils/lamda";

import EmptyData from "../components/EmptyData";
import Question from "../components/Question";
import QuestionSkeleton from "../components/skeletons/QuestionSkeleton";

export default ({}) => {
  const navigate = useNavigate();
  const { tagId } = useParams();

  const [sortBy, setSortBy] = useState("popular");
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionsComponent, setQuestionsComponent] = useState([]);
  const [fetchingQuestions, setFetchingQuestions] = useState(false);

  useEffect(() => {
    setFetchingQuestions(true);
    axios
      .get(`/api/tags/${tagId}`)
      .then((res) => {
        setName(res.data.tag.name);
        setTotalQuestion(res.data.tag.totalQuestion);
        setQuestions(res.data.tag.questions);
        setSortBy("latest");
        extractingQuestions();
        setFetchingQuestions(false);
      })
      .catch((err) => navigate("/notfound"));
  }, []);

  useEffect(() => {
    extractingQuestions();
  }, [sortBy, filter]);

  const sortChangeHandler = (e) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
  };

  const filterChangeHandler = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue === filter ? "" : filterValue);
  };

  const extractingQuestions = () => {
    let filteredQuestions = filterQuestions([...questions], filter);
    let sortedQuestions = sortQuestions([...filteredQuestions], sortBy);
    setQuestionsComponent(
      sortedQuestions.map((question, index) => (
        <Question
          key={index}
          title={question.title}
          authorProfilePicture={question.createdBy.image}
          authorName={question.createdBy.name}
          authorUsername={question.createdBy.username}
          authorId={question.createdBy._id}
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
    );
  };

  const viewQuestionHandler = (questionId) => {
    navigate(`/questions/${questionId}`);
  };

  return (
    <div className="flex flex-col">
      {/* sort section */}
      <div
        className="w-full flex flex-row items-end py-2 mb-3"
        style={{ justifyContent: "space-between" }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-2">
            <LocalOfferOutlinedIcon color="content-1" fontSize="large" />
            <h1 className="ml-2" style={{ color: palette["content-1"] }}>
              {name}
            </h1>
          </div>
          <p style={{ color: palette["content-2"] }}>
            {totalQuestion} questions in total
          </p>
        </div>
        <div className="flex flex-row">
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
      </div>
      {/* content section */}
      <section className="flex flex-col w-full mb-10">
        {fetchingQuestions ? (
          Array(4)
            .fill(null)
            .map((item, index) => <QuestionSkeleton key={index} />)
        ) : questionsComponent.length > 0 ? (
          questionsComponent
        ) : (
          <div className="w-full 2xl:h-[720px] h-[480px]">
            <EmptyData
              title={"No questions"}
              description={"There is no questions of this tag"}
            />
          </div>
        )}
      </section>
    </div>
  );
};
