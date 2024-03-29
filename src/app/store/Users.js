import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import { generateAuthError } from '../utils/generateAuthError'
import getRandomInt from '../utils/getRandomInt'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSucces: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdateRequested: (state) => {
      state.isLoading = true
    },
    userUpdateSuccess: (state, action) => {
      state.entities = state.entities.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload
        }
        return user
      })
      state.isLoading = false
    },
    authRequested: (state) => {
      state.error = null
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSucces,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateRequested,
  userUpdateSuccess
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFailed = createAction('users/createUserFailed')

export const signIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.signIn({ email, password })
      dispatch(authRequestSucces({ userId: data.localId }))
      localStorageService.setTokens(data)
      history.push(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestFailed(errorMessage))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSucces({ userId: data.localId }))
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      )
    } catch (error) {
      dispatch(authRequestFailed(error.message))
    }
  }

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested())
    try {
      const { content } = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (error) {
      dispatch(createUserFailed(error.message))
    }
  }
}

export const updateUserData = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.updateUser(payload)
    dispatch(userUpdateSuccess(content))
    history.push(`/users/${content._id}`)
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const getUsers = () => (state) => state.users.entities

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((user) => user._id === state.users.auth.userId)
    : null
}

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users?.entities.find((user) => user._id === userId)
  }
}

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => {
  return state.users.isLoading
}
export const getCurrentUserId = () => (state) => state.users.auth.userId
export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
