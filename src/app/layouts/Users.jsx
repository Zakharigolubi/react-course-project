import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/EditUserPage'
import UserPage from '../components/page/userPage/UserPage'
import UsersListPage from '../components/page/usersListPage/UsersListPage'
import UsersLoader from '../components/ui/hoc/UsersLoader'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  )
}

export default Users
