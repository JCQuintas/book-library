import React, { Component, Fragment } from 'react'
// import styled from 'styled-components'
//import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { CreateLayout } from 'components'

class CreatePage extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/" component={CreateLayout} />
      </Fragment>
    )
  }
}

CreatePage.propTypes = {}

CreatePage.defaultProps = {}

CreatePage.displayName = 'CreatePage'

export default CreatePage
