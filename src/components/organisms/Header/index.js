import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, IconButton } from './pieces'
import { Icon } from 'components'

class Header extends Component {
  render() {
    const { isNavigationOpen, toggleNavigation } = this.props
    return (
      <Container>
        <IconButton>
          <Icon icon={!isNavigationOpen ? 'menu' : 'back'} onClick={toggleNavigation} />
        </IconButton>
      </Container>
    )
  }
}

Header.propTypes = {
  isNavigationOpen: PropTypes.bool,
  toggleNavigation: PropTypes.func,
}

Header.defaultProps = {}

Header.displayName = 'Header'

export default Header
