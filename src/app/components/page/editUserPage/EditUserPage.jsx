import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TextField from '../../common/form/TextField'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'
import BackHistoryButton from '../../common/BackHistoryButton'
import Spinner from '../../common/Spinner'
import { useProfessions } from '../../../hooks/UseProfessions'
import { useUser } from '../../../hooks/UseUsers'
import { useQualities } from '../../../hooks/UseQualities'
import { useAuth } from '../../../hooks/UseAuth'

const getSelectOption = (obj) => {
  return { value: obj?._id, label: obj?.name }
}

const EditUserPage = () => {
  const params = useParams()
  const { userId } = params
  const { updateUserData, currentUser: user } = useAuth()
  const { professions } = useProfessions()
  const [profSelectValue, setProfSelectValue] = useState(user.profession)
  const { qualities, getQuality } = useQualities()

  const [qualSelectValue, setQualSelectValue] = useState()
  const [sex, setSex] = useState(user.sex)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const { isLoading: userLoading } = useUser()
  const { isLoading: profLoading } = useProfessions()
  const { isLoading: qualLoading } = useQualities()
  const isLoading = userLoading || profLoading || qualLoading
  const history = useHistory()

  const professionList = professions.map((prof) => {
    return getSelectOption(prof)
  })

  const qualitiesList = qualities.map((qual) => {
    return getSelectOption(qual)
  })
  useEffect(() => {
    if (qualities.length) {
      const defaultQualities = user.qualities.map((id) => {
        const quality = getQuality(id)
        return getSelectOption(quality)
      })
      setQualSelectValue(defaultQualities)
    }
  }, [qualities])
  const handleChange = (el) => {
    switch (el.name) {
      case 'profession':
        setProfSelectValue(el.value)
        break
      case 'qualities':
        setQualSelectValue(el.value)
        break
      case 'sex':
        setSex(el.value)
        break
      case 'name':
        setName(el.value)
        break
      case 'email':
        setEmail(el.value)
        break
      default:
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userUpdated = {
      ...user,
      profession: profSelectValue,
      qualities: qualSelectValue.map((qual) => {
        return qual.value
      }),
      sex,
      name,
      email
    }
    updateUserData(userUpdated)
    history.push(`/users/${userId}`)
  }
  return !isLoading && user ? (
    <div className='container mt-5'>
      <BackHistoryButton />
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Имя'
              name='name'
              value={name}
              onChange={handleChange}
            />
            <TextField
              label='Электронная почта'
              name='email'
              value={email}
              onChange={handleChange}
            />
            <SelectField
              label='Выбрать профессию'
              defaultOption='Select'
              name='profession'
              options={professionList}
              value={profSelectValue}
              onChange={handleChange}
            />
            <RadioField
              label='Выберите ваш пол'
              name='sex'
              options={[
                { name: 'Male', value: 'male' },
                { name: 'Female', value: 'female' },
                { name: 'Other', value: 'other' }
              ]}
              value={sex}
              onChange={handleChange}
            />
            {qualSelectValue && (
              <MultiSelectField
                label='Выберите ваши качества'
                name='qualities'
                options={qualitiesList}
                defaultValue={qualSelectValue}
                onChange={handleChange}
              />
            )}
            <button className='btn btn-primary w-100 mx-auto' type='submit'>
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}

export default EditUserPage
