import React from 'react'
import User from './User'

const Users = (props) => {
  return (
    <>
      {props.users.length > 0 && (
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
            {props.users.map((user) => (
              <tr key={user._id}>
                <User
                  // key={user._id}
                  {...user}
                  onDelete={props.onHandleDelete}
                  onToggleBookmark={props.onToggleBookmark}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
export default Users
