import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Users from './layouts/Users'
import Login from './layouts/Login'
import Main from './layouts/Main'
import NavBar from './components/ui/Navbar'
import AuthProvider from './hooks/UseAuth'
import ProtectedRoute from './components/common/ProtectedRoute'
import LogOut from './layouts/LogOut'
import AppLoader from './components/ui/hoc/AppLoader'

function App() {
  return (
    <div>
      <AppLoader>
        <AuthProvider>
          <NavBar />

          <Switch>
            <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
            <Route path='/login/:type?' component={Login} />
            <Route path='/logout' component={LogOut} />
            <Route path='/' exact component={Main} />
            <Redirect to='/' />
          </Switch>
        </AuthProvider>
      </AppLoader>

      <ToastContainer />
    </div>
  )
}

export default App
