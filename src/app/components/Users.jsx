/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './Pagination'
import PropTypes from 'prop-types'
import GroupList from './GroupList'
import api from '../api'
import SearchStatus from './SearchStatus'
import _ from 'lodash'
import UsersTable from './UsersTable'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  const pageSize = 8

  const [users, setUsers] = useState([])

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers((prevState) =>
      prevState.filter((user) => {
        return user._id !== userId
      })
    )
  }

  const handleToggleBookmark = (userId) => {
    const favUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark
      }
      return user
    })
    setUsers(favUsers)
  }

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

  const handleSort = (item) => {
    setSortBy(item)
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => _.isEqual(user.profession, selectedProf))
    : users

  const count = filteredUsers.length

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const userCrop = paginate(sortedUsers, currentPage, pageSize)

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
          <UsersTable
            users={userCrop}
            onDelete={handleDelete}
            onToggleBookmark={handleToggleBookmark}
            onSort={handleSort}
            selectedSort={sortBy}
          />
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
  users: PropTypes.array
}
export default Users
