import React from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities()
  if (isLoading) return 'Loading...'
  return (
    <>
      {qualities?.map((qual) => (
        <Quality key={qual} id={qual} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
