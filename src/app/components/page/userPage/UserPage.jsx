import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../common/Spinner'
import UserCard from '../../ui/UserCard'
import QualitiesCard from '../../ui/QualitiesCard'
import MeetingsCard from '../../ui/MeetingsCard'
import Comments from '../../ui/Comments'
import { useUser } from '../../../hooks/UseUsers'
import { CommentsProvider } from '../../../hooks/UseComments'

const UserPage = ({ userId }) => {
  const { getUserById } = useUser()
  const user = getUserById(userId)

  return (
    <div className='container'>
      {user ? (
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className='col-md-8'>
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}
export default UserPage
