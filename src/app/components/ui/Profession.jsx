import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from '../../store/Professions'

const Profession = ({ id }) => {
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const prof = useSelector(getProfessionById(id))

  if (!professionsLoading) {
    return <p>{prof.name}</p>
  } else return 'loading...'
}
Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
