import palette from "../style/palette";

import QuestionDetail from "../components/QuestionDetail";

export default ({}) => {
  const question = {
    _id: "6443e40e80f7360bcd856d22",
    createdBy: {
      image:
        "https://yt3.googleusercontent.com/ytc/AGIKgqNZtlbC1ShH090eSfk0IXuQP4R9PQ5y8x4CeSnotA=s900-c-k-c0x00ffffff-no-rj",
      name: "นายอาร์ม",
      username: "9arm",
    },
    solvedBy: null,
    title:
      "มีใครสามารถตอบได้ไหมว่าทำไมธนาคารไทยถึงมักล่มทุกๆ เที่ยงคืนถึงประมาณตี 4 ครับ ผมสงสัย",
    body: [
      {
        type: "paragraph",
        msg: "ณ วันนี้คงปฎิเสธไม่ได้เลยว่า 9arm  เป็นหนึ่งในสตรีมเมอร์และยูทูปเบอร์ที่ได้รับการตอบรับดีจากแฟน ๆ เป็นอย่างมาก แม้ว่าตัวของเขาจะไม่ได้เล่นเกมเป็นหลักก็ตาม แต่กลับมีบทบาทในวงการเกมและก็ Esports ได้อย่างไม่น่าเชื่อ วันนี้เองเราจะพาไปทำความรู้จักกับท่านรัฐมนตรีทรวงดิจิตอลสายมีม คนนี้กันให้มากขึ้นดีกว่าครับ",
      },
      {
        type: "paragraph",
        msg: "ผมเคยถามคำถามนี้ไปในกลุ่ม Facebook หลังบ้านนายอาร์มแล้ว แต่ดูเหมือนว่าจะไม่ได้คำตอบที่ถูกต้องสักเท่าไหร่ ผมเลยคิดว่าจะเข้ามาถามในนี้ดูบ้าง",
      },
      {
        type: "header",
        msg: "This question is about python",
      },
      {
        type: "code",
        language: "python",
        code: "NUMBER = int(input())\\nprint(NUMBER)",
      },
      {
        type: "image",
        image:
          "https://www.cnet.com/a/img/resize/f67508bdfaf812f78fcd8a6020dc6f28dc55d66f/hub/2018/11/10/97f08e96-4be4-41b1-acdc-43595379dfe1/llnl-sierra-supercomputer-randy-wong.jpg?auto=webp&fit=crop&height=675&width=1200",
      },
    ],
    viewed: 4701,
    rating: 214,
    likedBy: [],
    participant: 1135,
    dislikedBy: [],
    answered: 412,
    tags: [
      {
        _id: "63ec5a42ae5dba4au5x12svy",
        name: "9arm",
      },
      {
        _id: "64ec5a42ae5dba4au5x12svy",
        name: "bank",
      },
      {
        _id: "65ec5a42ae5dba4au5x12svy",
        name: "tech",
      },
      {
        _id: "66ec5a42ae5dba4au5x12svy",
        name: "thai",
      },
    ],
    createdAt: new Date("2023-02-15T09:40:08.111Z"),
    updatedAt: new Date("2023-02-15T09:40:08.111Z"),
  };

  return (
    <div>
      <QuestionDetail
        title={question.title}
        authorProfilePicture={question.createdBy.image}
        authorName={question.createdBy.name}
        authorUsername={question.createdBy.username}
        totalParticipants={question.participant}
        totalViewed={question.viewed}
        isSolved={Boolean(question.solvedBy)}
        createdAt={question.createdAt}
        rating={question.rating}
        tags={question.tags}
        questionBody={question.body}
      />
    </div>
  );
};
