/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './Pagination'
import User from './User'
import PropTypes from 'prop-types'
import GroupList from './GroupList'
import api from '../api'
import SearchStatus from './SearchStatus'
import _ from 'lodash'

const Users = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [loading, setLoading] = useState(true)

  const pageSize = 4

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setLoading(false)
      setProfessions(data)
    })
  }, [])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const filteredUsers = selectedProf
    ? props.users.filter((user) => _.isEqual(user.profession, selectedProf))
    : props.users

  const count = filteredUsers.length

  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className='d-flex'>
      {professions && (
        <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className='btn btn-success mt-2' onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}

      <div className='d-flex flex-column'>
        {loading ? (
          <div className='d-flex'>
            <h6>Loading...</h6>
            <div className='spinner-border text-primary' role='status'></div>
          </div>
        ) : (
          <SearchStatus users={filteredUsers} />
        )}

        {count > 0 && (
          <div className='table-wrapper'>
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
          </div>
        )}
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}
export default Users
