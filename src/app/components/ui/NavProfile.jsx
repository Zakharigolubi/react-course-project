import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentUserData } from '../../store/Users'

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData())

  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }

  if (!currentUser) return 'Loading...'
  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn dropdown-toggle d-flex align-items-center'>
        <div className='me-2'>{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt=''
          height='40'
          className='img-responsive rounded-circle'
        />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link to={`/users/${currentUser._id}`} className='dropdown-item'>
          Profile
        </Link>
        <Link to='/logOut' className='dropdown-item'>
          Log Out
        </Link>
        <h1>Some text</h1>
      </div>
    </div>
  )
}

export default NavProfile
