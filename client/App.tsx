import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

// Component imports
import { Navigation } from '@/components'

import { 
  Todo, 
  Todos,
   Home,
   Login,
   Register,
   NotFound
} from '@/templates'

import RequireAuth from '@/utils/RequireAuth'

import '@/styles/styles.scss'

interface AppProps {
  history: any
  location: any
  match: any
}

const App: React.FunctionComponent<AppProps> = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path='/' component={Home} />

      <Route exact path='/todos' component={Todos} />

      {/* Pages requiring a user to be logged in can be wrapped as such */}
      <Route exact path='/todos/:todoId' component={RequireAuth(Todo)} />

      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />

      <Route component={NotFound} />
    </Switch>
  </div>
)

function mapStateToProps (state: any) {
  return {
    auth: state.auth,
    location: state.router.location
  }
}

export default connect(mapStateToProps)(withRouter(App))
