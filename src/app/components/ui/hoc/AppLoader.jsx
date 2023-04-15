import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProfessionsList } from '../../../store/Professions'
import { loadQualitiesList } from '../../../store/Qualities'
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from '../../../store/Users'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLiggedIn = useSelector(getIsLoggedIn())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    if (isLiggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLiggedIn])

  if (usersStatusLoading) return 'Loading...'
  return children
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader
