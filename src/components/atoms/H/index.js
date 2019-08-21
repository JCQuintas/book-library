import styled from 'styled-components'
//import PropTypes from 'prop-types'
import { COLORS, FONT_SIZES } from 'consts'

const H1 = styled.h1`
  color: ${COLORS.SECONDARY_TEXT_DARK};
  font-size: ${FONT_SIZES.S26};
  font-weight: 300;
`
const H2 = styled.h2`
  color: ${COLORS.SECONDARY_TEXT_DARK};
  font-size: ${FONT_SIZES.S24};
  font-weight: 400;
`
const H3 = styled.h3`
  color: ${COLORS.DISABLED_TEXT_DARK};
  font-size: ${FONT_SIZES.S16};
  font-weight: 400;
`

export default { H1, H2, H3 }
