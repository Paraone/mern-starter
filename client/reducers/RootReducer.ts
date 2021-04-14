import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './UserReducer'
import todoReducer from './TodosReducer'

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  auth: userReducer,
  todos: todoReducer
})

export default rootReducer
