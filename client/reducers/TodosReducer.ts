import { TodoTypes } from '../actions/ActionTypes'

const { 
  TODO_LOAD,
  TODO_LOAD_ALL,
  TODO_CREATE,
  TODO_DELETE
} = TodoTypes

export default function (state = {}, action: any) {
    switch (action.type) {
      case TODO_LOAD:
        return {
          ...state,
          todo: action.payload
        }
      case TODO_LOAD_ALL:
        return {
          ...state,
          todos: action.payload
        }
      case TODO_CREATE:
        return state
      case TODO_DELETE:
        return state
      default:
        return state
    }
  }
  