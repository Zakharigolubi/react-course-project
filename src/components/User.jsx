import React from 'react'
import Qualitie from './Qualitie'
import Bookmark from './Bookmark'

const User = (props) => {
  return (
    <>
      <td>{props.name}</td>
      <td>
        {props.qualities.map((quality) => (
          <Qualitie key={quality._id} {...quality} />
        ))}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}/5</td>
      <td>
        <Bookmark
          userId={props._id}
          bookmark={props.bookmark}
          onToggleBookmark={props.onToggleBookmark}
        />
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => props.onDelete(props._id)}
        >
          delete
        </button>
      </td>
    </>
  )
}

export default User
