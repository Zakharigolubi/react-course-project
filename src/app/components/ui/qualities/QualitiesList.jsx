import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/Qualities'
import Spinner from '../../common/Spinner'

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (qualitiesLoading) return <Spinner />
  return (
    <>
      {qualitiesList.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
