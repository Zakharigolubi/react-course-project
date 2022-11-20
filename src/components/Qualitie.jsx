import React from 'react'

const Qualitie = (props) => {
  return (
    <span key={props._id} className={'badge m-2 bg-' + props.color}>
      {props.name}
    </span>
  )
}

export default Qualitie
