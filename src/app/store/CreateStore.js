import { combineReducers, configureStore } from '@reduxjs/toolkit'
import professionsReducer from './Professions'
import qualitiesReducer from './Qualities'
import usersReducer from './Users'

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: usersReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
