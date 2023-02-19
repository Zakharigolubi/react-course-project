import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'

const QualityContext = React.createContext()

export const useQualities = () => {
  return useContext(QualityContext)
}

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  useEffect(() => {
    getQualities()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const getQualities = async () => {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function getQuality(id) {
    return qualities.find((p) => p._id === id)
  }

  return (
    <QualityContext.Provider value={{ isLoading, getQuality }}>
      {children}
    </QualityContext.Provider>
  )
}

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
