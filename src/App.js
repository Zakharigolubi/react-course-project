import React, { useState } from 'react'
import Users from './components/Users'
import SearchStatus from './components/SearchStatus'
import api from './api'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((el) => el._id !== userId))
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
  return (
    <>
      <SearchStatus users={users} />
      <Users
        users={users}
        onHandleDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  )
}

export default App
