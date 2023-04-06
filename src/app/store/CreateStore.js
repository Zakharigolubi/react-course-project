import { combineReducers, configureStore } from '@reduxjs/toolkit'
import professionsReducer from './Professions'
import qualitiesReducer from './Qualities'

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
