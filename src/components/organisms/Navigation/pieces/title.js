import styled from 'styled-components'
import { H } from 'components'
import { COLORS } from 'consts'

export default styled(H.H1).withConfig({ displayName: 'Title' })`
  margin: 0 0 40px;
  text-align: center;
  color: ${COLORS.SECONDARY_TEXT_LIGHT};
`
