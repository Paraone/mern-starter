import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

import { loginUser, LoginInfo } from '@/actions/User'
import { 
  Toast, 
  Field as FieldComponent, 
  PasswordField 
} from '@/components'

const required = (value: any) => (value ? undefined : 'Required')

const form = reduxForm({
  form: 'login'
})

interface LoginProps {
  errorMessage: string
  loginUser: (_: LoginInfo) => any
  handleSubmit: (_: any) => any
}

const Login: (React.FunctionComponent<LoginProps & InjectedFormProps>) = ({ errorMessage, handleSubmit, loginUser }) => {
  return (
    <div className='container'>
      <h3>Login to @</h3>
      <form onSubmit={handleSubmit((loginInfo: LoginInfo) => loginUser(loginInfo))}>
        {errorMessage && <Toast text={errorMessage} type='error' />}
        <label htmlFor='username'>Username</label>
        <Field
          id='username'
          name='username'
          component={FieldComponent}
          type='text'
          validate={required}
        />
        <label htmlFor='password'>Password</label>
        <Field
          id='password'
          name='password'
          component={PasswordField}
          type='password'
          validate={required}
        />
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </div>
  )
}

function mapStateToProps (state: any) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  }
}

export default connect(
  mapStateToProps, { loginUser }
)(form(Login))
