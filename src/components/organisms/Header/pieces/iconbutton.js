import styled from 'styled-components'
import { Button } from 'components'
import { BREAKPOINTS } from 'consts'

export default styled(Button)`
  padding: 0;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin-left: 3px;

  @media ${BREAKPOINTS.TABLET_LANDSCAPE_UP} {
    display: none;
  }
`
