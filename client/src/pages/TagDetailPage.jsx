import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Select, MenuItem } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import palette from "../style/palette";
import store from "../store/index"
import { sortOptions } from "../utils/dummy";
import { fetchTags } from "../store/tagSlice"
import axios from "../utils/axios.config"

import EmptyData from "../components/EmptyData";
import TagDetail from "../components/TagDetail"
import Question from "../components/Question"

export default ({ }) => {
  const navigate = useNavigate()
  const { tagId } = useParams()

  const [sortBy, setSortBy] = useState("popular");
  const [name, setName] = useState("")
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    axios.get(`/api/tags/${tagId}`)
      .then(res => {
        setName(res.data.tag.name)
        setTotalQuestion(res.data.tag.totalQuestion)
        setQuestions(res.data.tag.questions)
        console.log(res.data)
      })
      .catch(err => alert(err.response.data.message))
  }, [])

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex flex-col">
      {/* sort section */}
      <div className="w-full flex flex-row items-end py-2 mb-3" style={{ justifyContent: "space-between" }}>
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-2">
            <LocalOfferOutlinedIcon color="content-1" fontSize="large" />
            <h1 className="ml-2" style={{ color: palette["content-1"] }}>{name}</h1>
          </div>
          <p style={{ color: palette["content-2"] }}>{totalQuestion} questions in total</p>
        </div>
        <div>
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
        {questions.length > 0 ? (
          questions.map((question, index) => (
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
      </section>
    </div>
  );
};
