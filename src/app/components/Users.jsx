import React, { useState } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './Pagination'
import User from './User'
import PropTypes from 'prop-types'

const Users = (props) => {
  const count = props.users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(props.users, currentPage, pageSize)

  return (
    <>
      {count > 0 && (
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
            {userCrop.map((user) => (
              <tr key={user._id}>
                <User
                  {...user}
                  onDelete={props.onHandleDelete}
                  onToggleBookmark={props.onToggleBookmark}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}
export default Users
