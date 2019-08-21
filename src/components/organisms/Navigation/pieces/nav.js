import styled from 'styled-components'
import { COLORS, BREAKPOINTS } from 'consts'

export default styled.nav.withConfig({ displayName: 'Nav' })`
  background-color: ${COLORS.PRIMARY};
  display: flex;
  flex-direction: column;
  width: 240px;
  min-width: 240px;
  position: relative;
  transition: left 1s cubic-bezier(0.215, 0.61, 0.355, 1), margin-left 1s cubic-bezier(0.215, 0.61, 0.355, 1);

  @media ${BREAKPOINTS.PHONE_ONLY} {
    position: absolute;
    left: ${({ open }) => (open ? 0 : '-240px')};
    top: 0;
    bottom: 0;
    z-index: 1000;
  }

  @media ${BREAKPOINTS.TABLET_PORTRAIT_UP} {
    margin-left: ${({ open }) => (open ? 0 : '-240px')};
  }

  @media ${BREAKPOINTS.TABLET_LANDSCAPE_UP} {
    margin-left: 0;
  }
`
