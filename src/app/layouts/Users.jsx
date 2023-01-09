/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import GroupList from '../components/GroupList'
import api from '../api'
import SearchStatus from '../components/SearchStatus'
import _ from 'lodash'
import UsersTable from '../components/UsersTable'
import { useParams } from 'react-router-dom'
import UserPage from '../components/UserPage'
import Spinner from '../components/Spinner'
import Search from '../components/Search'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [search, setSearch] = useState('')

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

  const handleSearch = (event) => {
    event.preventDefault()
    setSelectedProf()
    setSearch(event.target.value)
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => _.isEqual(user.profession, selectedProf))
    : search
    ? users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : users

  const count = filteredUsers.length

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  const params = useParams()
  const { userId } = params
  if (userId) {
    return <UserPage id={userId} />
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
          <Spinner />
        ) : (
          <>
            <SearchStatus users={filteredUsers} />{' '}
            <Search value={search} onChange={handleSearch} />
          </>
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
