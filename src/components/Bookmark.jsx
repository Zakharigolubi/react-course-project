import React from 'react'

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

export default Bookmark
