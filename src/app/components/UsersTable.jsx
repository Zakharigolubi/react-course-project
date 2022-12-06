import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './Bookmark'
import QualitiesList from './QualitiesList'
import Table from './Table'

const UsersTable = ({
  users,
  onDelete,
  onToggleBookmark,
  onSort,
  selectedSort
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          userId={user._id}
          bookmark={user.bookmark}
          onToggleBookmark={onToggleBookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className='btn btn-danger'>
          delete
        </button>
      )
    }
  }

  return (
    <div className='table-wrapper'>
      <Table
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
        data={users}
      />
    </div>
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UsersTable
