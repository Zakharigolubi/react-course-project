import React, { useState, useEffect } from 'react'
import Users from './app/components/Users'

import api from './app/api'

const App = () => {
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
  return (
    <>
      <Users
        users={users}
        onHandleDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  )
}

export default App
