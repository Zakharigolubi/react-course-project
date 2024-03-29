import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from '../common/Bookmark'
import QualitiesList from './qualities'
import Table from '../common/table/Table'
import { Link } from 'react-router-dom'
import Profession from './Profession'

const UsersTable = ({ users, onSort, selectedSort }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => (
        <Link to={`/users/${user._id}`} className='nav-link'>
          {user.name}
        </Link>
      )
    },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: {
      name: 'Профессия',
      component: (user) => {
        return <Profession id={user.profession} />
      }
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => <Bookmark status={user.bookmark} />
    }
  }

  return (
    <div>
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
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UsersTable
