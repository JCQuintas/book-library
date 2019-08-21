import styled from 'styled-components'
import { COLORS, FONT_SIZES } from 'consts'

export default styled.div.withConfig({ displayName: 'InfoContainer' })`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  min-height: 100px;

  & > img {
    width: 100%;
    max-width: 100px;
    min-height: 100px;
    max-height: 100px;
    object-fit: contain;
  }

  & > div {
    margin-left: 10px;
    font-size: ${FONT_SIZES.S10};
    color: ${COLORS.DISABLED_TEXT_DARK};
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & :nth-child(2),
    & :nth-child(4) {
      margin-bottom: 5px;
    }
  }
`
