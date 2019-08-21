import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { Header, Navigation } from 'components'
import { BREAKPOINTS } from 'consts'
import styled from 'styled-components'
import { NavigationContext, AddNavigation } from 'contexts'

const Holder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  flex: 1;
  position: relative;
`

const Content = styled.div`
  flex: 1;
  align-self: stretch;
  height: 100%;
`

const Template = (component, opts = {}) => {
  class Store extends Component {
    state = {
      isNavigationOpen: window.matchMedia(BREAKPOINTS.TABLET_PORTRAIT_UP).matches,
      toggleNavigation: () => this.setState({ isNavigationOpen: !this.state.isNavigationOpen }),
    }

    render() {
      const { ...props } = this.props
      return (
        <NavigationContext.Provider value={this.state}>
          <AddNavigation>
            <Header {...props} />
          </AddNavigation>
          <Holder>
            <AddNavigation>
              <Navigation {...props} />
            </AddNavigation>
            <Content>{React.createElement(component, { ...props })}</Content>
          </Holder>
        </NavigationContext.Provider>
      )
    }
  }
  return Store
}

Template.propTypes = {}

Template.defaultProps = {}

Template.displayName = 'Template'

export default Template
