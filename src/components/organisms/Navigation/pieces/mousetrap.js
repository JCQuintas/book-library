import styled from 'styled-components'
import { BREAKPOINTS } from 'consts'

export default styled.nav.withConfig({ displayName: 'MouseTrap' })`
  @media ${BREAKPOINTS.PHONE_ONLY} {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
  }
`
