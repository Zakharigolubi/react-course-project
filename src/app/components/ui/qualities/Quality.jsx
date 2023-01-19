import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ qual }) => {
  return <span className={'badge m-1 bg-' + qual.color}>{qual.name}</span>
}
Quality.propTypes = {
  qual: PropTypes.object.isRequired
}
export default Quality
