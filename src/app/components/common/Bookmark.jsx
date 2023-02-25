import React from 'react'
import PropTypes from 'prop-types'
const BookMark = ({ status, ...rest }) => {
  return (
    <button className='btn btn-outline-dark' {...rest}>
      <i className={'bi bi-cup-hot' + (status ? '-fill' : '')}></i>
    </button>
  )
}
BookMark.propTypes = {
  status: PropTypes.bool
}

export default BookMark
