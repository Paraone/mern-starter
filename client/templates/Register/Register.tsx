import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

import { registerUser, RegisterInfo } from '@/actions/User'
import { 
  Toast,
  Field as FieldComponent, 
  PasswordField 
} from '@/components'

const required = (value: any) => (value ? undefined : 'Required')

const form = reduxForm({
  form: 'register'
})

interface RegisterProps {
  registerUser: (_: RegisterInfo) => any
  handleSubmit: (_: any) => any
  errorMessage: string
}

const Register: React.FunctionComponent<RegisterProps & InjectedFormProps> = ({ handleSubmit, registerUser, errorMessage }) => {
  return (
    <div className='container'>
      <h3>Register for @</h3>
      <form onSubmit={handleSubmit((registerInfo: RegisterInfo) => registerUser(registerInfo))}>
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
          Register
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  errorMessage: state.auth.error,
  message: state.auth.message
})

const mapDispatchToProps = { registerUser }

export default connect(mapStateToProps, mapDispatchToProps)(form(Register))
