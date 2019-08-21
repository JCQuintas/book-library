import React, { Component, Fragment } from 'react'
//import PropTypes from 'prop-types'
import { REST_API } from 'utils'
import { Scroll, Link, H, Icon } from 'components'
import { InfoContainer, Description, ButtonsHolder, Empty, Container } from './pieces'
import moment from 'moment'

class BookInfo extends Component {
  lastFetched = null
  state = {
    book: {},
  }

  getBook() {
    const { match } = this.props
    if (match && match.params && match.params.book) {
      return match.params.book
    }
    return ''
  }

  fetchBook() {
    const bookId = this.getBook()
    this.lastFetched = bookId
    if (bookId) {
      REST_API.book({ bookId }).then(({ data: book }) => this.setState({ book }))
    }
  }

  componentDidMount() {
    this.fetchBook()
  }

  componentDidUpdate() {
    const book = this.getBook()
    if (book !== this.lastFetched) this.fetchBook()
  }

  render() {
    const { book } = this.state

    const hasBook = Object.keys(book).length > 0 && book.constructor === Object

    return (
      <Scroll>
        {!this.getBook() && <Empty />}
        {hasBook && (
          <Container>
            <H.H2>{book.title}</H.H2>
            <H.H3>{book.author}</H.H3>
            <div>{moment(book.publishedAt).format('DD/MM/YYYY')}</div>
            <InfoContainer>
              <img src={book.thumbnail} alt={book.title} />
              <div>
                {book.pages && (
                  <Fragment>
                    <span>Pages</span>
                    <span>{book.pages}</span>
                  </Fragment>
                )}
                {book.isbn && (
                  <Fragment>
                    <span>ISBN</span>
                    <span>{book.isbn}</span>
                  </Fragment>
                )}
                {book.isbn13 && (
                  <Fragment>
                    <span>ISBN13</span>
                    <span>{book.isbn13}</span>
                  </Fragment>
                )}
              </div>
            </InfoContainer>
            <ButtonsHolder>
              <Icon icon="download" />
              {book.downloadLinks &&
                book.downloadLinks.map(l => (
                  <Fragment key={l.type}>
                    <Link href={l.url} download={book.title} target={'_blank'} tabIndex={0}>
                      {l.type.toUpperCase()}
                    </Link>
                  </Fragment>
                ))}
            </ButtonsHolder>
            <Description>{book.description}</Description>
          </Container>
        )}
      </Scroll>
    )
  }
}

BookInfo.propTypes = {}

BookInfo.defaultProps = {}

BookInfo.displayName = 'BookInfo'

export default BookInfo
