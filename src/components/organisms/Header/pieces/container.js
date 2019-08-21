import styled from 'styled-components'
import { COLORS } from 'consts'

export default styled.header`
  height: 40px;
  display: flex;
  padding: 0 10px;
  justify-content: flex-start;
  align-items: center;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.PRIMARY_TEXT_LIGHT};
  font-weight: 300;
  box-shadow: ${COLORS.HEADER_SHADOW};
`
