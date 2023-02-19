import React from 'react'
import { useProfessions } from '../../hooks/UseProfessions'
import PropTypes from 'prop-types'

const Profession = ({ name }) => {
  const { isLoading } = useProfessions()
  // const prof = getProfession(name)

  if (!isLoading) {
    return <p>{name}</p>
  } else return 'loading...'
}
Profession.propTypes = {
  name: PropTypes.string
}

export default Profession
