import styled from 'styled-components'
import { COLORS } from 'consts'

export default styled.div.withConfig({ displayName: 'CategoriesHolder' })`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  max-height: ${({ entries }) => (entries + 1) * 50}px;
  background-color: ${COLORS.PRIMARY_1};
`
