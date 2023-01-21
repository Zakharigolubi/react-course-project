import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Users from './layouts/Users'
import Navbar from '../app/components/ui/Navbar'
import Main from './layouts/Main'
import Login from './layouts/Login'

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userId?' component={Users} />
        <Redirect to='/' />
      </Switch>
    </>
  )
}

export default App
