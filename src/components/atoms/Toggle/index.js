import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { COLORS } from 'consts'

const getBackground = ({ inverse: i, disabled: d, selected: s }) => {
  if (i) return COLORS.TRANSPARENT
  if (d) return COLORS.DISABLED
  if (s) return COLORS.PRIMARY_3
  return COLORS.PRIMARY
}

const getColor = ({ inverse: i, disabled: d, selected: s }) => {
  if (d) return COLORS.DISABLED_TEXT_DARK
  if (i && !s) return COLORS.PRIMARY
  if (i && s) return COLORS.PRIMARY_4
  return COLORS.SECONDARY_TEXT_LIGHT
}

const getHover = ({ inverse: i, selected: s }) => {
  if (i) return COLORS.PRIMARY_HOVER
  if (s) return COLORS.PRIMARY_4
  return COLORS.PRIMARY_1
}

const StyledToggle = styled.button`
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

const Toggle = ({ to, href, download, type, ...props }) => {
  return <StyledToggle {...props} type={type} />
}

Toggle.propTypes = {
  type: PropTypes.string,
  selected: PropTypes.bool,
  inverse: PropTypes.bool,
  secondary: PropTypes.bool,
}

Toggle.defaultProps = {}

Toggle.displayName = 'Toggle'

export default Toggle
