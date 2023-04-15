import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../../../store/Users'
import Spinner from '../../common/Spinner'

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])

  if (!dataStatus) return <Spinner />
  return children
}
UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UsersLoader
