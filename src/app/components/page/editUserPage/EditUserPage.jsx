import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import TextField from '../../common/form/TextField'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'
import Spinner from '../../common/Spinner'

const EditUserPage = () => {
  const [user, setUser] = useState()
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState([])
  const params = useParams()
  const { userId } = params
  const history = useHistory()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const getProfessionById = (id) => {
    for (const profession of professions) {
      if (profession.value === id) {
        return { _id: profession.value, name: profession.label }
      }
    }
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const element of elements) {
      for (const quality in qualities) {
        if (element.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  const handleChange = (target) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userUpdated = {
      ...user,
      profession: getProfessionById(user.profession),
      qualities: getQualities(user.qualities)
    }
    api.users.update(userId, userUpdated)
    history.push(`/users/${userId}`)
  }

  const defaultQualities = () => {
    return user.qualities.map((item) => ({
      label: item.name,
      value: item._id
    }))
  }

  return user ? (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Имя'
              name='name'
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              label='Электронная почта'
              name='email'
              value={user.email}
              onChange={handleChange}
            />
            <SelectField
              label='Выбрать профессию'
              defaultOption='Select'
              name='profession'
              options={professions}
              value={user.profession._id}
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
              value={user.sex}
              onChange={handleChange}
            />
            <MultiSelectField
              label='Выберите ваши качества'
              name='qualities'
              options={qualities}
              defaultValue={defaultQualities()}
              onChange={handleChange}
            />
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
