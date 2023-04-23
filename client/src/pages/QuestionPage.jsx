import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import axios from "../utils/axios.config"

import QuestionDetail from "../components/QuestionDetail";
import QuestionDetailSkeleton from "../components/skeletons/QuestionDetailSkeleton";

export default ({ }) => {
  const { questionId } = useParams()
  const navigate = useNavigate()
  const [questionLoading, setQuestionLoading] = useState(true)
  const [question, setQuestion] = useState(null)

  useEffect(() => {
    axios.get(`/api/questions/${questionId}`)
      .then(res => {
        setQuestion(res.data.question)
        setQuestionLoading(false)
      }).catch(err => {
        setQuestionLoading(false)
        navigate('/notfound')
      })
  }, [])

  return (
    <div>
      {questionLoading ?
        <QuestionDetailSkeleton /> :
        <QuestionDetail
          title={question.title}
          authorProfilePicture={question.createdBy.image}
          authorName={question.createdBy.name}
          authorUsername={question.createdBy.username}
          authorId={question.createdBy._id}
          totalParticipants={question.participant}
          totalViewed={question.viewed}
          isSolved={Boolean(question.solvedBy)}
          createdAt={question.createdAt}
          rating={question.rating}
          tags={question.tags}
          questionBody={question.body}
          questionId={question._id}
        />}
    </div>
  );
};
