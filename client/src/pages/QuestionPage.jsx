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
        <Answer
          authorProfilePicture={""}
          authorName={"อู๋ Spin9"}
          authorUsername={"au_spin9"}
          solvable={solvableChecked()}
          isSolved={question?.solvedBy?._id === "some_id"} // answer.createBy._id
          createdAt={new Date("2023-04-22T08:55:38.842+00:00")}
          rating={47}
          answerBody={[
            {
              type: "paragraph",
              msg: "ดังนั้นนี่จึงกลายเป็นช่วงเวลาที่ความเนิร์ดไอทีของตัวเองได้เผยสู่โลกโซเชียล เพราะเน้นการพูดคุยถึงเรื่องเทคโนโลยีที่กำลังเป็นที่สนใจในสังคม และพยายามจะทำให้เรื่องยากกลายเป็นเรื่องง่าย",
            },
            {
              type: "paragraph",
              msg: "ด้วยการสรุปเรื่องไอที และเทคโนโลยีตามความเข้าใจของตัวเองให้ผู้ติดตามได้รับรู้ เนื่องจากหลายคนอ่านข่าวแล้วก็ยังไม่เข้าใจ แต่ช่อง 9arm จะมาไลฟ์พูดคุยแบบง่าย ๆ ให้ฟังเอง",
            },
          ]}
          replies={[]}
        />
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
