import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BREAKPOINTS } from 'consts'
import { REST_API } from 'utils'
import { Icon, Scroll } from 'components'
import { Link, CategoriesTitle, ImageHolder, Title, CategoriesHolder, Nav, MouseTrap } from './pieces'

class Navigation extends Component {
  state = {
    categories: [],
  }

  toggleOpen = () => {
    const { toggleNavigation } = this.props
    if (window.matchMedia(BREAKPOINTS.PHONE_ONLY).matches && typeof toggleNavigation === 'function') {
      toggleNavigation()
    }
  }

  renderCategories() {
    const { categories } = this.state

    if (!categories || categories.length <= 0) return null

    return categories.map(c => (
      <Link tabIndex={0} to={`/${c.name.toLowerCase()}`} key={c.id} onClick={this.toggleOpen}>
        {c.name}
      </Link>
    ))
  }

  componentDidMount() {
    REST_API.categories().then(({ data: categories }) => this.setState({ categories }))
  }

  render() {
    const { categories } = this.state
    const { isNavigationOpen } = this.props
    const addMouseTrap = isNavigationOpen && window.matchMedia(BREAKPOINTS.PHONE_ONLY).matches
    return (
      <Fragment>
        <Nav open={isNavigationOpen}>
          <ImageHolder>
            <img
              src="https://blasfotografia.com/wp-content/uploads/2015/08/candida-hofer-biblioteca-trinity-college-a-dublin.jpg"
              alt="avatar"
            />
            <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
              <circle cx="55" cy="55" r="55" strokeWidth="2" strokeDasharray="7 5 3 5" />
            </svg>
          </ImageHolder>
          <Title>Personal Library</Title>
          <CategoriesTitle>
            <Icon icon="categories" />
            Categories
          </CategoriesTitle>
          <CategoriesHolder entries={categories.length}>
            <Scroll>
              <Link tabIndex={0} to="/all" onClick={this.toggleOpen}>
                All
              </Link>
              {this.renderCategories()}
            </Scroll>
          </CategoriesHolder>
        </Nav>
        {addMouseTrap && <MouseTrap onClick={this.toggleOpen} />}
      </Fragment>
    )
  }
}

Navigation.propTypes = {
  isNavigationOpen: PropTypes.bool,
  toggleNavigation: PropTypes.func,
}

Navigation.defaultProps = {}

Navigation.displayName = 'Navigation'

export default Navigation
