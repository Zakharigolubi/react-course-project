import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Users from './layouts/Users'
import Login from './layouts/Login'
import Main from './layouts/Main'
import NavBar from './components/ui/Navbar'
import { ProfessionProvider } from './hooks/UseProfessions'
import { QualityProvider } from './hooks/UseQualities'
import AuthProvider from './hooks/UseAuth'
import ProtectedRoute from './components/common/ProtectedRoute'
import LogOut from './layouts/LogOut'

function App() {
  return (
    <div>
      <AuthProvider>
        <NavBar />

        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
              <Route path='/login/:type?' component={Login} />
              <Route path='/logout' component={LogOut} />
              <Route path='/' exact component={Main} />
              <Redirect to='/' />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App
