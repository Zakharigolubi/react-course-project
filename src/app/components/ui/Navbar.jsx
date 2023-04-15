import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIsLoggedIn } from '../../store/Users'
import NavProfile from './NavProfile'

const NavBar = () => {
  const isLogedIn = useSelector(getIsLoggedIn())

  return (
    <nav className='navbar bg-light mb-3'>
      <div className='container-fluid'>
        <ul className='nav'>
          <li className='nav-item'>
            <Link className='nav-link ' aria-current='page' to='/'>
              Main
            </Link>
          </li>
          {isLogedIn && (
            <li className='nav-item'>
              <Link className='nav-link ' aria-current='page' to='/users'>
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className='d-flex'>
          {isLogedIn ? (
            <NavProfile />
          ) : (
            <Link className='nav-link ' aria-current='page' to='/login'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
