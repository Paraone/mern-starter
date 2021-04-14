import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { connect } from 'react-redux'
import { Todo, User } from 'Types'

import { Field as FieldComponent } from '@/components'
import { createTodo } from '@/actions/Todos'

const required = (value: any) => (value ? undefined : 'Required')

const form = reduxForm({
  form: 'todoCreate'
})

interface TodoCreateProps {
  handleSubmit (_: Todo): any
  createTodo (_: Todo): any
  user: User
}

const TodoCreate: React.FunctionComponent<TodoCreateProps & InjectedFormProps> = ({ handleSubmit, createTodo, user }) => {
  return (
    <div>
      <h4>Create a Todo</h4>
      <label htmlFor='name'>Name</label>
      <form
        onSubmit={handleSubmit((todoInfo: Todo) => {
          createTodo({
            ...todoInfo,
            author: user.username
          })
        })}
      >
        <Field
          type='text'
          id='title'
          name='title'
          component={FieldComponent}
          validate={required}
        />
        <label htmlFor='description'>Description</label>
        <Field
          type='text'
          id='description'
          name='description'
          component={FieldComponent}
          validate={required}
        />
        <button
          type='submit'
          className='btn'
        >
          Create
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  const { auth: {
    error,
    message,
    user
  } } = state;

  return {
    errorMessage: error,
    message,
    user
  }
}

export default connect(
  mapStateToProps, { createTodo }
)(form(TodoCreate))
