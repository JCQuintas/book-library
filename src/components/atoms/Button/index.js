import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { COLORS } from 'consts'

const getBackground = ({ inverse: i, disabled: d, secondary: sec }) => {
  if (i) return COLORS.TRANSPARENT
  if (d) return COLORS.DISABLED
  if (sec) return COLORS.PRIMARY_1
  return COLORS.PRIMARY
}

const getColor = ({ inverse: i, disabled: d, secondary: sec }) => {
  if (d) return COLORS.DISABLED_TEXT_DARK
  if (i && !sec) return COLORS.PRIMARY
  if (i && sec) return COLORS.PRIMARY_3
  return COLORS.SECONDARY_TEXT_LIGHT
}

const getHover = ({ inverse: i, secondary: sec }) => {
  if (i) return COLORS.TRANSPARENT
  if (sec) return COLORS.PRIMARY_2
  return COLORS.PRIMARY_1
}

const styles = css`
  background-color: ${props => getBackground(props)};
  border: none;
  color: ${props => getColor(props)};
  fill: ${props => getColor(props)};
  padding: 0 10px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s ease;
  text-decoration: none;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background-color: ${props => getHover(props)};
  }
`

const Anchor = styled.a`
  line-height: 1em;
  ${styles};
`
const StyledButton = styled.button`
  ${styles};
`

const StyledLink = styled(Link)`
  ${styles};
`

const Button = ({ to, href, download, type, ...props }) => {
  if (to) return <StyledLink to={to} {...props} />
  if (href || download) return <Anchor download={download} href={href} {...props} />
  return <StyledButton {...props} type={type} />
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  download: PropTypes.string,
  selected: PropTypes.bool,
  inverse: PropTypes.bool,
  secondary: PropTypes.bool,
}

Button.defaultProps = {}

Button.displayName = 'Button'

export default Button
