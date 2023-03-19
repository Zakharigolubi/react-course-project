import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <div className='w-100'>
          <input
            type={showPassword ? 'text' : type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={getInputClasses()}
          />

          {type === 'password' && (
            <i
              className={
                'password-visibility-icon bi bi-eye' +
                (showPassword ? '-slash' : '')
              }
              style={{ right: error ? '35px' : '10px' }}
              onClick={toggleShowPassword}
            ></i>
          )}

          {error && <div className='invalid-feedback'>{error}</div>}
        </div>
      </div>
    </div>
  )
}
TextField.defaultProps = {
  type: 'text'
}
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField
