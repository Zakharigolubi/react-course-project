import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ value, onChange }) => {
  return (
    <div className='input-group rounded'>
      <input
        type='search'
        className='form-control rounded'
        placeholder='Search...'
        aria-label='Search'
        aria-describedby='search-addon'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default Search
