import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/Pagination'
import PropTypes from 'prop-types'
import GroupList from '../../common/GroupList'
import SearchStatus from '../../ui/SearchStatus'
import _ from 'lodash'
import UsersTable from '../../ui/UsersTable'
import { useParams } from 'react-router-dom'
import UserPage from '../userPage/UserPage'
import Spinner from '../../common/Spinner'
import Search from '../../common/Search'
import { useSelector } from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/Professions'
import {
  getCurrentUserId,
  getUsers,
  getUsersLoadingStatus
} from '../../../store/Users'

const UsersListPage = () => {
  const users = useSelector(getUsers())

  const currentUserId = useSelector(getCurrentUserId())

  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [search, setSearch] = useState('')
  const pageSize = 8

  const loading = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, search])

  const handleProfessionSelect = (item) => {
    if (search !== '') setSearch('')
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handleSearch = ({ target }) => {
    setSelectedProf(undefined)
    setSearch(target.value)
  }

  function filterUsers(data) {
    const filteredUsers = selectedProf
      ? data.filter((user) => user.profession === selectedProf._id)
      : search
      ? users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      : data
    return filteredUsers.filter((user) => user._id !== currentUserId)
  }
  const filteredUsers = filterUsers(users || [])
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
      {professions && !professionsLoading && (
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
UsersListPage.propTypes = {
  users: PropTypes.array
}
export default UsersListPage
