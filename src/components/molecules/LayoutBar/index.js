import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon, Toggle } from 'components'

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const LayoutButton = styled(Toggle)`
  padding: 0;
  height: 40px;
  width: 40px;
`

const LayoutBar = ({ selected, layouts, onLayoutSelect, ...props }) => {
  const changeLayout = layout => e => {
    if (typeof onLayoutSelect === 'function') onLayoutSelect(layout)
  }

  return (
    <Container>
      {layouts &&
        layouts.length > 0 &&
        layouts.map(l => (
          <LayoutButton key={l} inverse selected={selected === l} onClick={changeLayout(l)} title={`Layout as ${l}`}>
            <Icon icon={l} />
          </LayoutButton>
        ))}
    </Container>
  )
}

LayoutBar.propTypes = {
  layouts: PropTypes.array,
  selected: PropTypes.string,
  onLayoutSelect: PropTypes.func,
}

LayoutBar.defaultProps = {
  layouts: [],
}

LayoutBar.displayName = 'LayoutBar'

export default LayoutBar
