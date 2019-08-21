import styled from 'styled-components'
import { COLORS, FONT_SIZES, BREAKPOINTS } from 'consts'

export default styled.p.withConfig({ displayName: 'Description' })`
  color: ${COLORS.SECONDARY_TEXT_DARK};
  font-size: ${FONT_SIZES.S13};
  line-height: 1.5;

  @media ${BREAKPOINTS.TABLET_PORTRAIT_UP} {
    font-size: ${FONT_SIZES.S15};
  }
`
