import React, { Component } from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { CreateSearch, CreateForm } from 'components'
import { BREAKPOINTS } from 'consts'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100%;
`

const ListSection = styled.div`
  flex: 2;
`

const DetailSection = styled.div`
  min-width: 400px;
  flex: 1;
`

class CreateLayout extends Component {
  render() {
    if (window.matchMedia(BREAKPOINTS.TABLET_LANDSCAPE_UP).matches) {
      return (
        <Container>
          <ListSection>
            <CreateSearch {...this.props} />
          </ListSection>
          <DetailSection>
            <Route path="/create/:id?" component={CreateForm} />
          </DetailSection>
        </Container>
      )
    }
    return (
      <Container>
        <Switch>
          <Route
            path="/create"
            exact
            render={() => (
              <ListSection>
                <CreateSearch {...this.props} />
              </ListSection>
            )}
          />
          <Route path="/create/:id" component={CreateForm} />
        </Switch>
      </Container>
    )
  }
}

CreateLayout.propTypes = {}

CreateLayout.defaultProps = {}

CreateLayout.displayName = 'CreateLayout'

export default CreateLayout
