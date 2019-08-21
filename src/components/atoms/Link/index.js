import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { COLORS } from 'consts'

const styles = css`
  text-decoration: none;
  color: ${COLORS.PRIMARY_4};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;

  &:hover,
  &:focus {
    color: ${COLORS.PRIMARY_1};
    text-decoration: underline;
  }
`

const Anchor = styled.a`
  ${styles};
`

const StyledLink = styled(Link)`
  ${styles};
`

const InternalLink = ({ to, href, download, ...props }) => {
  if (to) return <StyledLink to={to} {...props} />
  return <Anchor download={download} href={href} {...props} />
}

InternalLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  download: PropTypes.string,
}

InternalLink.defaultProps = {}

InternalLink.displayName = 'Link'

export default InternalLink
