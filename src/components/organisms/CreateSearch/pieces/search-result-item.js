import styled from 'styled-components'
import { COLORS, FONT_SIZES } from 'consts'

export default styled.div.withConfig({ displayName: 'SearchResultItem' })`
  display: flex;
  flex-direction: row;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${({ selected }) => selected && COLORS.HOVER_LIGHT};
  padding: 20px;

  &:hover,
  &:focus {
    background-color: ${COLORS.HOVER_LIGHT};
  }

  & > img {
    width: 100%;
    max-width: 80px;
    min-height: 80px;
    max-height: 80px;
    object-fit: contain;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    h3:first-of-type {
      color: ${COLORS.SECONDARY_TEXT_DARK};
      margin: 0;
    }

    h3 {
      margin: 0;
    }

    div {
      color: ${COLORS.DISABLED_TEXT_DARK};
      font-size: ${FONT_SIZES.S14};
    }
  }
`
