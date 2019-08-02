import React, { Component } from 'react'
import {
  inject,
  observer
} from 'mobx-react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Login from './Public/Main'
import Home from './App/Home'
import AboutUs from './App/AboutUs'

@inject('store')
@observer
export default class App extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
  }
  render () {
    const {
      isLogged
    } = this.store.appState
    let routes = null
    if (!isLogged) {
      routes = <Switch>
        <Route exact path='/login' component={Login} />
        <Redirect to='/login' />
      </Switch>
    } else {
      routes = <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about-us' component={AboutUs} />
        <Redirect to='/' />
      </Switch>
    }
    return <div className='wrapper'>
      {routes}
    </div>
  }
}
