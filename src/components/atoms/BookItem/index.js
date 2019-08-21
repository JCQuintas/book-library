import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { COLORS, FONT_SIZES } from 'consts'
import { ListItem, ModuleItem } from 'components'

const defaults = css`
  text-decoration: none;
  color: ${COLORS.SECONDARY_TEXT_DARK};
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;

  &:hover,
  &:focus {
    background-color: ${COLORS.PRIMARY_HOVER};
  }

  img {
    object-fit: contain;
  }

  span {
    font-size: ${FONT_SIZES.S14};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const ListContent = styled(Link)`
  ${defaults};
  padding: 10px;
  justify-content: flex-start;
  flex-direction: row;

  img {
    width: 100%;
    height: 40px;
    max-width: 40px;
    margin-left: 10px;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));
  }

  span {
    margin-left: 20px;
    line-height: 40px;
  }
`

const ModuleContent = styled(Link)`
  ${defaults};
  padding: 15px;
  flex-direction: column;
  justify-content: center;

  img {
    height: 50%;
    width: 50%;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
    align-self: center;
  }

  span {
    height: calc(1em * 1.25 * 2);
    margin-top: 10px;
    text-align: center;
    display: block; /* Fallback for non-webkit */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

const BookItem = ({ match, book, staticContext, history, location, layout, ...props }) => {
  if (layout === 'list')
    return (
      <ListItem {...props}>
        <ListContent to={`${match.url}/${book.id}`} title={book.title} layout={layout}>
          <img src={book.thumbnail} alt={book.title} />
          <span>{book.title}</span>
        </ListContent>
      </ListItem>
    )
  return (
    <ModuleItem {...props}>
      <ModuleContent to={`${match.url}/${book.id}`} title={book.title} layout={layout}>
        <img src={book.thumbnail} alt={book.title} />
        <span>{book.title}</span>
      </ModuleContent>
    </ModuleItem>
  )
}

BookItem.propTypes = {
  book: PropTypes.object,
  layout: PropTypes.oneOf(['module', 'list']),
}

BookItem.defaultProps = {
  layout: 'list',
}

BookItem.displayName = 'BookItem'

export default withRouter(BookItem)
