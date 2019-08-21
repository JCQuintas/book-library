import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FONT_SIZES, COLORS } from 'consts'
import { ListItem, ModuleItem } from 'components'

const Span = styled.span`
  margin: 10px 20px;
  line-height: 40px;
  height: 40px;
  width: ${({ label }) => (label && label.length > 1 ? 'auto' : '40px')};
  font-size: ${FONT_SIZES.S24};
  color: ${COLORS.DISABLED_TEXT_DARK};
  align-items: center;
  justify-content: center;
  font-weight: 700;
  display: flex;
`

const LetterItem = ({ label, layout, ...props }) => {
  if (layout === 'list')
    return (
      <ListItem {...props}>
        <Span label={label}>{label}</Span>
      </ListItem>
    )

  return (
    <ModuleItem {...props}>
      <Span label={label}>{label}</Span>
    </ModuleItem>
  )
}

LetterItem.propTypes = {
  label: PropTypes.string,
  size: PropTypes.number,
  layout: PropTypes.oneOf(['module', 'list']),
}

LetterItem.defaultProps = {
  layout: 'list',
}

LetterItem.displayName = 'LetterItem'

export default LetterItem
