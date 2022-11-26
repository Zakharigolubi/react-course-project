/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = (props) => {
  return (
    <button
      className='btn btn-outline-dark'
      onClick={() => props.onToggleBookmark(props.userId)}
    >
      {props.bookmark ? (
        <i className='bi bi-cup-hot-fill'></i>
      ) : (
        <i className='bi bi-cup-hot'></i>
      )}
    </button>
  )
}
Bookmark.propTypes = {
  userId: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}
export default Bookmark
