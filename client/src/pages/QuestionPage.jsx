import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Select, MenuItem } from "@mui/material";

import axios from "../utils/axios.config";
import palette from "../style/palette";
import { sortOptions } from "../utils/dummy";

import QuestionDetail from "../components/QuestionDetail";
import QuestionDetailSkeleton from "../components/skeletons/QuestionDetailSkeleton";
import Button from "../components/buttons/Button";
import Answer from "../components/Answer";
import AnswerFormModal from "../components/modals/AnswerFormModal";
import EmptyData from "../components/EmptyData";

export default ({}) => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [showAnswerFormModal, setShowAddQuestionModal] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/questions/${questionId}`)
      .then((res) => {
        setQuestion(res.data.question);
        setQuestionLoading(false);
      })
      .catch((err) => {
        setQuestionLoading(false);
        navigate("/notfound");
      });
  }, []);

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  const toggleAnswerFormModalHandler = () => {
    setShowAddQuestionModal(!showAnswerFormModal);
  };

  const solvableChecked = () => {
    return question?.solvedBy === null && question?.createdBy._id === user?._id;
  };

  const answerableChecked = () => {
    return user !== null && question?.createdBy._id !== user?._id;
  };

  return (
    <div>
      <section className="mb-8">
        {questionLoading ? (
          <QuestionDetailSkeleton />
        ) : (
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
            likedBy={question.likedBy}
            dislikedBy={question.dislikedBy}
          />
        )}
      </section>
      <div
        className="flex flex-row mb-5"
        style={{ justifyContent: "space-between" }}
      >
        <div className="flex flex-row items-center">
          <p className="mr-2" style={{ color: palette["content-2"] }}>
            Answer
          </p>
          <p style={{ color: palette["content-1"] }}>0</p>
          <Select
            value={sortBy}
            onChange={sortChangeHandler}
            sx={{ width: "120px", ml: 3 }}
          >
            {sortOptions.map((sortOption, index) => (
              <MenuItem value={sortOption.value} key={index}>
                {sortOption.title}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          {answerableChecked() ? (
            <Button
              text="Leave your answer"
              size="small"
              variant="outlined"
              color="primary"
              onClick={toggleAnswerFormModalHandler}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <section>
        {question?.answers.length > 0 ? (
          question.answers.map((answer, index) => (
            <Answer
              authorProfilePicture={""}
              authorName={"อู๋ Spin9"}
              authorUsername={""}
              solvable={solvableChecked()}
              isSolved={answer.isSolved}
              createdAt={new Date(answer.createdAt)}
              rating={answer.rating}
              answerBody={answer.body}
              replies={answer.replies}
              likedBy={answer.likedBy}
              dislikedBy={answer.dislikedBy}
              answerId={answer._id}
            />
          ))
        ) : (
          <div className="w-full h-[160px]">
            <EmptyData
              title="No answers"
              description="There is no one answered to this question"
              minimized
            />
          </div>
        )}
      </section>
      <AnswerFormModal
        active={showAnswerFormModal}
        submitText="Publish"
        doingMessage="Answering question..."
        targetQuestion={question}
        onClose={toggleAnswerFormModalHandler}
      />
    </div>
  );
};
