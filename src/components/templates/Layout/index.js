import React, { Component } from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { REST_API } from 'utils'
import { BookList, BookInfo, LayoutBar } from 'components'
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

class Layout extends Component {
  lastFetched = null
  state = {
    books: [],
    layout: 'list',
  }

  getCategory() {
    const { match } = this.props
    if (match && match.params && match.params.category) {
      if (match.params.category === 'all') return ''
      if (match.params.category !== 'all') return match.params.category
    }
    return ''
  }

  changeLayout = layout => {
    if (layout !== this.state.layout) this.setState({ layout })
  }

  fetchBooks() {
    const category = this.getCategory()
    this.lastFetched = category
    REST_API.books({ category }).then(({ data: books }) => this.setState({ books }))
  }

  componentDidMount() {
    this.fetchBooks()
  }

  componentDidUpdate() {
    const category = this.getCategory()
    if (category !== this.lastFetched) this.fetchBooks()
  }

  render() {
    const { books, layout } = this.state
    if (window.matchMedia(BREAKPOINTS.TABLET_LANDSCAPE_UP).matches) {
      return (
        <Container>
          <ListSection>
            <LayoutBar selected={layout} onLayoutSelect={this.changeLayout} layouts={['module', 'list']} />
            <BookList books={books} layout={layout} />
          </ListSection>
          <DetailSection>
            <Route path="/:category/:book?" component={BookInfo} />
          </DetailSection>
        </Container>
      )
    }
    return (
      <Container>
        <Switch>
          <Route path="/:category/:book" component={BookInfo} />
          <Route
            path="/:category"
            render={() => (
              <ListSection>
                <LayoutBar selected={layout} onLayoutSelect={this.changeLayout} layouts={['module', 'list']} />
                <BookList books={books} layout={layout} />
              </ListSection>
            )}
          />
        </Switch>
      </Container>
    )
  }
}

Layout.propTypes = {}

Layout.defaultProps = {}

Layout.displayName = 'Layout'

export default Layout
