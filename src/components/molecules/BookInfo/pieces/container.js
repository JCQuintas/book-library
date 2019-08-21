import styled from 'styled-components'
import { COLORS, FONT_SIZES, BREAKPOINTS } from 'consts'

export default styled.div.withConfig({ displayName: 'Conainer' })`
  padding: 20px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  fill: ${COLORS.SECONDARY_TEXT_DARK};
  min-height: 100%;

  @media ${BREAKPOINTS.TABLET_PORTRAIT_UP} {
    padding: 40px;
  }

  & > h2 {
    margin: 0;
  }

  & > h3 {
    margin: 0;
  }

  & > div:first-of-type {
    margin-top: 3px;
    font-size: ${FONT_SIZES.S14};
    color: ${COLORS.DISABLED_TEXT_DARK};
  }
`
