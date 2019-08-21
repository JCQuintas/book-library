import React, { Component, Fragment } from 'react'
// import styled from 'styled-components'
//import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Layout } from 'components'

class HomePage extends Component {
  componentDidMount() {
    this.redirectToAll()
  }

  componentDidUpdate() {
    this.redirectToAll()
  }

  redirectToAll() {
    const { history, location } = this.props
    if (location && location.pathname && location.pathname === '/') {
      history.replace('/all')
    }
  }

  render() {
    return (
      <Fragment>
        <Route path="/:category" component={Layout} />
      </Fragment>
    )
  }
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

HomePage.displayName = 'HomePage'

export default HomePage
