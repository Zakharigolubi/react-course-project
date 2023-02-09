import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Spinner from '../../common/Spinner'
import UserCard from '../../ui/UserCard'
import QualitiesCard from '../../ui/QualitiesCard'
import MeetingsCard from '../../ui/MeetingsCard'
import Comments from '../../ui/Comments'

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data)
    })
  }, [])

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
            <Comments />
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
