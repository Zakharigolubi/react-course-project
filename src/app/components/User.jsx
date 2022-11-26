import React from 'react'
import Qualitie from './Qualitie'
import Bookmark from './Bookmark'
import PropTypes from 'prop-types'

const User = (props) => {
  return (
    <>
      <td>{props.name}</td>
      <td>
        <Qualitie user={props} />
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
User.propTypes = {
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}
export default User
