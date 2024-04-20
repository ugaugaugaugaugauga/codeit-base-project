import styled from "styled-components";
import thumbsUpImg from "../../images/post-id-images/thumbs-up.svg";
import thumbsDownImg from "../../images/post-id-images/thumbs-down.svg";

import { calculateTimeDiff } from "./utils";
import { createDislike, createLike } from "../../api/answer/answer";
import { useState } from "react";
import Modifying from "./Modifying";

const QuestionCardWrapper = styled.div`
  padding: 32px;
  margin-top: 20px;
  width: 100%;
  /* width: 684px; */
  border-radius: 16px;
  background: var(--Grayscale-10, #fff);

  /* 1pt */
  box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
`;

const QuestionCardResult = styled.span`
  padding: 4px 12px;
  border: 1px solid black;
  border-radius: 8px;
  border: 1px solid var(--Brown-40, #542f1a);
  background: var(--Grayscale-10, #fff);

  color: var(--Brown-40, #542f1a);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`;

const QuestionCardQuestion = styled.div`
  margin: 32px 0px;
`;

const QuestionCardTerm = styled.div`
  display: flex;
  color: var(--Grayscale-40, #818181);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`;

const QuestionCardQuestionTitle = styled.div`
  color: var(--Grayscale-60, #000);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Actor;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 133.333% */
`;

const QuestionCardAnswer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;

  & img {
    width: 48px;
    flex-shrink: 0;
    border-radius: 100px;
  }
`;

const QuestionCardAnswerContent = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const QuestionCardAnswerProfile = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  & div {
    margin-right: 8px;
  }
`;

const QuestionCardBottom = styled.div`
  margin-top: 32px;
  border-top: 1px solid #cfcfcf;
`;

const QuestionCardBottomStatus = styled.div`
  display: flex;
  margin-top: 24px;

  & img {
    margin-right: 6px;
  }
`;

const ThumbsUp = styled.div`
  margin-right: 32px;
  color: var(--Blue-50, #1877f2);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`;

const ThumbsDown = styled.div`
  color: var(--Grayscale-40, #818181);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`;

function QuestionCard({ id, question, profile, handleModifyClick }) {
  const isModifying = true;
  const [like, setLike] = useState(question.like);
  const [dislike, setDislike] = useState(question.dislike);

  const handleLikeClick = async () => {
    const res = await createLike(question.id);
    setLike(res.data.like);
  };

  const handleDislikeClick = async () => {
    const res = await createDislike(question.id);
    setDislike(res.data.dislike);
  };

  const answer = question.answer;
  const isAnswered = !!answer;
  console.log(answer);

  return (
    <QuestionCardWrapper>
      <QuestionCardResult>
        {question.answer ? "답변완료" : "미답변"}
      </QuestionCardResult>

      <QuestionCardQuestion>
        <QuestionCardTerm>
          <div>질문 ·</div>
          <div>{calculateTimeDiff(question.createdAt)}</div>
        </QuestionCardTerm>
        <QuestionCardQuestionTitle>
          {question.content}
        </QuestionCardQuestionTitle>
      </QuestionCardQuestion>
      {/* 답변 작성할 수 있는 곳 */}
      <QuestionCardAnswer>
        <img src={profile.imageSource} alt="profile"></img>

        <QuestionCardAnswerContent>
          <QuestionCardAnswerProfile>
            <div>{profile.name}</div>
          </QuestionCardAnswerProfile>
          {!isAnswered ? (
            <Modifying id={id} isModifying={isModifying} />
          ) : (
            <div>{JSON.stringify(answer.content)}</div>
          )}
        </QuestionCardAnswerContent>
      </QuestionCardAnswer>
      <QuestionCardBottom>
        <QuestionCardBottomStatus>
          <img
            src={thumbsUpImg}
            alt="thumbs-up"
            onClick={handleLikeClick}
          ></img>
          <ThumbsUp onClick={handleLikeClick}>좋아요 {like}</ThumbsUp>
          <img
            src={thumbsDownImg}
            alt="thumbs-down"
            onClick={handleDislikeClick}
          ></img>
          <ThumbsDown onClick={handleDislikeClick}>싫어요 {dislike}</ThumbsDown>
        </QuestionCardBottomStatus>
      </QuestionCardBottom>
    </QuestionCardWrapper>
  );
}

export default QuestionCard;

// import styled from "styled-components";
// import thumbsUpImg from "../../images/post-id-images/thumbs-up.svg";
// import thumbsDownImg from "../../images/post-id-images/thumbs-down.svg";
// // import ModifyButton from "./ModifyButton";

// import { calculateTimeDiff } from "./utils";
// import { createDislike, createLike } from "../../api/answer/answer";
// import { useState } from "react";
// import Modifying from "./Modifying";

// const QuestionCardWrapper = styled.div`
//   padding: 32px;
//   margin-top: 20px;
//   width: 100%;
//   /* width: 684px; */
//   border-radius: 16px;
//   background: var(--Grayscale-10, #fff);

