import axios from 'axios'
import { Dispatch } from 'redux'

import { history } from '@/store'

// Types
import { errorHandler } from './User'
import { AuthTypes, TodoTypes } from './ActionTypes'

const { 
  TODO_LOAD,
  TODO_LOAD_ALL,
  TODO_CREATE,
  TODO_DELETE
} = TodoTypes

const { AUTH_ERROR } = AuthTypes

const API_URL = '/api'

// Action creators
/**
 * Action creator for loading a TODO based on ID
 *
 * @param todoId: the ID of the TODO to load
 */
export function loadTodo (todoId: string) {
  return (dispatch: Dispatch) => {
    axios.get(`${API_URL}/todos/${todoId}`)
    .then((response) => {
      dispatch({
        type: TODO_LOAD,
        payload: response.data.todo
      })
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    })
  }
}

/**
 * Action creator for loading all the todos
 */
export function loadTodos () {
  return (dispatch: Dispatch) => {
    axios.get(`${API_URL}/todos`)
    .then((response) => {
      dispatch({
        type: TODO_LOAD_ALL,
        payload: response.data.todos
      })
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    })
  }
}

/**
 * Action creator to create a todo
 */
export function createTodo (data: any) {
  return (dispatch: Dispatch) => {
    axios.post(`${API_URL}/todos/create`, { body: { data } })
    .then((res) => {
      dispatch({
        type: TODO_CREATE
      })
      history.push(`/todos/${res.data._id}`)
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    })
  }
}

/**
 * Action creator for finishing and deleting a TODO based on ID
 *
 * @param todoId: the ID of the TODO to load
 */
export function finishTodo (todoId: string) {
  return (dispatch: Dispatch) => {
    axios.delete(`${API_URL}/todos/${todoId}`)
    .then((response) => {
      dispatch({
        type: TODO_DELETE,
        payload: response.data.todoId
      })
      history.push('/todos')
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    })
  }
}
