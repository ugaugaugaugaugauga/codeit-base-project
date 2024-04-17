import { useState } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import api from '../../utils/api'
import { Link, useParams } from 'react-router-dom'

type Props = {
  id: number
  createdAt: string
  content: string
  answer: any
  likes: number
  dislikes: number
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years}년 전`
  }
  if (days > 0) {
    return `${days}일 전`
  }
  if (hours > 0) {
    return `${hours}시간 전`
  }
  if (minutes > 0) {
    return `${minutes}분 전`
  }
  return '방금 전'
}

export const QuestionCard = ({
  id,
  createdAt,
  content,
  answer,
  likes,
  dislikes,
}: Props) => {
  const hasAnswered = !!answer
  const date = formatDate(createdAt)
  const [like, setLike] = useState(likes)
  const [dislike, setDislike] = useState(dislikes)
  const params = useParams<{ postId: string }>()
  const postId = params.postId
  const likeClicked = async () => {
    try {
      const response = await api.post(`/questions/${id}/reaction/`, {
        type: 'like',
      })
      setLike(response.data.like)
    } catch (error) {
      console.log('some thing went wrong')
    }
  }

  const disLikeClicked = async () => {
    try {
      const response = await api.post(`/questions/${id}/reaction/`, {
        type: 'dislike',
      })
      setDislike(response.data.dislike)
    } catch (error) {
      console.log('some thing went wrong')
    }
  }

  return (
    <Link
      to={`/post/${postId}/answer`}
      className='bg-white w-full rounded-xl p-6 flex flex-col cursor-pointer hover:bg-slate-100'
    >
      <button
        className={`mr-auto border rounded-lg py-1 px-2 text-sm font-extrabold ${
          hasAnswered
            ? 'border-amber-900 text-amber-900'
            : 'border-gray-500 text-gray-500'
        }`}
      >
        {hasAnswered ? '답변 완료' : '미답변'}
      </button>
      <div className='mt-6 text-xs text-gray-400 flex'>
        <span>질문 ·</span>
        <p className='ml-1'>{date}</p>
      </div>
      <p className='font-medium text-xl'>{content}</p>
      <div className='border-t border-gray-300 mt-8' />
      <div className='mt-6 mb-3 text-gray-500'>
        <div className='flex items-center gap-x-8'>
          <button
            onClick={likeClicked}
            className={`flex items-center hover:text-blue-500 ${
              !!like && 'text-sky-500'
            }`}
          >
            <FaRegThumbsUp className='h-4 w-4' />
            <span className='ml-1'>좋아요</span>
            {!!like && <span className='ml-1'>{like}</span>}
          </button>
          <button
            onClick={disLikeClicked}
            className={`flex items-center hover:text-rose-500 ${
              !!dislike && 'text-red-500'
            }`}
          >
            <FaRegThumbsDown className='h-4 w-4 ' />
            <span className='ml-1'>싫어요</span>
            {!!dislike && <span className='ml-1'>{dislike}</span>}
          </button>
        </div>
      </div>
    </Link>
  )
}