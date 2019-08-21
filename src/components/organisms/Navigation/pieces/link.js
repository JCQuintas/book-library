import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { Icon } from 'components'
import { COLORS, FONT_SIZES } from 'consts'

const StyledLink = styled(NavLink).withConfig({ displayName: 'Link' })`
  height: 50px;
  line-height: 50px;
  padding: 0 13px;
  text-decoration: none;
  transition: background-color 0.15s ease;
  background-color: ${COLORS.PRIMARY_1};
  font-size: ${FONT_SIZES.S14};
  color: ${COLORS.SECONDARY_TEXT_LIGHT};
  fill: ${COLORS.SECONDARY_TEXT_LIGHT};
  display: flex;
  align-items: center;

  & > :first-child {
    margin-right: 13px;
  }

  &.active {
    cursor: default;
    color: ${COLORS.PRIMARY_TEXT_LIGHT};
    fill: ${COLORS.PRIMARY_TEXT_LIGHT};
    background-color: ${COLORS.PRIMARY_3};
  }

  &:hover:not(.active),
  &:focus:not(.active) {
    background-color: ${COLORS.PRIMARY_3};
  }
`

const Link = ({ children, location, history, match, staticContext, ...props }) => {
  const icon = location.pathname && location.pathname.indexOf(props.to) > -1 ? 'selected' : 'unselected'
  return (
    <StyledLink {...props}>
      <Icon icon={icon} />
      {children}
    </StyledLink>
  )
}

Link.propTypes = {}

Link.defaultProps = {}

Link.displayName = 'Link'

export default withRouter(Link)
