import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/TextField'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckBoxField from '../common/form/CheckBoxField'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities } from '../../store/Qualities'
import { getProfessions } from '../../store/Professions'
import { signUp } from '../../store/Users'

const RegisterForm = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    name: '',
    qualities: [],
    licence: false
  })

  const qualities = useSelector(getQualities())
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }))

  const professions = useSelector(getProfessions())
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }))

  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
      }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
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
    const newData = {
      ...data,
      qualities: data.qualities.map((qual) => qual.value)
    }
    dispatch(signUp(newData))
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
        label='Имя'
        name='name'
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label='Выбери свою профессию'
        defaultOption='Choose...'
        options={professionsList}
        name='profession'
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Выберите ваш пол'
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        name='qualities'
        label='Выберите ваши качества'
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name='licence'
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        className='btn btn-primary w-100 mx-auto'
        type='submit'
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
