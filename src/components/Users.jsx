import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userID) => {
    setUsers((prevState) => prevState.filter((el) => el._id !== userID))
  }
  const renderPhrase = (number) => {
    let phrase = ''
    number >= 2 && number <= 4
      ? (phrase = users.length + ' человека тусанут с тобой сегодня')
      : (phrase = users.length + ' человек тусанет с тобой сегодня')
    return number > 0 ? (
      <span className='badge bg-primary'>{phrase}</span>
    ) : (
      <span className='badge bg-danger'>{'Никто с тобой не тусанет'}</span>
    )
  }

  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      {users.length > 0 && (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился, раз</th>
              <th scope='col'>Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={'badge m-2 bg-' + quality.color}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    className='badge bg-danger'
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
export default Users
