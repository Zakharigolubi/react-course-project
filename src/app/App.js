import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Users from './layouts/Users'
import Navbar from '../app/components/ui/Navbar'
import Main from './layouts/Main'
import Login from './layouts/Login'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfessions'
import { QualityProvider } from './hooks/useQualities'

const App = () => {
  return (
    <>
      <Navbar />
      <ProfessionProvider>
        <QualityProvider>
          <Switch>
            <Route path='/users/:userId?/:edit?' component={Users} />
            <Route path='/login/:type?' component={Login} />
            <Route path='/' exact component={Main} />
            <Redirect to='/' />
          </Switch>
        </QualityProvider>
      </ProfessionProvider>
      <ToastContainer />
    </>
  )
}

export default App
