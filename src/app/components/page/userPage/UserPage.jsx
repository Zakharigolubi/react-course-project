import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import api from '../../../../api'
import Qualities from '../../ui/qualities/Qualities'
import Spinner from '../../common/Spinner'

const UserPage = ({ id }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(id).then((user) => {
      setUser(user)
    })
  }, [])
  const history = useHistory()
  const allUsers = () => {
    history.push('/users')
  }
  console.log(user)
  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h3>Профессия: {user.profession.name}</h3>
          <p>
            <Qualities qualities={user.qualities} />
          </p>
          <p>Встретился, раз: {user.completedMeetings}</p>
          <h3>Рейтинг: {user.rate}</h3>

          <button
            onClick={() => {
              allUsers()
            }}
          >
            Все пользователи
          </button>
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}
UserPage.propTypes = {
  id: PropTypes.string
}
export default UserPage
