import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { BookItem, LetterItem, Scroll } from 'components'
import { BREAKPOINTS } from 'consts'

const module = css`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0 0;
  justify-items: stretch;
  align-items: stretch;
  justify-content: stretch;
  align-content: stretch;
  grid-auto-rows: auto;
  grid-auto-flow: row;

  & > * {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media ${BREAKPOINTS.PHONE_ONLY} {
    & > *:not(:nth-child(2n)) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  @media ${BREAKPOINTS.TABLET_PORTRAIT_UP} {
    grid-template-columns: auto auto auto;
    & > *:not(:nth-child(3n)) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  @media ${BREAKPOINTS.DESKTOP_UP} {
    grid-template-columns: auto auto auto auto;
    & > *:not(:nth-child(4n)) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  @media ${BREAKPOINTS.BIG_DESKTOP_UP} {
    grid-template-columns: auto auto auto auto auto auto;
    & > *:not(:nth-child(6n)) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`

const list = css`
  & > * {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`

const Items = styled.div`
  padding-bottom: 50px;
  ${({ layout }) => (layout === 'list' ? list : module)};
`

const Container = styled.div`
  height: calc(100% - 40px);
  width: 100%;
  flex: 1;
`

class BookList extends Component {
  getSections() {
    const { books } = this.props
    const sections = []
    for (const book of books) {
      const firstChar = book.title[0].toUpperCase()
      const arrayEntry = sections.find(v => v.initial === firstChar)
      if (arrayEntry) {
        arrayEntry.books.push(book)
      } else {
        sections.push({
          initial: firstChar,
          books: [book],
        })
      }
    }
    return sections.sort((a, b) => {
      if (a.initial < b.initial) return -1
      if (a.initial > b.initial) return 1
      return 0
    })
  }

  render() {
    const { books, layout } = this.props
    const sections = this.getSections()
    return (
      <Container>
        <Scroll>
          <Items layout={layout}>
            {books && books.length === 0 && <LetterItem label={'No books on this Category'} layout={layout} />}
            {sections.map(s => (
              <Fragment key={s.initial}>
                <LetterItem label={s.initial} key={s.initial} layout={layout} />
                {s.books.map(b => <BookItem book={b} key={b.isbn} layout={layout} />)}
              </Fragment>
            ))}
          </Items>
        </Scroll>
      </Container>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.array,
  loading: PropTypes.bool,
  layout: PropTypes.string,
}

BookList.defaultProps = {
  books: [],
}

BookList.displayName = 'BookList'

export default BookList
