import React from 'react'
import Quality from './Quality'
import PropTypes from 'prop-types'

const Qualities = ({ qualities }) => {
  return (
    <>
      {qualities.map((qual) => (
        <Quality key={qual._id} qual={qual} />
      ))}
    </>
  )
}
Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default Qualities
