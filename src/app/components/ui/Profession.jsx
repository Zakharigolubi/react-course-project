import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from '../../store/Professions'
import Spinner from '../common/Spinner'

const Profession = ({ id }) => {
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const prof = useSelector(getProfessionById(id))

  if (!professionsLoading) {
    return <p>{prof.name}</p>
  } else return <Spinner />
}
Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
