import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from '../../store/Comments'
import { useParams } from 'react-router-dom'
import { getCurrentUserId } from '../../store/Users'
import Spinner from '../common/Spinner'

const Comments = () => {
  const { userId } = useParams()
  const currentUserId = useSelector(getCurrentUserId())
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())

  const handleSubmit = (data) => {
    dispatch(createComment(data, userId, currentUserId))
  }
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id))
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])
  return (
    <>
      <div className='card mb-2'>
        <div className='card-body '>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className='card mb-3'>
          <div className='card-body '>
            <h2>Комментарии</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
