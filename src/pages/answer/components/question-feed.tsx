import { BsChatText } from 'react-icons/bs'
import { IQuestion, ISubject } from '../../../model/api'
import { NoQuestions } from '../../../components/no-questions'
import { QuestionCard } from './question-card'
import { Button } from '../../../components/ui/button'
import styled from 'styled-components'

const StyledSection = styled.section`
  width: 100%; /* w-full */
  margin-left: auto;
  margin-right: auto;
  padding-top: 3rem; /* pt-12 */

  @media (min-width: 1024px) {
    width: 888px; /* lg:w-[888px] */
  }

  @media (min-width: 1280px) {
    padding-left: 0; /* xl:px-0 */
    padding-right: 0; /* xl:px-0 */
  }

  @media (max-width: 1280px) {
    padding-left: 0.625rem; /* px-5 */
    padding-right: 0.625rem; /* px-5 */
  }
`

const StyledDiv = styled.div`
  background-color: rgba(255, 193, 7, 0.1); /* bg-amber-800/10 */
  border-radius: 0.75rem; /* rounded-xl */
  display: flex;
  flex-direction: column;
  padding-top: 0.75rem; /* py-3 */
  border: 1px solid #c99700; /* border */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
`

const StyledH2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem; /* text-2xl */
  font-weight: 500; /* font-medium */
  color: #ffc107; /* text-amber-800 */
`

const StyledSpan = styled.span`
  margin-left: 0.75rem; /* ml-3 */
`

const StyledUl = styled.ul`
  margin-top: 1.25rem; /* mt-5 */
  width: 100%; /* w-full */
  padding: 1.25rem; /* p-5 */
  list-style-type: none;
  & > * + * {
    margin-top: 1.25rem; /* space-y-5 */
  }
`
const StyledDiv1 = styled.div`
  padding-top: 0.75rem; /* py-3이 0.75rem에 해당함 */
  display: flex; /* flexbox를 사용하여 요소들을 가로로 정렬 */
  justify-content: flex-end; /* 가로 방향으로 끝으로 정렬 */
`

type Props = {
  deleteModalOpen: () => void
  questionCount: number
  questions: IQuestion[]
  subject: ISubject
  updateQuestions: () => void
}

export const QuestionFeed = ({
  deleteModalOpen,
  questionCount,
  questions,
  subject,
  updateQuestions,
}: Props) => {
  const hasQuestion = !!questionCount

  return (
    <StyledSection>
      <StyledDiv1>
        <Button onClick={deleteModalOpen} rounded='full' width={120}>
          삭제하기
        </Button>
      </StyledDiv1>
      <StyledDiv>
        {!hasQuestion ? (
          <NoQuestions />
        ) : (
          <>
            <StyledH2>
              <BsChatText /> <StyledSpan>{questionCount}</StyledSpan>개의 질문이
              있습니다.
            </StyledH2>
            <StyledUl>
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  createdAt={question.createdAt}
                  content={question.content}
                  answer={question.answer}
                  likes={question.like}
                  dislikes={question.dislike}
                  name={subject.name}
                  img={subject.imageSource}
                  updateQuestions={updateQuestions}
                />
              ))}
            </StyledUl>
          </>
        )}
      </StyledDiv>
    </StyledSection>
  )
}
