import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Template, HomePage, CreatePage } from 'components'
import globalStyles from './globalStyles'

globalStyles()

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/create" component={Template(CreatePage)} />
      <Route path="/" component={Template(HomePage)} />
      <Route path="/404" render={() => <div>Route not found</div>} />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
