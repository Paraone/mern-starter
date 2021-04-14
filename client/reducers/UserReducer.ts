import { Action } from 'redux'
import { AuthTypes } from '@/actions/ActionTypes'

const { AUTH_USER, UNAUTH_USER, AUTH_ERROR } = AuthTypes;

interface AuthAction extends Action {
    payload?: any
  }
  
  interface AuthError {
    data: any
    status: number
    response: any
  }

interface AuthState {
  message: string
  authenticated: boolean
  error?: AuthError
  content?: string
}

// Reducer
const INITIAL_STATE: AuthState = {
  message: '',
  content: '',
  authenticated: false
}

export default function (state = INITIAL_STATE, action: AuthAction) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        user: action.payload
      }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}