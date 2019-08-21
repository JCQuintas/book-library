import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icons from './icons'
const iconKeys = Object.keys(Icons)

const Container = styled.svg`
  height: ${({ size }) => size || 24}px;
  width: ${({ size }) => size || 24}px;
`

const Icon = ({ icon, title, ...props }) => {
  return (
    <Container xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      {title && <title>{title}</title>}
      {Icons[icon]}
    </Container>
  )
}

Icon.propTypes = {
  icon: PropTypes.oneOf(iconKeys),
  size: PropTypes.number,
  title: PropTypes.string,
}

Icon.defaultProps = {
  size: 24,
}

Icon.displayName = 'Icon'

export default Icon
