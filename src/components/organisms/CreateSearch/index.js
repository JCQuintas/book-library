import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import moment from 'moment'
//import PropTypes from 'prop-types'
import { Button, Scroll, Icon, H } from 'components'
import { GOODREADS_API, xmlToJson, getProperty, parsePublicationDate } from 'utils'
import { SearchResultItem, Form } from './pieces'

const Items = styled.div`
  & > * {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  padding-bottom: 50px;
`

class CreateSearch extends Component {
  state = {
    search: '',
    results: [],
    selectedIndex: null,
  }

  componentDidMount() {
    const qs = queryString.parse(this.props.location.search)
    if (qs.q) {
      this.setState({ search: qs.q }, () => this.fetch())
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const q = queryString.stringify({ q: this.state.search })
    this.props.history.push(`/create?${q}`)
    this.fetch()
  }

  fetch() {
    this.setState({ selectedIndex: null })
    GOODREADS_API.search({ q: this.state.search }).then(r => {
      const jsonified = xmlToJson(new DOMParser().parseFromString(r.data, 'application/xml'))
      const results = getProperty(jsonified, 'goodreadsResponse.search.results.work', [])
      this.setState({ results })
    })
  }

  onChange = e => {
    this.setState({ search: e.target.value })
  }

  onClick = (work, i) => () => {
    const q = queryString.stringify({ q: this.state.search })
    this.props.history.push(`/create/${work.bestBook.id}?${q}`)
    this.setState({ selectedIndex: i })
  }

  render() {
    const { search, results, selectedIndex } = this.state
    return (
      <Fragment>
        <Form onSubmit={this.onSubmit} value={search} autocomplete="on">
          <input value={search} onChange={this.onChange} name={'search'} />
          <div>Search for a book</div>
          <Button type="submit" secondary>
            <Icon icon="search" title="Search" />
          </Button>
        </Form>
        <Scroll>
          <Items>
            {results &&
              results.length > 0 &&
              results.map((v, i) => (
                <SearchResultItem tabIndex={0} onClick={this.onClick(v, i)} key={v.id} selected={selectedIndex === i}>
                  <img src={v.bestBook.imageUrl} alt={v.bestBook.title} />
                  <div>
                    <H.H3>{v.bestBook.title}</H.H3>
                    <H.H3>{v.bestBook.author.name}</H.H3>
                    <div>
                      {moment(
                        parsePublicationDate(
                          v.originalPublicationYear,
                          v.originalPublicationMonth,
                          v.originalPublicationDay
                        )
                      ).format('DD/MM/YYYY')}
                    </div>
                  </div>
                </SearchResultItem>
              ))}
          </Items>
        </Scroll>
      </Fragment>
    )
  }
}

CreateSearch.propTypes = {}

CreateSearch.defaultProps = {}

CreateSearch.displayName = 'CreateSearch'

export default CreateSearch