//   /* 1pt */
//   box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
// `;
// const QuestionResult = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const QuestionCardResult = styled.span`
//   padding: 4px 12px;
//   border: 1px solid black;
//   border-radius: 8px;
//   border: 1px solid var(--Brown-40, #542f1a);
//   background: var(--Grayscale-10, #fff);

//   color: var(--Brown-40, #542f1a);
//   font-feature-settings: "clig" off, "liga" off;
//   font-family: Pretendard;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 18px; /* 128.571% */
// `;

// const QuestionCardQuestion = styled.div`
//   margin: 32px 0px;
// `;

// const QuestionCardTerm = styled.div`
//   display: flex;
//   color: var(--Grayscale-40, #818181);
//   font-feature-settings: "clig" off, "liga" off;
//   font-family: Pretendard;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 18px; /* 128.571% */
// `;

// // const ModifyButtonContainer = styled.div`
// //   width: 70px;
// // `;

// const QuestionCardQuestionTitle = styled.div`
//   color: var(--Grayscale-60, #000);
//   font-feature-settings: "clig" off, "liga" off;
//   font-family: Actor;
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px; /* 133.333% */
// `;

// const QuestionCardAnswer = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 12px;
//   align-self: stretch;

//   & img {
//     width: 48px;
//     flex-shrink: 0;
//     border-radius: 100px;
//   }
// `;

// const QuestionCardAnswerContent = styled.div`
//   margin-left: 12px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 4px;
// `;

// const QuestionCardAnswerProfile = styled.div`
//   display: flex;
//   gap: 8px;
//   align-items: center;
//   & div {
//     margin-right: 8px;
//   }
// `;

// const QuestionCardBottom = styled.div`
//   margin-top: 32px;
//   border-top: 1px solid #cfcfcf;
// `;

// const QuestionCardBottomStatus = styled.div`
//   display: flex;
//   margin-top: 24px;

//   & img {
//     margin-right: 6px;
//   }
// `;

// const ThumbsUp = styled.div`
//   margin-right: 32px;
//   color: var(--Blue-50, #1877f2);
//   font-feature-settings: "clig" off, "liga" off;
//   font-family: Pretendard;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 18px; /* 128.571% */
// `;

// const ThumbsDown = styled.div`
//   color: var(--Grayscale-40, #818181);
//   font-feature-settings: "clig" off, "liga" off;
//   font-family: Pretendard;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 18px; /* 128.571% */
// `;

// function QuestionCard({ id, question, profile }) {
//   const isModifying = true;
//   // const [isEditing, setIsEditing] = useState(true);
//   const [like, setLike] = useState(question.like);
//   const [dislike, setDislike] = useState(question.dislike);

//   const handleLikeClick = async () => {
//     const res = await createLike(question.id);
//     setLike(res.data.like);
//   };

//   const handleDislikeClick = async () => {
//     const res = await createDislike(question.id);
//     setDislike(res.data.dislike);
//   };

//   // const answer = question.answer;
//   // const isAnswered = !!answer;

//   return (
//     <QuestionCardWrapper>
//       <QuestionResult>
//         <QuestionCardResult>
//           {question.answer ? "답변완료" : "미답변"}
//         </QuestionCardResult>
//         {/* <ModifyButtonContainer>
//           <ModifyButton setIsEditing={setIsEditing} />
//         </ModifyButtonContainer> */}
//       </QuestionResult>
//       <QuestionCardQuestion>
//         <QuestionCardTerm>
//           <div>질문 ·</div>
//           <div>{calculateTimeDiff(question.createdAt)}</div>
//         </QuestionCardTerm>
//         <QuestionCardQuestionTitle>
//           {question.content}
//         </QuestionCardQuestionTitle>
//       </QuestionCardQuestion>

//       {/* 답변 작성할 수 있는 곳 */}
//       <QuestionCardAnswer>
//         <img src={profile.imageSource} alt="profile"></img>

//         <QuestionCardAnswerContent>
//           <QuestionCardAnswerProfile>
//             <div>{profile.name}</div>
//           </QuestionCardAnswerProfile>
//           <Modifying id={id} isModifying={isModifying} />
//         </QuestionCardAnswerContent>
//       </QuestionCardAnswer>
//       <QuestionCardBottom>
//         <QuestionCardBottomStatus>
//           <img
//             src={thumbsUpImg}
//             alt="thumbs-up"
//             onClick={handleLikeClick}
//           ></img>
//           <ThumbsUp onClick={handleLikeClick}>좋아요 {like}</ThumbsUp>
//           <img
//             src={thumbsDownImg}
//             alt="thumbs-down"
//             onClick={handleDislikeClick}
//           ></img>
//           <ThumbsDown onClick={handleDislikeClick}>싫어요 {dislike}</ThumbsDown>
//         </QuestionCardBottomStatus>
//       </QuestionCardBottom>
//     </QuestionCardWrapper>
//   );
// }

// export default QuestionCard;