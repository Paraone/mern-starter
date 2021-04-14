import { AuthTypes } from './ActionTypes'
import { Dispatch } from 'redux'
import axios from 'axios'
import { User } from '@/types'
import cookies from '@/utils/cookies'
import { history } from '@/store'

const API_URL = '/api'

interface AuthError {
  data: any
  status: number
  response: any
}

// Action creators

// Action creator to remove cookie and set unauthenticated status
// Does not redirect like logoutUser()
export function unauthUser () {
    return (dispatch: Dispatch) => {
      dispatch({ type: AuthTypes.UNAUTH_USER })
      cookies.remove('token', { path: '/' })
    }
  }
  
  // Action creator to set authenticated status
  // Assumes the cookie is already set
  export function authUser (user: User) {
    return (dispatch: Dispatch) => {
      dispatch({
        type: AuthTypes.AUTH_USER,
        payload: user
      })
    }
  }
  
  // Action creator to handle errors
  export function errorHandler (dispatch: Dispatch, error: AuthError, type: any) {
    let errorMessage = ''
  
    if (!error.data) {
      dispatch({
        type,
        payload: 'An error occurred'
      })
    }
  
    if (error.data.error) {
      errorMessage = error.data.error
    } else if (error.data) {
      errorMessage = error.data
    }
  
    if (error.status === 401) {
      dispatch({
        type,
        payload: 'You are not authorized to do this. Please login and try again.'
      })
      logoutUser()
    } else {
      dispatch({
        type,
        payload: errorMessage
      })
    }
  }
  
  // Action creator to handle logins
  export interface LoginInfo {
    username: string
    password: string
  }
  
  export function loginUser ({ username, password }: LoginInfo) {
    return (dispatch: Dispatch) => {
      axios.post(`${API_URL}/auth/login`, { username, password })
      .then((response) => {
        cookies.set('token', response.data.token, { path: '/' })
        dispatch({
          type: AuthTypes.AUTH_USER,
          payload: response.data.user
        })
        history.push('/')
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR)
      })
    }
  }
  
  // Action creator to register user
  export interface RegisterInfo {
    username: string
    password: string
  }
  
  export function registerUser ({ username, password }: RegisterInfo) {
    return (dispatch: Dispatch) => {
      axios.post(`${API_URL}/auth/register`, { username, password })
      .then((response) => {
        cookies.set('token', response.data.token, { path: '/' })
        dispatch({
          type: AuthTypes.AUTH_USER,
          payload: response.data.user
        })
        history.push('/')
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR)
      })
    }
  }
  
  // Action creator to log out the user
  export function logoutUser () {
    return (dispatch: Dispatch) => {
      dispatch({ type: AuthTypes.UNAUTH_USER })
      cookies.remove('token', { path: '/' })
  
      history.push('/')
    }
  }