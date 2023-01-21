import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import api from '../../../api'
import Qualities from '../../ui/qualities/Qualities'
import Spinner from '../../common/Spinner'

const UserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data)
    })
  }, [])

  const changeUrl = () => {
    history.push(`${history.location.pathname}/edit`)
  }

  return (
    <div className='flex-box'>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h3>Профессия: {user.profession.name}</h3>
          <p>
            <Qualities qualities={user.qualities} />
          </p>
          <p>Встретился, раз: {user.completedMeetings}</p>
          <h3>Рейтинг: {user.rate}</h3>

          <button className='btn btn-outline-secondary' onClick={changeUrl}>
            Изменить параметры пользователя
          </button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
UserPage.propTypes = {
  userId: PropTypes.string
}
export default UserPage
