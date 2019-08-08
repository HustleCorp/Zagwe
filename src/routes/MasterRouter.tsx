// - Import react components
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import Loadable from 'react-loadable'

import { IRouterProps } from './IRouterProps'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'

// - Async Components
const AsyncHome: any = Loadable({
  loader: () => import('views/home'),
  loading: MasterLoadingComponent,
  delay: 300
})
const AsyncSignup = Loadable({
  loader: () => import('views/signup'),
  loading: MasterLoadingComponent,
  delay: 300
})
const AsyncEmailVerification = Loadable({
  loader: () => import('views/emailVerification'),
  loading: MasterLoadingComponent,
  delay: 300
})
const AsyncResetPassword = Loadable({
  loader: () => import('views/resetPassword'),
  loading: MasterLoadingComponent,
  delay: 300
})
const AsyncLogin = Loadable({
  loader: () => import('views/login'),
  loading: MasterLoadingComponent,
  delay: 300
})
const AsyncSetting = Loadable({
  loader: () => import('views/setting'),
  loading: MasterLoadingComponent,
  delay: 300
})

/**
 * Master router
 */
export class MasterRouter extends Component<IRouterProps, any> {
  render () {
    const { enabled, match, data } = this.props
    return (
        enabled ? (
        <Switch>
          <Route path='/signup' component={AsyncSignup} />
          <Route path='/emailVerification' component={AsyncEmailVerification} />
          <Route path='/settings' component={AsyncSetting} />
          <Route path='/resetPassword' component={AsyncResetPassword} />
          <PublicRoute path='/login' component={<AsyncLogin />} />
          <Route path='/' render={() => <AsyncHome uid={data.uid} />} />
        </Switch>)
          : ''

    )
  }
}
export default withRouter<any>(connect(null, null)(MasterRouter as any)) as typeof MasterRouter
