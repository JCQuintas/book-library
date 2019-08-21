import React from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'

const Container = styled.div`
  break-inside: avoid;

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 0;
    width: 100%;
    padding-top: 100%;

    & > div {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

const ModuleItem = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <div>
        <div>{children}</div>
      </div>
    </Container>
  )
}

ModuleItem.propTypes = {}

ModuleItem.defaultProps = {}

ModuleItem.displayName = 'ModuleItem'

export default ModuleItem
