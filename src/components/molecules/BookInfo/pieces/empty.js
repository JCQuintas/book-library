import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts'
import { Icon } from 'components'

const Container = styled.div.withConfig({ displayName: 'Empty' })`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    height: 200px;
    width: 200px;
    fill: ${COLORS.PRIMARY_1};
  }
`

export default props => (
  <Container>
    <Icon icon="book" />
  </Container>
)
