import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './layouts/Users'
import Navbar from './components/Navbar'
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
      </Switch>
    </>
  )
}

export default App
