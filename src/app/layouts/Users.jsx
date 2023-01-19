import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage/UserPage'
import UsersListPage from '../components/page/usersListPage/UsersListPage'

const Users = () => {
  const params = useParams()
  const { userId } = params
  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>
}

export default Users
