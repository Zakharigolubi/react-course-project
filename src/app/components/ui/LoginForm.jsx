import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/TextField'
import CheckBoxField from '../common/form/CheckBoxField'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthErrors, signIn } from '../../store/Users'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const signInError = useSelector(getAuthErrors())

  const history = useHistory()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: { message: 'Пароль должен содержать хотя бы одно число' },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/'
    dispatch(signIn({ payload: data, redirect }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Электронная почта'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Оставаться в системе
      </CheckBoxField>
      {signInError && <p className='text-danger'>{signInError}</p>}
      <button
        type='submit'
        disabled={!isValid}
        className='btn btn-primary w-100 mx-auto'
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
